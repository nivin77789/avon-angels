import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AnimatedBlob from "./AnimatedBlob";

const contactInfo = [
  { icon: MapPin, label: "Address", value: "123 Riverside Lane, Avon, Bristol BS1 2AB" },
  { icon: Phone, label: "Phone", value: "01234 567 890" },
  { icon: Mail, label: "Email", value: "hello@avonangelscarehome.co.uk" },
  { icon: Clock, label: "Visiting Hours", value: "Daily, 10:00 AM – 8:00 PM" },
];

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast({ title: "Message sent!", description: "We'll get back to you shortly." });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-28 bg-background relative overflow-hidden">
      <AnimatedBlob className="w-96 h-96 bg-primary -bottom-20 -right-20" delay={4} />

      <div className="container relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-sm font-body tracking-widest uppercase text-accent font-semibold">Get in Touch</span>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mt-4 mb-5">
            We'd Love to Hear From You
          </h2>
          <p className="font-body text-muted-foreground text-lg">
            Arrange a visit or simply ask a question — our friendly team is here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-6 mb-10">
              {contactInfo.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <c.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-body font-semibold text-foreground text-sm">{c.label}</div>
                    <div className="font-body text-muted-foreground text-sm">{c.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="rounded-2xl overflow-hidden h-64"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <iframe
                title="Avon Angels Care Home location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39436.17459209!2d-2.62!3d51.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI3JzAwLjAiTiAywrAzNycxMi4wIlc!5e0!3m2!1sen!2suk!4v1234567890!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="bg-card rounded-2xl p-8 space-y-5"
            style={{ boxShadow: "var(--shadow-elevated)" }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Full Name</label>
                <Input required placeholder="Your name" className="font-body rounded-xl" />
              </div>
              <div>
                <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Phone</label>
                <Input type="tel" required placeholder="Your phone number" className="font-body rounded-xl" />
              </div>
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Email</label>
              <Input type="email" required placeholder="your@email.co.uk" className="font-body rounded-xl" />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">How can we help?</label>
              <Textarea required placeholder="Tell us about your enquiry..." rows={5} className="font-body resize-none rounded-xl" />
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={sending}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body text-base py-6 rounded-xl"
              >
                {sending ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                    <Send className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Send Enquiry</>
                )}
              </Button>
            </motion.div>
            <p className="text-xs font-body text-muted-foreground text-center">
              We'll respond within 24 hours. Your information is kept confidential.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
