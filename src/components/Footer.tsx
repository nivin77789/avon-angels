import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground py-12">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-8 mb-10">
        <div>
          <span className="text-xl font-display font-bold text-primary-foreground">Avon Angels</span>
          <p className="text-sm font-body text-primary-foreground/60 mt-3 leading-relaxed">
            Providing compassionate, high-quality care in Avon since 2010. Registered with the Care Quality Commission.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
          <div className="space-y-2">
            {["Home", "About", "Services", "Testimonials", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                className="block text-sm font-body text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold text-primary-foreground mb-4">Contact</h4>
          <div className="space-y-2 text-sm font-body text-primary-foreground/60">
            <p>123 Riverside Lane, Avon</p>
            <p>Bristol BS1 2AB</p>
            <p>01234 567 890</p>
            <p>hello@avonangelscarehome.co.uk</p>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs font-body text-primary-foreground/40">
          © {new Date().getFullYear()} Avon Angels Care Home. All rights reserved.
        </p>
        <p className="text-xs font-body text-primary-foreground/40 flex items-center gap-1">
          Made with <Heart className="w-3 h-3 text-accent" fill="currentColor" /> in Avon, UK
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
