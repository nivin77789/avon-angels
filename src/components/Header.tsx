import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = ["Home", "About", "Services", "Testimonials", "Contact"];

const Header = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-20">
        <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
          <span className="text-2xl font-display font-bold text-primary">Avon Angels</span>
          <span className="hidden sm:inline text-sm font-body text-muted-foreground tracking-wider uppercase">Care Home</span>
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-sm font-body font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+441234567890" className="flex items-center gap-2 text-sm font-body text-primary font-semibold">
            <Phone className="w-4 h-4" />
            01onal 234 567 890
          </a>
          <Button onClick={() => scrollTo("contact")} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
            Book a Visit
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase())}
              className="block w-full text-left text-lg font-body text-foreground/80 hover:text-primary transition-colors"
            >
              {item}
            </button>
          ))}
          <Button onClick={() => scrollTo("contact")} className="w-full bg-primary text-primary-foreground font-body mt-4">
            Book a Visit
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
