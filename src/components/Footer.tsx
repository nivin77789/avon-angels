import { motion } from "framer-motion";
import { Heart, ArrowUp, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sections = [
    { title: "Services", links: ["Personal Care", "Live-in Care", "Dementia Care", "Companionship", "Night Care", "Respite Care", "Complex Care"] },
    { title: "Company", links: ["About Us", "Our Team", "How It Works", "Pricing", "Testimonials", "FAQ", "Careers"] },
    { title: "Resources", links: ["Care Guide", "Funding Advice", "CQC Report", "Blog", "Privacy Policy", "Terms of Service"] },
  ];

  return (
    <footer className="section-dark pt-16 pb-8 relative overflow-hidden">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: "linear-gradient(hsl(160 84% 39%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 84% 39%) 1px, transparent 1px)",
        backgroundSize: "50px 50px"
      }} />
      {/* Glow orb */}
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[120px]" style={{ background: "hsl(160 84% 39% / 0.06)" }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <motion.div
                className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </motion.div>
              <div>
                <span className="text-lg font-display font-bold text-primary-foreground">Avon Angels</span>
                <span className="block text-[10px] font-body tracking-widest uppercase text-primary-foreground/50">Home Care</span>
              </div>
            </div>
            <p className="text-sm font-body text-primary-foreground/50 leading-relaxed mb-5 max-w-sm">
              Professional, compassionate home care services across Avon since 2010. CQC registered and rated.
            </p>
            <div className="space-y-2">
              {[
                { icon: Phone, text: "01234 567 890", href: "tel:+441234567890" },
                { icon: Mail, text: "hello@avonangels.co.uk", href: "mailto:hello@avonangels.co.uk" },
              ].map((item, i) => (
                <motion.a
                  key={item.text}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <item.icon className="w-4 h-4" /> {item.text}
                </motion.a>
              ))}
              <div className="flex items-center gap-2 text-sm font-body text-primary-foreground/60">
                <MapPin className="w-4 h-4" /> Serving all of Avon, UK
              </div>
            </div>
          </motion.div>

          {sections.map((s, si) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * si, duration: 0.6 }}
            >
              <h4 className="font-display font-semibold text-primary-foreground mb-5 text-sm">{s.title}</h4>
              <div className="space-y-2.5">
                {s.links.map((link) => (
                  <motion.button
                    key={link}
                    whileHover={{ x: 4, color: "hsl(160 84% 39%)" }}
                    className="block text-sm font-body text-primary-foreground/45 hover:text-accent transition-colors"
                  >
                    {link}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-primary-foreground/30">
            © {new Date().getFullYear()} Avon Angels Home Care. All rights reserved. CQC Registered.
          </p>
          <motion.button
            whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/50 hover:text-accent hover:bg-primary-foreground/20 transition-colors relative group"
          >
            <div className="absolute -inset-1 rounded-full bg-accent/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <ArrowUp className="w-4 h-4 relative" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
