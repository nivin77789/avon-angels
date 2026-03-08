import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        sessionStorage.setItem("avon_admin", "true");
        navigate("/admin/dashboard");
      } else {
        toast({ title: "Invalid credentials", description: "Please check your username and password.", variant: "destructive" });
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl border border-border/50 p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm font-body text-muted-foreground mt-1">Avon Angels Homecare</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Username</label>
              <Input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required className="rounded-xl font-body" />
            </div>
            <div>
              <label className="text-sm font-body font-medium text-foreground mb-1.5 block">Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="rounded-xl font-body" />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-full font-body">
              <LogIn className="w-4 h-4 mr-2" /> {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
