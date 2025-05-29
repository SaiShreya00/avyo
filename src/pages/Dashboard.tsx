
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarDisplay from "@/components/avatar/AvatarDisplay";
import ChatInterface from "@/components/chat/ChatInterface";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AvyoLogo from "@/components/logo/AvyoLogo";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const [currentMessage, setCurrentMessage] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleMessageSent = (message: string) => {
    setCurrentMessage(message);
    
    // Trigger waving animation occasionally
    if (Math.random() > 0.7) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-avyo-primary/10 to-avyo-accent/5 flex items-center justify-center">
        <div className="text-center">
          <AvyoLogo size={60} />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const username = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-avyo-primary/10 to-avyo-accent/5 p-4 md:p-8">
      <header className="flex justify-between items-center mb-6">
        <AvyoLogo />
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2 border-avyo-primary text-avyo-primary hover:bg-avyo-primary/10"
          >
            <LogOut size={16} /> 
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <AvatarDisplay 
            username={username} 
            message={currentMessage}
            isWaving={isWaving}
          />
        </div>
        
        <div className="md:col-span-2 h-[600px]">
          <Card className="h-full shadow-lg border-0">
            <ChatInterface 
              username={username} 
              onMessageSent={handleMessageSent}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
