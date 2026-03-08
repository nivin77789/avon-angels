import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db, ref as dbRef, push } from "@/lib/firebase";

const contactInfo = [
  { icon: MapPin, label: "Service Area", value: "All of Avon, Bath, Bristol & surrounding areas" },
  { icon: Phone, label: "Phone", value: "01234 567 890" },
  { icon: Mail, label: "Email", value: "hello@avonangels.co.uk" },
  { icon: Clock, label: "Office Hours", value: "Mon–Fri 8am–6pm (Care available 24/7)" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    try {
      await push(dbRef(db, "assessments"), {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        location: formData.get("location"),
        careType: formData.get("careType"),
        message: formData.get("message"),
        timestamp: Date.now(),
        read: false,
      });
      toast({ title: "Enquiry submitted!", description: "We'll contact you within 24 hours." });
      form.reset();
    } catch {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 section-blue-light relative overflow-hidden">
      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Contact Us
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Get Your Free
            <br /><span className="text-gradient">Care Assessment</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            No obligation, no pressure. Just a friendly conversation about how we can help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <div className="space-y-5 mb-10">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <c.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm">{c.label}</div>
                    <div className="font-body text-muted-foreground text-sm">{c.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* What to expect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-2xl p-6 border border-border/50"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">What happens next?</h3>
              {["We'll call you within 24 hours", "Arrange a free home assessment", "Create your personalised care plan", "Match you with the perfect carer"].map((step, i) => (
                <div key={step} className="flex items-center gap-3 py-2">
                  <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <span className="text-sm font-body text-foreground/70">{step}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl p-8 space-y-5 border border-border/50"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Your Name</label>
                <Input name="name" required placeholder="Full name" className="font-body rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Phone Number</label>
                <Input name="phone" type="tel" required placeholder="Your phone number" className="font-body rounded-xl" />
              </div>
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Email Address</label>
              <Input name="email" type="email" required placeholder="your@email.co.uk" className="font-body rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Location / Postcode</label>
              <Input name="location" required placeholder="e.g. BS1 or Bath" className="font-body rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Type of Care Needed</label>
              <select name="careType" className="w-full border border-input bg-background rounded-xl px-3 py-2 text-sm font-body text-foreground">
                <option>Personal Care</option>
                <option>Live-in Care</option>
                <option>Dementia Care</option>
                <option>Companionship</option>
                <option>Night Care</option>
                <option>Respite Care</option>
                <option>Complex Care</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Tell us more</label>
              <Textarea name="message" required placeholder="Briefly describe the care needs..." rows={4} className="font-body resize-none rounded-xl" />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-base py-6 rounded-full"
              >
                {sending ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Send className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Request Free Assessment</>
                )}
              </Button>
            </motion.div>
            <p className="text-xs font-body text-muted-foreground text-center">
              100% confidential. No obligation. We'll respond within 24 hours.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
