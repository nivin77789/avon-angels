import { motion } from "framer-motion";
import { Heart, ArrowUp, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const sections = [
    {
      title: "Services",
      links: ["Personal Care", "Live-in Care", "Dementia Care", "Companionship", "Night Care", "Respite Care", "Complex Care"],
    },
    {
      title: "Company",
      links: ["About Us", "Our Team", "How It Works", "Pricing", "Testimonials", "FAQ", "Careers"],
    },
    {
      title: "Resources",
      links: ["Care Guide", "Funding Advice", "CQC Report", "Blog", "Privacy Policy", "Terms of Service"],
    },
  ];

  return (
    <footer className="bg-foreground pt-16 pb-8 relative">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
              </div>
              <div>
                <span className="text-lg font-display font-bold text-primary-foreground">Avon Angels</span>
                <span className="block text-[10px] font-body tracking-widest uppercase text-primary-foreground/50">Home Care</span>
              </div>
            </div>
            <p className="text-sm font-body text-primary-foreground/50 leading-relaxed mb-5 max-w-sm">
              Professional, compassionate home care services across Avon since 2010. CQC registered and rated. Helping your loved ones live independently at home.
            </p>
            <div className="space-y-2">
              <a href="tel:+441234567890" className="flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> 01234 567 890
              </a>
              <a href="mailto:hello@avonangels.co.uk" className="flex items-center gap-2 text-sm font-body text-primary-foreground/60 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> hello@avonangels.co.uk
              </a>
              <div className="flex items-center gap-2 text-sm font-body text-primary-foreground/60">
                <MapPin className="w-4 h-4" /> Serving all of Avon, UK
              </div>
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="font-display font-semibold text-primary-foreground mb-5 text-sm">{s.title}</h4>
              <div className="space-y-2.5">
                {s.links.map((link) => (
                  <button
                    key={link}
                    className="block text-sm font-body text-primary-foreground/45 hover:text-accent transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-primary-foreground/30">
            © {new Date().getFullYear()} Avon Angels Home Care. All rights reserved. CQC Registered.
          </p>
          <motion.button
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/50 hover:text-accent hover:bg-primary-foreground/20 transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
