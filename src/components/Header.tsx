import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccessibilityWidget from "./AccessibilityWidget";
import avonLogo from "@/assets/avon_angels.png";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  {
    label: "Services", id: "services",
    sub: [
      "Personal Care", "Live-in Care", "Dementia Care",
      "Companionship", "Night Care", "Respite Care",
      "Complex Care", "Medication Support", "Meal Preparation",
    ],
  },
  { label: "How It Works", id: "process" },
  { label: "Team", id: "team" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      // Track active section
      const sections = navItems.map(n => n.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
    setDropdown(null);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-2"
            : "py-3"
        }`}
      >
        {/* Navbar container with glass effect */}
        <div className={`container transition-all duration-500 ${
          scrolled ? "max-w-6xl" : ""
        }`}>
          <div className={`flex items-center justify-between transition-all duration-500 rounded-2xl px-5 ${
            scrolled
              ? "bg-card/80 backdrop-blur-2xl shadow-lg border border-border/50 h-14"
              : "bg-foreground/10 backdrop-blur-xl border border-primary-foreground/10 h-16"
          }`}>
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  scrolled ? "bg-primary" : "bg-accent"
                }`}
                whileHover={{ rotate: 12 }}
              >
                <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
              </motion.div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-base font-display font-bold tracking-tight transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-primary-foreground"
                }`}>
                  Avon Angels
                </span>
                <span className={`text-[9px] font-body font-semibold tracking-[0.2em] uppercase transition-colors duration-300 ${
                  scrolled ? "text-primary" : "text-accent"
                }`}>
                  HOME CARE
                </span>
              </div>
            </motion.button>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.sub && setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`relative px-3 py-1.5 text-[13px] font-body font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                      activeSection === item.id
                        ? scrolled
                          ? "text-primary bg-primary/8"
                          : "text-primary-foreground bg-primary-foreground/15"
                        : scrolled
                          ? "text-foreground/60 hover:text-foreground hover:bg-muted"
                          : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
                    }`}
                  >
                    {item.label}
                    {item.sub && (
                      <motion.div animate={{ rotate: dropdown === item.label ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-3 h-3" />
                      </motion.div>
                    )}
                    {activeSection === item.id && (
                      <motion.div
                        layoutId="nav-active"
                        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full ${
                          scrolled ? "bg-primary" : "bg-accent"
                        }`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.sub && dropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-card/95 backdrop-blur-xl rounded-xl shadow-xl border border-border/80 overflow-hidden p-1.5"
                      >
                        {item.sub.map((sub, j) => (
                          <motion.button
                            key={sub}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: j * 0.03 }}
                            onClick={() => scrollTo("services")}
                            className="flex items-center w-full text-left px-3 py-2 text-sm font-body text-foreground/70 hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-150 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary mr-2.5 transition-colors" />
                            {sub}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Accessibility Widget */}
              <AccessibilityWidget scrolled={scrolled} />

              {/* Phone - visible on lg+ */}
              <a
                href="tel:+441234567890"
                className={`hidden lg:flex xl:hidden items-center gap-1.5 text-xs font-body font-semibold transition-colors ${
                  scrolled ? "text-primary" : "text-primary-foreground"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                01234 567 890
              </a>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden lg:block">
                <Button
                  onClick={() => scrollTo("contact")}
                  className={`font-body text-xs px-4 h-9 rounded-full shadow-md transition-all duration-300 ${
                    scrolled
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-accent text-accent-foreground hover:bg-accent/90"
                  }`}
                >
                  Free Assessment
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </motion.div>

              {/* Mobile toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={`xl:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                  scrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }`}
                onClick={() => setOpen(!open)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={open ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu - full screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-card shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Heart className="w-4 h-4 text-primary-foreground" fill="currentColor" />
                  </div>
                  <span className="font-display font-bold text-foreground">Avon Angels</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-foreground"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="p-5 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <button
                      onClick={() => scrollTo(item.id)}
                      className={`flex items-center justify-between w-full py-2.5 px-3 rounded-lg text-sm font-body font-medium transition-all ${
                        activeSection === item.id
                          ? "text-primary bg-primary/8"
                          : "text-foreground/70 hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                      {activeSection === item.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      )}
                    </button>
                    {item.sub && (
                      <div className="ml-4 border-l-2 border-border pl-3 space-y-0.5 mt-0.5 mb-1">
                        {item.sub.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => scrollTo("services")}
                            className="block w-full text-left py-1.5 text-xs font-body text-muted-foreground hover:text-primary transition-colors"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border bg-card">
                <a href="tel:+441234567890" className="flex items-center gap-2 text-sm font-body font-semibold text-primary mb-3">
                  <Phone className="w-4 h-4" /> 01234 567 890
                </a>
                <Button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body rounded-full"
                >
                  Get Free Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
