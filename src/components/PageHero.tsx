import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Phone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageHeroProps {
  badge?: string;
  title: string;
  highlight?: string;
  description: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export const PageHero = ({
  badge = "Avon Angels Home Care",
  title,
  highlight,
  description,
  breadcrumbs = [{ label: "Home", path: "/" }],
  primaryCtaText = "Get Free Assessment",
  primaryCtaLink = "/contact",
  secondaryCtaText = "WhatsApp Us",
  secondaryCtaLink = "https://wa.me/447500111987",
}: PageHeroProps) => {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden section-dark">
      {/* Background radial ambient glow */}
      <div
        className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none opacity-25"
        style={{ background: "radial-gradient(circle, hsl(160 84% 39% / 0.4), transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, hsl(160 84% 50% / 0.3), transparent 70%)" }}
      />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(hsl(160 84% 39%) 1px, transparent 1px), linear-gradient(90deg, hsl(160 84% 39%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Breadcrumbs */}
          {breadcrumbs.length > 0 && (
            <nav className="flex items-center justify-center gap-1.5 text-xs font-body text-primary-foreground/60 mb-5">
              {breadcrumbs.map((crumb, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {crumb.path ? (
                    <Link
                      to={crumb.path}
                      className="hover:text-primary-foreground hover:underline transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground/90 font-medium">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-primary-foreground/40" />
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-body font-semibold mb-6 shadow-xs backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{badge}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.14] tracking-tight mb-5"
          >
            {title}
            {highlight && (
              <>
                <br />
                <span className="text-gradient-accent">{highlight}</span>
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg font-body text-primary-foreground/80 leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {description}
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            {primaryCtaLink.startsWith("http") ? (
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold px-7 py-5 sm:py-6 text-sm shadow-xl hover:scale-105 transition-all duration-300"
              >
                <a href={primaryCtaLink} target="_blank" rel="noopener noreferrer">
                  {primaryCtaText} <ArrowRight className="w-4 h-4 ml-1.5" />
                </a>
              </Button>
            ) : (
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 rounded-full font-semibold px-7 py-5 sm:py-6 text-sm shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Link to={primaryCtaLink}>
                  {primaryCtaText} <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
            )}

            {secondaryCtaLink.startsWith("http") ? (
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-[#25D366]/20 border border-[#25D366]/40 text-white hover:bg-[#25D366]/30 rounded-full font-medium px-6 py-5 sm:py-6 text-sm backdrop-blur-md transition-all duration-300"
              >
                <a href={secondaryCtaLink} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2 text-[#25D366]" />
                  {secondaryCtaText}
                </a>
              </Button>
            ) : secondaryCtaLink.startsWith("tel:") ? (
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-transparent border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full font-medium px-6 py-5 sm:py-6 text-sm backdrop-blur-md transition-all duration-300"
              >
                <a href={secondaryCtaLink}>
                  <Phone className="w-4 h-4 mr-2 text-accent" />
                  {secondaryCtaText}
                </a>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 rounded-full font-medium px-6 py-5 sm:py-6 text-sm transition-all duration-300"
              >
                <Link to={secondaryCtaLink}>{secondaryCtaText}</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
