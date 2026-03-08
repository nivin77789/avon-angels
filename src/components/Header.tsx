import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  {
    label: "Services", id: "services",
    sub: [
      { label: "Personal Care", id: "services" },
      { label: "Live-in Care", id: "services" },
      { label: "Dementia Care", id: "services" },
      { label: "Companionship", id: "services" },
      { label: "Night Care", id: "services" },
      { label: "Respite Care", id: "services" },
    ],
  },
  { label: "How It Works", id: "process" },
  { label: "Our Team", id: "team" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    setDropdown(null);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className={`transition-all duration-300 overflow-hidden ${scrolled ? "h-0" : "h-10"}`}>
        <div className="container flex items-center justify-between h-10 text-xs">
          <div className={`flex items-center gap-6 font-body ${scrolled ? "text-foreground/60" : "text-primary-foreground/70"}`}>
            <span>📍 Serving all of Avon, UK</span>
            <span className="hidden sm:inline">✉️ hello@avonangels.co.uk</span>
          </div>
          <a href="tel:+441234567890" className={`flex items-center gap-1 font-body font-semibold ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
            <Phone className="w-3 h-3" /> 01234 567 890
          </a>
        </div>
      </div>

      <div className="container flex items-center justify-between h-16 lg:h-18">
        <motion.button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2"
          whileHover={{ scale: 1.03 }}
        >
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
          </div>
          <div className="flex flex-col items-start">
            <span className={`text-lg font-display font-bold leading-tight transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
              Avon Angels
            </span>
            <span className={`text-[10px] font-body tracking-widest uppercase leading-tight transition-colors ${scrolled ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
              Home Care
            </span>
          </div>
        </motion.button>

        <nav className="hidden xl:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.label} className="relative" onMouseEnter={() => item.sub && setDropdown(item.label)} onMouseLeave={() => setDropdown(null)}>
              <motion.button
                onClick={() => scrollTo(item.id)}
                className={`px-3 py-2 text-sm font-body font-medium rounded-lg transition-colors flex items-center gap-1 ${
                  scrolled
                    ? "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {item.label}
                {item.sub && <ChevronDown className="w-3 h-3" />}
              </motion.button>

              <AnimatePresence>
                {item.sub && dropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-card rounded-xl shadow-lg border border-border overflow-hidden z-50"
                  >
                    {item.sub.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => scrollTo(sub.id)}
                        className="block w-full text-left px-4 py-2.5 text-sm font-body text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button onClick={() => scrollTo("contact")} className="bg-accent text-accent-foreground hover:bg-accent/90 font-body shadow-lg rounded-full px-6">
              Get Free Assessment
            </Button>
          </motion.div>
        </div>

        <button
          className={`xl:hidden transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
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
            className="xl:hidden bg-card/98 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="p-6 space-y-1 max-h-[70vh] overflow-y-auto">
              {navItems.map((item, i) => (
                <div key={item.label}>
                  <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left py-2.5 text-base font-body text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </motion.button>
                  {item.sub && (
                    <div className="pl-4 space-y-1">
                      {item.sub.map((sub) => (
                        <button
                          key={sub.label}
                          onClick={() => scrollTo(sub.id)}
                          className="block w-full text-left py-1.5 text-sm font-body text-muted-foreground hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button onClick={() => scrollTo("contact")} className="w-full bg-accent text-accent-foreground font-body mt-4 rounded-full">
                Get Free Assessment
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
