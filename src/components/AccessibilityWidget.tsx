import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility, X, Plus, Minus, Sun, Moon, Eye, Link2,
  BookOpen, MousePointer2, RotateCcw, Type, Pause,
  ZoomIn, EyeOff, Scan, Palette, Focus, ImageOff
} from "lucide-react";

interface Settings {
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  wordSpacing: number;
  highContrast: boolean;
  darkMode: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readingGuide: boolean;
  bigCursor: boolean;
  dyslexiaFont: boolean;
  textAlign: "default" | "left" | "center" | "right";
  hideImages: boolean;
  stopAnimations: boolean;
  highlightFocus: boolean;
  saturation: number;
  readingMask: boolean;
}

const defaultSettings: Settings = {
  fontSize: 100,
  letterSpacing: 0,
  lineHeight: 0,
  wordSpacing: 0,
  highContrast: false,
  darkMode: false,
  grayscale: false,
  highlightLinks: false,
  readingGuide: false,
  bigCursor: false,
  dyslexiaFont: false,
  textAlign: "default",
  hideImages: false,
  stopAnimations: false,
  highlightFocus: false,
  saturation: 100,
  readingMask: false,
};

const STORAGE_KEY = "a11y-settings";

interface AccessibilityWidgetProps {
  scrolled?: boolean;
}

