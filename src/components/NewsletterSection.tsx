import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { db, ref as dbRef, push } from "@/lib/firebase";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSending(true);
    try {
      await push(dbRef(db, "newsletter"), {
        email: email.trim(),
        timestamp: Date.now(),
      });
      setSubscribed(true);
      setEmail("");
      toast({ title: "Subscribed! 🎉", description: "You'll receive our care tips and updates." });
    } catch {
      toast({ title: "Error", description: "Please try again.", variant: "destructive" });
    }
    setSending(false);
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative orbs */}
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="container relative z-10"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5"
          >
            <Sparkles className="w-7 h-7 text-primary" />
          </motion.div>
          <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-3">
            Stay Updated with Care Tips
          </h3>
          <p className="font-body text-muted-foreground mb-8">
            Get expert advice, care tips, and community updates delivered to your inbox monthly.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-body font-semibold"
            >
              <Mail className="w-5 h-5" />
              You're subscribed! Check your inbox.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="rounded-full font-body flex-1"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={sending}
                  className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-body px-6"
                >
                  {sending ? "..." : <><ArrowRight className="w-4 h-4" /></>}
                </Button>
              </motion.div>
            </form>
          )}
          <p className="text-xs font-body text-muted-foreground mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
