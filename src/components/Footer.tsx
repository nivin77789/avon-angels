import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground py-16 relative">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-accent" fill="currentColor" />
              <span className="text-xl font-display font-bold text-primary-foreground">Avon Angels</span>
            </div>
            <p className="text-sm font-body text-primary-foreground/50 leading-relaxed">
              Providing compassionate, high-quality care in Avon since 2010. Registered with the Care Quality Commission.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-5">Quick Links</h4>
            <div className="space-y-3">
              {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-sm font-body text-primary-foreground/50 hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-5">Contact</h4>
            <div className="space-y-2 text-sm font-body text-primary-foreground/50">
              <p>123 Riverside Lane, Avon</p>
              <p>Bristol BS1 2AB</p>
              <p>01234 567 890</p>
              <p>hello@avonangelscarehome.co.uk</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-primary-foreground/30">
            © {new Date().getFullYear()} Avon Angels Care Home. All rights reserved.
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