const AccessibilityWidget = ({ scrolled = false }: AccessibilityWidgetProps) => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch { return defaultSettings; }
  });
  const [guideY, setGuideY] = useState(0);
  const [maskY, setMaskY] = useState(0);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.style.fontSize = `${settings.fontSize}%`;
    body.style.letterSpacing = settings.letterSpacing ? `${settings.letterSpacing}px` : "";
    body.style.lineHeight = settings.lineHeight ? `${1.5 + settings.lineHeight * 0.25}` : "";
    body.style.wordSpacing = settings.wordSpacing ? `${settings.wordSpacing * 4}px` : "";

    const filters: string[] = [];
    if (settings.grayscale) filters.push("grayscale(100%)");
    if (settings.saturation !== 100) filters.push(`saturate(${settings.saturation}%)`);
    root.style.filter = filters.join(" ");

    root.classList.toggle("a11y-high-contrast", settings.highContrast);
    root.classList.toggle("a11y-dark-mode", settings.darkMode);
    root.classList.toggle("a11y-highlight-links", settings.highlightLinks);
    root.classList.toggle("a11y-big-cursor", settings.bigCursor);
    root.classList.toggle("a11y-dyslexia-font", settings.dyslexiaFont);
    root.classList.remove("a11y-align-left", "a11y-align-center", "a11y-align-right");
    if (settings.textAlign !== "default") root.classList.add(`a11y-align-${settings.textAlign}`);
    root.classList.toggle("a11y-hide-images", settings.hideImages);
    root.classList.toggle("a11y-stop-animations", settings.stopAnimations);
    root.classList.toggle("a11y-highlight-focus", settings.highlightFocus);
    root.classList.toggle("a11y-reading-mask", settings.readingMask);

    return () => {
      root.style.fontSize = "";
      body.style.letterSpacing = "";
      body.style.lineHeight = "";
      body.style.wordSpacing = "";
      root.style.filter = "";
    };
  }, [settings]);

  useEffect(() => {
    if (!settings.readingGuide && !settings.readingMask) return;
    const handler = (e: MouseEvent) => {
      if (settings.readingGuide) setGuideY(e.clientY);
      if (settings.readingMask) setMaskY(e.clientY);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [settings.readingGuide, settings.readingMask]);

  const update = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const reset = () => setSettings(defaultSettings);

  const activeCount = Object.entries(settings).filter(([k, v]) => {
    const d = defaultSettings[k as keyof Settings];
    return v !== d;
  }).length;

  return (
    <>
      {/* Reading guide */}
      {settings.readingGuide && (
        <div
          className="fixed left-0 right-0 h-10 border-y-2 border-primary/50 bg-primary/5 pointer-events-none z-[9998]"
          style={{ top: guideY - 20 }}
        />
      )}

      {/* Reading mask */}
      {settings.readingMask && (
        <>
          <div className="fixed inset-0 bg-black/70 pointer-events-none z-[9997]"
            style={{ clipPath: `polygon(0 0, 100% 0, 100% ${maskY - 40}px, 0 ${maskY - 40}px)` }} />
          <div className="fixed inset-0 bg-black/70 pointer-events-none z-[9997]"
            style={{ clipPath: `polygon(0 ${maskY + 40}px, 100% ${maskY + 40}px, 100% 100%, 0 100%)` }} />
        </>
      )}

      {/* Trigger Button */}
      <div className="relative">
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
            scrolled
              ? "bg-primary/10 text-primary hover:bg-primary/20"
              : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
          }`}
          aria-label="Accessibility Settings"
        >
          {/* Animated ring pulse */}
          <motion.span
            className={`absolute inset-0 rounded-xl border-2 ${scrolled ? "border-primary/40" : "border-accent/50"}`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className={`absolute inset-0 rounded-xl border ${scrolled ? "border-primary/20" : "border-accent/30"}`}
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <Accessibility className="w-4 h-4 relative z-10" data-a11y-keep />
          {activeCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[9px] font-bold rounded-full flex items-center justify-center z-10"
            >
              {activeCount}
            </motion.span>
          )}
        </motion.button>

        {/* Dropdown Panel */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40"
                onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 400 }}
                className="absolute top-full right-0 mt-3 w-[340px] max-h-[80vh] overflow-y-auto bg-card backdrop-blur-2xl rounded-2xl shadow-2xl border border-border z-50"
                style={{ fontSize: "16px", boxShadow: "0 25px 50px -12px hsl(160 84% 39% / 0.25)" }}
              >
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border bg-card/95 backdrop-blur-xl rounded-t-2xl">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                      <Accessibility className="w-4 h-4 text-primary-foreground" data-a11y-keep />
                    </div>
                    <div>
                      <h3 className="text-sm font-display font-bold text-foreground">Accessibility</h3>
                      <p className="text-[10px] text-muted-foreground">Customize experience</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={reset}
                      className="text-[10px] font-body font-semibold text-muted-foreground hover:text-destructive flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-destructive/10 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-muted-foreground/20 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 space-y-2.5">
                  {/* Content Scaling */}
                  <SettingGroup title="Content Scaling" icon={<ZoomIn className="w-3.5 h-3.5" />}>
                    <SliderControl
                      label="Font Size"
                      value={settings.fontSize}
                      min={80} max={200} unit="%"
                      onInc={() => update("fontSize", Math.min(200, settings.fontSize + 10))}
                      onDec={() => update("fontSize", Math.max(80, settings.fontSize - 10))}
                    />
                    <SliderControl
                      label="Letter Spacing"
                      value={settings.letterSpacing}
                      min={0} max={5} unit="px"
                      onInc={() => update("letterSpacing", Math.min(5, settings.letterSpacing + 1))}
                      onDec={() => update("letterSpacing", Math.max(0, settings.letterSpacing - 1))}
                    />
                    <SliderControl
                      label="Line Height"
                      value={settings.lineHeight}
                      min={0} max={5} unit="x"
                      onInc={() => update("lineHeight", Math.min(5, settings.lineHeight + 1))}
                      onDec={() => update("lineHeight", Math.max(0, settings.lineHeight - 1))}
                    />
                    <SliderControl
                      label="Word Spacing"
                      value={settings.wordSpacing}
                      min={0} max={5} unit="x"
                      onInc={() => update("wordSpacing", Math.min(5, settings.wordSpacing + 1))}
                      onDec={() => update("wordSpacing", Math.max(0, settings.wordSpacing - 1))}
                    />
                  </SettingGroup>

                  {/* Color & Contrast */}
                  <SettingGroup title="Color & Contrast" icon={<Palette className="w-3.5 h-3.5" />}>
                    <div className="grid grid-cols-2 gap-1.5">
                      <ToggleChip label="High Contrast" icon={<Eye className="w-3 h-3" />} active={settings.highContrast} onClick={() => update("highContrast", !settings.highContrast)} />
                      <ToggleChip label="Dark Mode" icon={settings.darkMode ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />} active={settings.darkMode} onClick={() => update("darkMode", !settings.darkMode)} />
                      <ToggleChip label="Grayscale" icon={<EyeOff className="w-3 h-3" />} active={settings.grayscale} onClick={() => update("grayscale", !settings.grayscale)} />
                      <ToggleChip label="Low Saturation" icon={<Palette className="w-3 h-3" />} active={settings.saturation < 100} onClick={() => update("saturation", settings.saturation < 100 ? 100 : 50)} />
                    </div>
                  </SettingGroup>

                  {/* Reading & Navigation */}
                  <SettingGroup title="Reading Aids" icon={<BookOpen className="w-3.5 h-3.5" />}>
                    <div className="grid grid-cols-2 gap-1.5">
                      <ToggleChip label="Highlight Links" icon={<Link2 className="w-3 h-3" />} active={settings.highlightLinks} onClick={() => update("highlightLinks", !settings.highlightLinks)} />
                      <ToggleChip label="Reading Guide" icon={<BookOpen className="w-3 h-3" />} active={settings.readingGuide} onClick={() => update("readingGuide", !settings.readingGuide)} />
                      <ToggleChip label="Reading Mask" icon={<Scan className="w-3 h-3" />} active={settings.readingMask} onClick={() => update("readingMask", !settings.readingMask)} />
                      <ToggleChip label="Focus Highlight" icon={<Focus className="w-3 h-3" />} active={settings.highlightFocus} onClick={() => update("highlightFocus", !settings.highlightFocus)} />
                    </div>
                  </SettingGroup>

                  {/* Typography & Display */}
                  <SettingGroup title="Display" icon={<Type className="w-3.5 h-3.5" />}>
                    <div className="grid grid-cols-2 gap-1.5">
                      <ToggleChip label="Dyslexia Font" icon={<Type className="w-3 h-3" />} active={settings.dyslexiaFont} onClick={() => update("dyslexiaFont", !settings.dyslexiaFont)} />
                      <ToggleChip label="Big Cursor" icon={<MousePointer2 className="w-3 h-3" />} active={settings.bigCursor} onClick={() => update("bigCursor", !settings.bigCursor)} />
                      <ToggleChip label="Hide Images" icon={<ImageOff className="w-3 h-3" />} active={settings.hideImages} onClick={() => update("hideImages", !settings.hideImages)} />
                      <ToggleChip label="Stop Animations" icon={<Pause className="w-3 h-3" />} active={settings.stopAnimations} onClick={() => update("stopAnimations", !settings.stopAnimations)} />
                    </div>
                    <div className="flex gap-1 mt-2">
                      {(["default", "left", "center", "right"] as const).map(align => (
                        <button
                          key={align}
                          onClick={() => update("textAlign", align)}
                          className={`flex-1 py-1.5 text-[10px] font-body font-medium rounded-lg border capitalize transition-all ${
                            settings.textAlign === align
                              ? "bg-primary/15 border-primary/40 text-primary"
                              : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </SettingGroup>
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-border bg-muted/20">
                  <p className="text-[9px] text-muted-foreground text-center font-body">
                    Settings saved automatically
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

/* Sub-components */

const SettingGroup = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-muted/30 p-2.5">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <span className="text-xs font-display font-semibold text-foreground">{title}</span>
    </div>
    {children}
  </div>
);

const ToggleChip = ({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-2.5 py-2 rounded-lg border text-[11px] font-body font-medium transition-all ${
      active
        ? "bg-primary/15 border-primary/40 text-primary"
        : "bg-card border-border text-muted-foreground hover:border-primary/30 hover:bg-muted/50"
    }`}
  >
    <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {icon}
    </div>
    <span className="truncate">{label}</span>
  </button>
);

const SliderControl = ({ label, value, min, max, unit, onInc, onDec }: {
  label: string; value: number; min: number; max: number; unit: string;
  onInc: () => void; onDec: () => void;
}) => (
  <div className="flex items-center justify-between gap-2 py-1">
    <span className="text-[11px] font-body text-muted-foreground">{label}</span>
    <div className="flex items-center gap-1">
      <button
        onClick={onDec}
        disabled={value <= min}
        className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-30 transition-colors"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-[11px] font-body font-semibold text-foreground w-10 text-center">
        {value}{unit}
      </span>
      <button
        onClick={onInc}
        disabled={value >= max}
        className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-30 transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export default AccessibilityWidget;
