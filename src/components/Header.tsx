import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["Home", "About", "Services", "Testimonials", "Contact"];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-20">
        <motion.button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
        >
          <Heart className="w-6 h-6 text-accent" fill="currentColor" />
          <span className={`text-2xl font-display font-bold transition-colors duration-300 ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
            Avon Angels
          </span>
          <span className={`hidden sm:inline text-xs font-body tracking-wider uppercase transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
            Care Home
          </span>
        </motion.button>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              onClick={() => scrollTo(item.toLowerCase())}
              className={`text-sm font-body font-medium transition-colors relative group ${
                scrolled ? "text-foreground/70 hover:text-primary" : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </motion.button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+441234567890" className={`flex items-center gap-2 text-sm font-body font-semibold transition-colors ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
            <Phone className="w-4 h-4" />
            01234 567 890
          </a>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => scrollTo("contact")} className="bg-accent text-accent-foreground hover:bg-accent/90 font-body shadow-lg">
              Book a Visit
            </Button>
          </motion.div>
        </div>

        <button
          className={`lg:hidden transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="p-6 space-y-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="block w-full text-left text-lg font-body text-foreground/80 hover:text-primary transition-colors"
                >
                  {item}
                </motion.button>
              ))}
              <Button onClick={() => scrollTo("contact")} className="w-full bg-accent text-accent-foreground font-body mt-4">
                Book a Visit
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
