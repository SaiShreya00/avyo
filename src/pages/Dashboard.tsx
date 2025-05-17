
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AvatarDisplay from "@/components/avatar/AvatarDisplay";
import ChatInterface from "@/components/chat/ChatInterface";
import { UserContext } from "@/context/UserContext";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/toast";

const Dashboard = () => {
  const { username, setUsername } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // If no username is set, redirect to login
    if (!username) {
      navigate("/");
    }
  }, [username, navigate]);

  const handleMessageSent = (message: string) => {
    setCurrentMessage(message);
    
    // Trigger waving animation occasionally
    if (Math.random() > 0.7) {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setUsername("");
    navigate("/");
  };

  if (!username) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-avyo-primary/5 to-avyo-accent/5 p-4 md:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-avyo-primary">Avyo</h1>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut size={16} /> 
          <span className="hidden sm:inline">Logout</span>
        </Button>
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
