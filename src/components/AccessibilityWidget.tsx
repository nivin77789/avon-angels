import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accessibility, X, Plus, Minus, Sun, Moon, Eye, Link2,
  BookOpen, MousePointer2, RotateCcw, Type, Space, Pause,
  ZoomIn, Underline, AlignJustify, Volume2, EyeOff, Scan,
  Palette, MonitorSpeaker, ListOrdered, ImageOff, Focus
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
  tooltips: boolean;
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
  tooltips: false,
};

const STORAGE_KEY = "a11y-settings";

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch { return defaultSettings; }
  });
  const [guideY, setGuideY] = useState(0);
  const [maskY, setMaskY] = useState(0);

  // Persist
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  // Apply settings to DOM
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Font size
    root.style.fontSize = `${settings.fontSize}%`;

    // Letter spacing
    body.style.letterSpacing = settings.letterSpacing ? `${settings.letterSpacing}px` : "";

    // Line height
    body.style.lineHeight = settings.lineHeight ? `${1.5 + settings.lineHeight * 0.25}` : "";

    // Word spacing
    body.style.wordSpacing = settings.wordSpacing ? `${settings.wordSpacing * 4}px` : "";

    // Grayscale + saturation
    const filters: string[] = [];
    if (settings.grayscale) filters.push("grayscale(100%)");
    if (settings.saturation !== 100) filters.push(`saturate(${settings.saturation}%)`);
    root.style.filter = filters.join(" ");

    // High contrast
    root.classList.toggle("a11y-high-contrast", settings.highContrast);

    // Dark mode
    root.classList.toggle("a11y-dark-mode", settings.darkMode);

    // Highlight links
    root.classList.toggle("a11y-highlight-links", settings.highlightLinks);

    // Big cursor
    root.classList.toggle("a11y-big-cursor", settings.bigCursor);

    // Dyslexia font
    root.classList.toggle("a11y-dyslexia-font", settings.dyslexiaFont);

    // Text align
    root.classList.remove("a11y-align-left", "a11y-align-center", "a11y-align-right");
    if (settings.textAlign !== "default") root.classList.add(`a11y-align-${settings.textAlign}`);

    // Hide images
    root.classList.toggle("a11y-hide-images", settings.hideImages);

    // Stop animations
    root.classList.toggle("a11y-stop-animations", settings.stopAnimations);

    // Highlight focus
    root.classList.toggle("a11y-highlight-focus", settings.highlightFocus);

    // Reading mask
    root.classList.toggle("a11y-reading-mask", settings.readingMask);

    // Tooltips
    root.classList.toggle("a11y-tooltips", settings.tooltips);

    return () => {
      root.style.fontSize = "";
      body.style.letterSpacing = "";
      body.style.lineHeight = "";
      body.style.wordSpacing = "";
      root.style.filter = "";
    };
  }, [settings]);

  // Reading guide / mask mouse tracking
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
      {/* Reading guide overlay */}
      {settings.readingGuide && (
        <div
          className="fixed left-0 right-0 h-10 border-y-2 border-primary/50 bg-primary/5 pointer-events-none z-[9998]"
          style={{ top: guideY - 20 }}
        />
      )}

      {/* Reading mask overlay */}
      {settings.readingMask && (
        <>
          <div className="fixed inset-0 bg-black/70 pointer-events-none z-[9997]"
            style={{ clipPath: `polygon(0 0, 100% 0, 100% ${maskY - 40}px, 0 ${maskY - 40}px)` }} />
          <div className="fixed inset-0 bg-black/70 pointer-events-none z-[9997]"
            style={{ clipPath: `polygon(0 ${maskY + 40}px, 100% ${maskY + 40}px, 100% 100%, 0 100%)` }} />
        </>
      )}

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 left-5 z-[9999] w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Accessibility Settings"
        style={{ boxShadow: "0 4px 24px hsl(160 84% 39% / 0.4)" }}
      >
        <Accessibility className="w-6 h-6" />
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {activeCount}
          </span>
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-[9999]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-[360px] max-w-[90vw] bg-card shadow-2xl z-[10000] flex flex-col border-r border-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-foreground text-base">Accessibility</h2>
                    <p className="text-[11px] text-muted-foreground">Customize your experience</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={reset}
                    className="text-xs font-body font-medium text-muted-foreground hover:text-destructive flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-destructive/10 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-muted-foreground/20 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {/* Font Size */}
                <SettingGroup title="Content Scaling" icon={<ZoomIn className="w-4 h-4" />}>
                  <SliderControl
                    label="Font Size"
                    value={settings.fontSize}
                    min={80}
                    max={200}
                    step={10}
                    unit="%"
                    onInc={() => update("fontSize", Math.min(200, settings.fontSize + 10))}
                    onDec={() => update("fontSize", Math.max(80, settings.fontSize - 10))}
                  />
                  <SliderControl
                    label="Letter Spacing"
                    value={settings.letterSpacing}
                    min={0}
                    max={5}
                    step={1}
                    unit="px"
                    onInc={() => update("letterSpacing", Math.min(5, settings.letterSpacing + 1))}
                    onDec={() => update("letterSpacing", Math.max(0, settings.letterSpacing - 1))}
                  />
                  <SliderControl
                    label="Line Height"
                    value={settings.lineHeight}
                    min={0}
                    max={5}
                    step={1}
                    unit="x"
                    onInc={() => update("lineHeight", Math.min(5, settings.lineHeight + 1))}
                    onDec={() => update("lineHeight", Math.max(0, settings.lineHeight - 1))}
                  />
                  <SliderControl
                    label="Word Spacing"
                    value={settings.wordSpacing}
                    min={0}
                    max={5}
                    step={1}
                    unit="x"
                    onInc={() => update("wordSpacing", Math.min(5, settings.wordSpacing + 1))}
                    onDec={() => update("wordSpacing", Math.max(0, settings.wordSpacing - 1))}
                  />
                </SettingGroup>

                {/* Color & Contrast */}
                <SettingGroup title="Color & Contrast" icon={<Palette className="w-4 h-4" />}>
                  <ToggleButton
                    label="High Contrast"
                    icon={<Eye className="w-4 h-4" />}
                    active={settings.highContrast}
                    onClick={() => update("highContrast", !settings.highContrast)}
                  />
                  <ToggleButton
                    label="Dark Mode"
                    icon={settings.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    active={settings.darkMode}
                    onClick={() => update("darkMode", !settings.darkMode)}
                  />
                  <ToggleButton
                    label="Grayscale"
                    icon={<EyeOff className="w-4 h-4" />}
                    active={settings.grayscale}
                    onClick={() => update("grayscale", !settings.grayscale)}
                  />
                  <SliderControl
                    label="Saturation"
                    value={settings.saturation}
                    min={0}
                    max={200}
                    step={25}
                    unit="%"
                    onInc={() => update("saturation", Math.min(200, settings.saturation + 25))}
                    onDec={() => update("saturation", Math.max(0, settings.saturation - 25))}
                  />
                </SettingGroup>

                {/* Reading & Navigation */}
                <SettingGroup title="Reading & Navigation" icon={<BookOpen className="w-4 h-4" />}>
                  <ToggleButton
                    label="Highlight Links"
                    icon={<Link2 className="w-4 h-4" />}
                    active={settings.highlightLinks}
                    onClick={() => update("highlightLinks", !settings.highlightLinks)}
                  />
                  <ToggleButton
                    label="Reading Guide"
                    icon={<BookOpen className="w-4 h-4" />}
                    active={settings.readingGuide}
                    onClick={() => update("readingGuide", !settings.readingGuide)}
                  />
                  <ToggleButton
                    label="Reading Mask"
                    icon={<Scan className="w-4 h-4" />}
                    active={settings.readingMask}
                    onClick={() => update("readingMask", !settings.readingMask)}
                  />
                  <ToggleButton
                    label="Highlight Focus"
                    icon={<Focus className="w-4 h-4" />}
                    active={settings.highlightFocus}
                    onClick={() => update("highlightFocus", !settings.highlightFocus)}
                  />
                  <ToggleButton
                    label="Show Tooltips"
                    icon={<MonitorSpeaker className="w-4 h-4" />}
                    active={settings.tooltips}
                    onClick={() => update("tooltips", !settings.tooltips)}
                  />
                </SettingGroup>

                {/* Typography */}
                <SettingGroup title="Typography" icon={<Type className="w-4 h-4" />}>
                  <ToggleButton
                    label="Dyslexia-Friendly Font"
                    icon={<Type className="w-4 h-4" />}
                    active={settings.dyslexiaFont}
                    onClick={() => update("dyslexiaFont", !settings.dyslexiaFont)}
                  />
                  <div className="grid grid-cols-4 gap-1.5">
                    {(["default", "left", "center", "right"] as const).map(align => (
                      <button
                        key={align}
                        onClick={() => update("textAlign", align)}
                        className={`py-2 px-1 text-[11px] font-body font-medium rounded-lg border transition-all capitalize ${
                          settings.textAlign === align
                            ? "bg-primary/10 border-primary text-primary"
                            : "bg-muted/50 border-border text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </SettingGroup>

                {/* Cursor & Display */}
                <SettingGroup title="Cursor & Display" icon={<MousePointer2 className="w-4 h-4" />}>
                  <ToggleButton
                    label="Big Cursor"
                    icon={<MousePointer2 className="w-4 h-4" />}
                    active={settings.bigCursor}
                    onClick={() => update("bigCursor", !settings.bigCursor)}
                  />
                  <ToggleButton
                    label="Hide Images"
                    icon={<ImageOff className="w-4 h-4" />}
                    active={settings.hideImages}
                    onClick={() => update("hideImages", !settings.hideImages)}
                  />
                  <ToggleButton
                    label="Stop Animations"
                    icon={<Pause className="w-4 h-4" />}
                    active={settings.stopAnimations}
                    onClick={() => update("stopAnimations", !settings.stopAnimations)}
                  />
                </SettingGroup>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-border bg-muted/30">
                <p className="text-[10px] text-muted-foreground text-center font-body">
                  Settings are saved automatically and persist across sessions.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Sub-components ─── */

const SettingGroup = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card p-3 space-y-2.5">
    <div className="flex items-center gap-2 text-foreground">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{icon}</div>
      <span className="text-sm font-display font-semibold">{title}</span>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

const ToggleButton = ({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left text-sm font-body transition-all ${
      active
        ? "bg-primary/10 border-primary/40 text-primary font-medium"
        : "bg-muted/30 border-border text-muted-foreground hover:border-primary/20 hover:bg-muted/50"
    }`}
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
    }`}>
      {icon}
    </div>
    <span className="flex-1">{label}</span>
    <div className={`w-9 h-5 rounded-full transition-all flex items-center ${
      active ? "bg-primary justify-end" : "bg-border justify-start"
    }`}>
      <div className={`w-4 h-4 rounded-full mx-0.5 transition-colors ${
        active ? "bg-primary-foreground" : "bg-muted-foreground/50"
      }`} />
    </div>
  </button>
);

const SliderControl = ({ label, value, min, max, step, unit, onInc, onDec }: {
  label: string; value: number; min: number; max: number; step: number; unit: string;
  onInc: () => void; onDec: () => void;
}) => (
  <div className="flex items-center justify-between gap-2">
    <span className="text-xs font-body text-muted-foreground flex-1">{label}</span>
    <div className="flex items-center gap-1.5">
      <button
        onClick={onDec}
        disabled={value <= min}
        className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-30 transition-colors"
      >
        <Minus className="w-3 h-3" />
      </button>
      <span className="text-xs font-body font-semibold text-foreground w-12 text-center">
        {value}{unit}
      </span>
      <button
        onClick={onInc}
        disabled={value >= max}
        className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-30 transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  </div>
);

export default AccessibilityWidget;
