import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { db, ref as dbRef, push } from "@/lib/firebase";

const contactInfo: { icon: any; label: string; value: string; href?: string }[] = [
  { icon: MapPin, label: "Service Area", value: "All of Avon, Bath, Bristol & surrounding areas" },
  { icon: Phone, label: "Phone", value: "+44 7500 111987", href: "tel:+447500111987" },
  { icon: MessageSquare, label: "WhatsApp", value: "+44 7500 111987", href: "https://wa.me/447500111987" },
  { icon: Mail, label: "Email", value: "hello@avonangels.co.uk", href: "mailto:hello@avonangels.co.uk" },
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
    <section id="contact" className="py-16 sm:py-24 lg:py-32 section-green-light relative overflow-hidden">
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full blur-[120px]" style={{ background: "hsl(160 84% 39% / 0.06)" }} />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-body font-semibold mb-6">
            <motion.span className="w-2 h-2 rounded-full bg-primary" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
            Contact Us
          </span>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-5">
            Get Your Free
            <br /><span className="text-gradient">Care Assessment</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg">No obligation, no pressure. Just a friendly conversation about how we can help.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto" style={{ perspective: "1200px" }}>
          <motion.div
            initial={{ opacity: 0, x: -60, rotateY: -10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 60 }}
          >
            <div className="space-y-5 mb-10">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -30, rotateY: -8 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
                    className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300"
                  >
                    <c.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <div>
                    <div className="font-display font-semibold text-foreground text-sm">{c.label}</div>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith("http") ? "_blank" : undefined}
                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-muted-foreground text-sm hover:text-primary transition-colors block"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <div className="font-body text-muted-foreground text-sm">{c.value}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.6, type: "spring" }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="bg-card rounded-2xl p-6 border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">What happens next?</h3>
              {["We'll call you within 24 hours", "Arrange a free home assessment", "Create your personalised care plan", "Match you with the perfect carer"].map((step, i) => (
                <motion.div
                  key={step}
                  className="flex items-center gap-3 py-2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <motion.div whileHover={{ rotate: 15, scale: 1.2 }} className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-accent" />
                  </motion.div>
                  <span className="text-sm font-body text-foreground/70">{step}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 60, rotateY: 10 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ delay: 0.3, type: "spring", stiffness: 60 }}
            whileHover={{ scale: 1.005 }}
            className="bg-card rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 border border-border/50 hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
            style={{ boxShadow: "0 20px 60px -15px hsl(160 84% 39% / 0.12)" }}
          >
            {/* Shimmer */}
            <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, hsl(160 84% 39% / 0.3), transparent)" }} />

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div><label className="text-xs sm:text-sm font-body font-medium text-foreground mb-1.5 block">Your Name</label><Input name="name" required placeholder="Full name" className="font-body text-base sm:text-sm h-11 sm:h-10 rounded-xl" /></div>
              <div><label className="text-xs sm:text-sm font-body font-medium text-foreground mb-1.5 block">Phone Number</label><Input name="phone" type="tel" required placeholder="Your phone number" className="font-body text-base sm:text-sm h-11 sm:h-10 rounded-xl" /></div>
            </div>
            <div><label className="text-xs sm:text-sm font-body font-medium text-foreground mb-1.5 block">Email Address</label><Input name="email" type="email" required placeholder="your@email.co.uk" className="font-body text-base sm:text-sm h-11 sm:h-10 rounded-xl" /></div>
            <div><label className="text-xs sm:text-sm font-body font-medium text-foreground mb-1.5 block">Location / Postcode</label><Input name="location" required placeholder="e.g. BS1 or Bath" className="font-body text-base sm:text-sm h-11 sm:h-10 rounded-xl" /></div>
            <div>
              <label className="text-xs sm:text-sm font-body font-medium text-foreground mb-1.5 block">Type of Care Needed</label>
              <select name="careType" className="w-full border border-input bg-background rounded-xl px-3 h-11 sm:h-10 text-base sm:text-sm font-body text-foreground">
                <option>Personal Care</option><option>Live-in Care</option><option>Dementia Care</option><option>Companionship</option><option>Night Care</option><option>Respite Care</option><option>Complex Care</option><option>Not sure yet</option>
              </select>
            </div>
            <div><label className="text-xs sm:text-sm font-body font-medium text-foreground mb-1.5 block">Tell us more</label><Textarea name="message" required placeholder="Briefly describe the care needs..." rows={3} className="font-body text-base sm:text-sm resize-none rounded-xl" /></div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button type="submit" disabled={sending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-sm sm:text-base py-5 sm:py-6 rounded-full relative group font-semibold shadow-lg">
                <div className="absolute -inset-1 rounded-full bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center justify-center gap-2">
                  {sending ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}><Send className="w-4 h-4" /></motion.div> : <><Send className="w-4 h-4" /> Request Free Assessment</>}
                </span>
              </Button>
            </motion.div>
            <p className="text-xs font-body text-muted-foreground text-center">100% confidential. No obligation. We'll respond within 24 hours.</p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
