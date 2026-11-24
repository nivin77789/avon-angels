import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  role: "bot" | "user";
  text: string;
}

const quickReplies = [
  "What services do you offer?",
  "How much does care cost?",
  "How do I book an assessment?",
  "What areas do you cover?",
];

const botResponses: Record<string, string> = {
  "what services do you offer?": "We offer Personal Care, Live-in Care, Dementia Care, Companionship, Night Care, Respite Care, and Complex Care. Would you like to know more about any specific service?",
  "how much does care cost?": "Our care packages start from competitive rates tailored to your needs. For a personalised quote, please fill out our Free Assessment form, chat on WhatsApp, or call us at +44 7500 111987.",
  "how do i book an assessment?": "You can book a free care assessment by filling out the contact form on our website, messaging us on WhatsApp, or calling us directly at +44 7500 111987. We'll arrange a home visit at a time that suits you!",
  "what areas do you cover?": "We cover all of Avon, Bath, Bristol and surrounding areas. Contact us to check if we serve your specific location!",
};

const getReply = (msg: string): string => {
  const lower = msg.toLowerCase().trim();
  for (const [key, val] of Object.entries(botResponses)) {
    if (lower.includes(key.replace("?", "").slice(0, 15))) return val;
  }
  if (lower.includes("service")) return botResponses["what services do you offer?"];
  if (lower.includes("cost") || lower.includes("price") || lower.includes("much")) return botResponses["how much does care cost?"];
  if (lower.includes("book") || lower.includes("assess")) return botResponses["how do i book an assessment?"];
  if (lower.includes("area") || lower.includes("cover") || lower.includes("location")) return botResponses["what areas do you cover?"];
  if (lower.includes("whatsapp")) return "You can message us directly on WhatsApp at +44 7500 111987 or click the WhatsApp widget at the bottom left!";
  if (lower.includes("hello") || lower.includes("hi")) return "Hello! 👋 Welcome to Avon Angels Homecare. How can I help you today?";
  if (lower.includes("thank")) return "You're welcome! Is there anything else I can help with?";
  return "Thank you for your message! For detailed enquiries, please call us at +44 7500 111987, chat on WhatsApp, or fill out our Free Assessment form. We're happy to help!";
};

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hello! 👋 I'm the Avon Angels assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { role: "bot", text: getReply(text) }]);
    }, 600);
  };

  return (
    <>
      {/* Toggle */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-3 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-primary-foreground shadow-xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {open ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-20 right-3 sm:bottom-24 sm:right-6 z-50 w-[360px] max-w-[calc(100vw-1.5rem)] bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden flex flex-col"
            style={{ height: "480px" }}
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-semibold text-sm">Avon Angels</div>
                <div className="text-xs opacity-80 font-body">Online • Ready to help</div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${m.role === "user" ? "justify-end" : ""}`}
                >
                  {m.role === "bot" && (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm font-body ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}>
                    {m.text}
                  </div>
                  {m.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
              <div ref={endRef} />

              {/* Quick replies */}
              {messages.length <= 1 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {quickReplies.map(q => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="text-xs font-body px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={e => { e.preventDefault(); send(input); }}
              className="p-3 border-t border-border/50 flex gap-2"
            >
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message…"
                className="rounded-full text-sm font-body flex-1"
              />
              <Button type="submit" size="icon" className="rounded-full w-9 h-9 flex-shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
