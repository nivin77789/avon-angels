import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, ref, onValue, update, remove } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Bell, Trash2, Eye, CheckCircle, Clock, User, Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface Assessment {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  careType: string;
  message: string;
  timestamp: number;
  read?: boolean;
}

const AdminDashboard = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selected, setSelected] = useState<Assessment | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (sessionStorage.getItem("avon_admin") !== "true") {
      navigate("/admin");
      return;
    }
    const assessRef = ref(db, "assessments");
    const unsub = onValue(assessRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) { setAssessments([]); return; }
      const list: Assessment[] = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
      list.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setAssessments(list);
      setUnreadCount(list.filter(a => !a.read).length);
    });
    return () => unsub();
  }, [navigate]);

  const markRead = (a: Assessment) => {
    setSelected(a);
    if (!a.read) {
      update(ref(db, `assessments/${a.id}`), { read: true });
    }
  };

  const handleDelete = (id: string) => {
    remove(ref(db, `assessments/${id}`));
    if (selected?.id === id) setSelected(null);
    toast({ title: "Deleted", description: "Assessment removed." });
  };

  const logout = () => {
    sessionStorage.removeItem("avon_admin");
    navigate("/admin");
  };

  const formatDate = (ts: number) => {
    if (!ts) return "—";
    return new Date(ts).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <h1 className="font-display font-bold text-lg text-foreground">Avon Angels — Admin</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="font-body">
              <LogOut className="w-4 h-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: assessments.length, icon: MessageSquare, color: "text-primary" },
            { label: "Unread", value: unreadCount, icon: Bell, color: "text-destructive" },
            { label: "Read", value: assessments.length - unreadCount, icon: CheckCircle, color: "text-accent" },
          ].map(s => (
            <div key={s.label} className="bg-card rounded-xl border border-border/50 p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-display font-bold text-foreground">{s.value}</div>
                <div className="text-xs font-body text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* List */}
          <div className="lg:col-span-2 space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {assessments.length === 0 && (
              <p className="text-center text-muted-foreground font-body py-12">No assessments yet.</p>
            )}
            <AnimatePresence>
              {assessments.map(a => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => markRead(a)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selected?.id === a.id ? "border-primary bg-primary/5" : "border-border/50 bg-card hover:border-primary/30"
                  } ${!a.read ? "ring-2 ring-primary/20" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <span className="font-display font-semibold text-sm text-foreground">{a.name}</span>
                      {!a.read && <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5">New</Badge>}
                    </div>
                    <button onClick={e => { e.stopPropagation(); handleDelete(a.id); }} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground font-body">
                    <Clock className="w-3 h-3" /> {formatDate(a.timestamp)}
                  </div>
                  <p className="text-xs text-muted-foreground font-body mt-1 truncate">{a.careType} — {a.location}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Detail */}
          <div className="lg:col-span-3">
            {selected ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl border border-border/50 p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display font-bold text-xl text-foreground">Assessment Details</h2>
                  <Badge variant="outline" className="font-body">{selected.careType}</Badge>
                </div>
                <div className="space-y-4">
                  {[
                    { icon: User, label: "Name", value: selected.name },
                    { icon: Phone, label: "Phone", value: selected.phone },
                    { icon: Mail, label: "Email", value: selected.email },
                    { icon: MapPin, label: "Location", value: selected.location },
                    { icon: Clock, label: "Submitted", value: formatDate(selected.timestamp) },
                  ].map(f => (
                    <div key={f.label} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <f.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs font-body text-muted-foreground">{f.label}</div>
                        <div className="text-sm font-body text-foreground font-medium">{f.value}</div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-border/50">
                    <div className="text-xs font-body text-muted-foreground mb-2">Message</div>
                    <p className="text-sm font-body text-foreground leading-relaxed bg-muted/50 rounded-xl p-4">{selected.message}</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-card rounded-2xl border border-border/50 p-12 text-center">
                <Eye className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground font-body">Select an assessment to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
