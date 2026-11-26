import { motion } from "framer-motion";
import { ArrowUp, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import avonLogo from "@/assets/avon_angels.webp";
import { Link } from "react-router-dom";

const serviceLinks = [
  { label: "Personal Care", path: "/services#personal-care" },
  { label: "Live-in Care", path: "/services#live-in-care" },
  { label: "Dementia Care", path: "/services#dementia-care" },
  { label: "Companionship", path: "/services#companionship" },
  { label: "Respite Care", path: "/services#respite-care" },
  { label: "Complex Care", path: "/services#complex-care" },
];

const companyLinks = [
  { label: "About Us", path: "/about" },
  { label: "Our Team", path: "/team" },
  { label: "How It Works", path: "/how-it-works" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "FAQ", path: "/faq" },
  { label: "Careers", path: "/team" },
];

const resourceLinks = [
  { label: "Free Assessment", path: "/contact" },
  { label: "Care FAQs", path: "/faq" },
  { label: "Care Standards", path: "/about" },
  { label: "Coverage Areas", path: "/contact" },
  { label: "Get in Touch", path: "/contact" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="section-dark pt-16 pb-8 relative overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(160 84% 39%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 84% 39%) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      {/* Glow orb */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none opacity-40"
        style={{ background: "radial-gradient(ellipse, hsl(160 84% 39% / 0.12), transparent 70%)" }}
      />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Company bio */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="inline-block">
                <img src={avonLogo} alt="Avon Angels Home Care" className="h-12 w-auto" />
              </Link>
            </div>
            <p className="text-sm font-body text-primary-foreground/50 leading-relaxed mb-5 max-w-sm">
              Professional, compassionate home care services across Stratford-upon-Avon and Warwickshire. Dedicated to dignified, person-centred care in the comfort of your own home.
            </p>
            <div className="space-y-2">
              <a
                href="tel:+447500111987"
                className="flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Phone className="w-4 h-4 text-accent" /> +44 7500 111987
              </a>
              <a
                href="https://wa.me/447500111987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp: +44 7500 111987
              </a>
              <a
                href="mailto:hello@avonangels.co.uk"
                className="flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" /> hello@avonangels.co.uk
              </a>
              <div className="flex items-center gap-2 text-sm font-body text-primary-foreground/60">
                <MapPin className="w-4 h-4" /> Serving Stratford-upon-Avon & Warwickshire, UK
              </div>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h4 className="font-display font-semibold text-primary-foreground mb-5 text-sm">Services</h4>
            <div className="space-y-2.5">
              {serviceLinks.map((s) => (
                <Link
                  key={s.label}
                  to={s.path}
                  className="block text-sm font-body text-primary-foreground/55 hover:text-accent hover:translate-x-1 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h4 className="font-display font-semibold text-primary-foreground mb-5 text-sm">Company</h4>
            <div className="space-y-2.5">
              {companyLinks.map((s) => (
                <Link
                  key={s.label}
                  to={s.path}
                  className="block text-sm font-body text-primary-foreground/55 hover:text-accent hover:translate-x-1 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Resource Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h4 className="font-display font-semibold text-primary-foreground mb-5 text-sm">Resources</h4>
            <div className="space-y-2.5">
              {resourceLinks.map((s) => (
                <Link
                  key={s.label}
                  to={s.path}
                  className="block text-sm font-body text-primary-foreground/55 hover:text-accent hover:translate-x-1 transition-all"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-primary-foreground/40">
            © {new Date().getFullYear()} Avon Angels Home Care. All rights reserved. Registered in England & Wales.
          </p>
          <motion.button
            whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/50 hover:text-accent hover:bg-primary-foreground/20 transition-colors relative group"
            aria-label="Scroll to top"
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
