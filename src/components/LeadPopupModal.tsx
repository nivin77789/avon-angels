import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShieldCheck, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, ref as dbRef, push } from "@/lib/firebase";

const STORAGE_KEY = "avon_angels_lead_modal_seen";
const WHATSAPP_NUMBER = "447500111987";

const careOptions = [
  "Personal Care",
  "Live-in Care",
  "Dementia Care",
  "Companionship",
  "Respite Care",
  "Night / Overnight Care",
  "General Care Advice",
];

export const LeadPopupModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    careType: "Personal Care",
    location: "",
    notes: "",
  });

  useEffect(() => {
    // Check if the user has already seen or submitted the lead form
    try {
      const hasSeen = localStorage.getItem(STORAGE_KEY);
      if (!hasSeen) {
        // Show after a gentle 1.5s delay so the page loads smoothly first
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage security/private browsing exceptions
    }
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // Ignore
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);

    // Build the formatted WhatsApp message
    const messageLines = [
      "👋 *New Care Assessment Enquiry*",
      "━━━━━━━━━━━━━━━━━━━━",
      `👤 *Name:* ${formData.name.trim()}`,
      `📞 *Phone:* ${formData.phone.trim()}`,
      `🩺 *Care Needed:* ${formData.careType}`,
      formData.location.trim() ? `📍 *Area/Postcode:* ${formData.location.trim()}` : "",
      formData.notes.trim() ? `💬 *Notes:* ${formData.notes.trim()}` : "",
      "━━━━━━━━━━━━━━━━━━━━",
      "_Submitted via Avon Angels Website_",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      messageLines
    )}`;
    setRedirectUrl(whatsappUrl);

    // Save lead to Firebase assessments table so it also shows in Admin Dashboard
    try {
      await push(dbRef(db, "assessments"), {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        careType: formData.careType,
        location: formData.location.trim() || "Not provided",
        message: formData.notes.trim() || "Lead form consultation request",
        source: "lead_popup_modal",
        timestamp: Date.now(),
        read: false,
      });
    } catch (err) {
      console.warn("Could not record lead to database:", err);
    }

    // Mark as completed so this user never sees it again
    try {
      localStorage.setItem(STORAGE_KEY, "submitted");
    } catch {
      // Ignore
    }

    setSubmitting(false);
    setSubmitted(true);

    // Trigger WhatsApp redirect in a new tab
    const newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (!newWindow) {
      // In case browser blocked the new window popup, user can click the manual button
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative w-full max-w-lg bg-card text-card-foreground rounded-3xl border border-border/80 shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
            role="dialog"
            aria-modal="true"
          >
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-primary via-emerald-500 to-accent" />

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors z-20"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              /* Success View */
              <div className="p-8 text-center space-y-5">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="w-16 h-16 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-foreground">
                    Enquiry Ready!
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mt-2 max-w-sm mx-auto">
                    We’ve prepared your enquiry and redirected you to WhatsApp. If WhatsApp didn’t open automatically, click below:
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-3 max-w-xs mx-auto">
                  <a
                    href={redirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold py-3 px-5 rounded-xl shadow-lg transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Open WhatsApp Chat
                  </a>

                  <Button
                    variant="ghost"
                    onClick={closeModal}
                    className="font-body text-xs text-muted-foreground hover:text-foreground"
                  >
                    Done / Close
                  </Button>
                </div>
              </div>
            ) : (
              /* Form View */
              <div className="p-5 sm:p-8 overflow-y-auto">
                {/* Header */}
                <div className="mb-5 sm:mb-6 pr-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    Free Care Consultation & Quote
                  </div>
                  <h3 className="text-lg sm:text-2xl font-display font-bold text-foreground tracking-tight leading-snug">
                    Find the Right Care for Your Loved One
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-muted-foreground mt-1">
                    Fill in your details below and we’ll instantly connect with you on WhatsApp with tailored care advice and options.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Your Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="h-11 sm:h-10 text-base sm:text-sm rounded-xl"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Phone Number <span className="text-destructive">*</span>
                      </label>
                      <Input
                        required
                        type="tel"
                        placeholder="e.g. 07500 111987"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-11 sm:h-10 text-base sm:text-sm rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Care Type
                      </label>
                      <select
                        value={formData.careType}
                        onChange={(e) => setFormData({ ...formData, careType: e.target.value })}
                        className="w-full h-11 sm:h-10 px-3 text-base sm:text-sm rounded-xl border border-input bg-background text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        {careOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1">
                        Postcode or Town
                      </label>
                      <Input
                        placeholder="e.g. Stratford, Warwick, CV37"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="h-11 sm:h-10 text-base sm:text-sm rounded-xl"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1">
                      Brief Notes / Requirements <span className="text-muted-foreground font-normal">(optional)</span>
                    </label>
                    <Textarea
                      rows={2}
                      placeholder="Tell us what kind of support or hours you need..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="text-base sm:text-sm rounded-xl resize-none"
                    />
                  </div>

                  {/* Trust badges */}
                  <div className="flex items-center justify-between text-[11px] font-body text-muted-foreground pt-1 pb-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      DBS Checked Carers
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-accent" />
                      No Obligation
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                      Fast WhatsApp Reply
                    </span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-12 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#25D366]/20 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {submitting ? "Preparing Enquiry..." : "Send Enquiry to WhatsApp"}
                  </Button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadPopupModal;
