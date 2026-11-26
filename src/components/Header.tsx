import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Heart, ChevronDown, ArrowRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccessibilityWidget from "./AccessibilityWidget";
import avonLogo from "@/assets/avon_angels.webp";

const navItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  {
    label: "Services", id: "services",
    sub: [
      "Personal Care", "Live-in Care", "Dementia Care",
      "Companionship", "Respite Care",
      "Complex Care", "Medication Support", "Meal Preparation",
    ],
  },
  { label: "How It Works", id: "process" },
  { label: "Team", id: "team" },
  { label: "Testimonials", id: "testimonials" },
  { label: "FAQ", id: "faq" },
  { label: "Contact", id: "contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let ticking = false;
    let lastY = 0;

    const onScroll = () => {
      const currentY = window.scrollY;
      if (Math.abs(currentY - lastY) < 10 && (currentY > 30) === (lastY > 30)) {
        return;
      }
      lastY = currentY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(currentY > 30);
          // Track active section with low-overhead check
          const sections = navItems.map(n => n.id);
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.getBoundingClientRect().top <= 140) {
              setActiveSection(sections[i]);
              break;
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
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
              : "xl:bg-foreground/10 xl:backdrop-blur-xl xl:border xl:border-primary-foreground/10 h-14 xl:h-16"
          }`}>
            {/* Logo */}
            <motion.button
              onClick={() => scrollTo("home")}
              className="flex items-center gap-2.5 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={avonLogo} alt="Avon Angels Home Care" className="h-10 w-auto" />
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

              {/* Quick Call Button on Mobile */}
              <motion.a
                href="tel:+447500111987"
                whileTap={{ scale: 0.92 }}
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20ba59] active:scale-95 transition-all"
                aria-label="Call Avon Angels"
              >
                <Phone className="w-4 h-4" />
              </motion.a>

              {/* Phone - visible on lg+ */}
              <a
                href="tel:+447500111987"
                className={`hidden lg:flex xl:hidden items-center gap-1.5 text-xs font-body font-semibold transition-colors ${
                  scrolled ? "text-primary" : "text-primary-foreground"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                +44 7500 111987
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
              className="absolute top-0 right-0 bottom-0 w-84 max-w-[88vw] bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col justify-between border-l border-border/80"
            >
              <div>
                <div className="flex items-center justify-between p-5 border-b border-border/80 bg-muted/30">
                  <div className="flex items-center gap-2.5">
                    <img src={avonLogo} alt="Avon Angels Home Care" className="h-9 w-auto" />
                    <div>
                      <span className="text-[10px] font-body text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3 h-3" /> DBS Checked & Insured
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setOpen(false)}
                    className="w-9 h-9 rounded-xl bg-muted/80 hover:bg-muted flex items-center justify-center text-foreground transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-270px)]">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i }}
                    >
                      <button
                        onClick={() => scrollTo(item.id)}
                        className={`flex items-center justify-between w-full py-2.5 px-3.5 rounded-xl text-sm font-body font-medium transition-all ${
                          activeSection === item.id
                            ? "text-primary bg-primary/10 font-semibold shadow-xs"
                            : "text-foreground/75 hover:text-foreground hover:bg-muted/70"
                        }`}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </button>
                      {item.sub && (
                        <div className="ml-4 border-l-2 border-primary/20 pl-3 space-y-0.5 mt-1 mb-1.5">
                          {item.sub.map((sub) => (
                            <button
                              key={sub}
                              onClick={() => scrollTo("services")}
                              className="block w-full text-left py-1.5 px-2 rounded-lg text-xs font-body text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              {sub}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Contact Dock inside mobile drawer */}
              <div className="p-4 border-t border-border/80 bg-card/90 space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+447500111987"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary/10 hover:bg-primary/15 text-primary text-xs font-semibold font-body transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Carer
                  </a>
                  <a
                    href="https://wa.me/447500111987"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold font-body shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                  </a>
                </div>

                <Button
                  onClick={() => scrollTo("contact")}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-body text-xs h-10 rounded-xl shadow-md font-semibold"
                >
                  Get Free Assessment <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
                <p className="text-[10px] text-center text-muted-foreground font-body">
                  Serving Bath, Bristol & surrounding Avon areas
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
