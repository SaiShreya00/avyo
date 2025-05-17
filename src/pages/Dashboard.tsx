
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AvatarDisplay from "@/components/avatar/AvatarDisplay";
import ChatInterface from "@/components/chat/ChatInterface";
import { UserContext } from "@/context/UserContext";
import { LogOut, Calendar, Users, MessageCircle, Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AvyoLogo from "@/components/logo/AvyoLogo";
import MeetingScheduler from "@/components/meetings/MeetingScheduler";

const Dashboard = () => {
  const { username, setUsername } = useContext(UserContext);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");
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
    <div className="min-h-screen bg-gradient-to-br from-avyo-primary/10 to-avyo-accent/5 p-4 md:p-8">
      <header className="flex justify-between items-center mb-6">
        <AvyoLogo />
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => navigate("/profile")}
            className="hidden sm:flex items-center gap-2 border-avyo-accent text-avyo-accent hover:bg-avyo-accent/10"
          >
            <Users size={16} />
            <span>Team</span>
          </Button>
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
            <Tabs defaultValue="chat" className="w-full h-full" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-2 bg-avyo-background">
                <TabsTrigger value="chat" className="flex items-center gap-2">
                  <MessageCircle size={16} />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger value="meetings" className="flex items-center gap-2">
                  <Video size={16} />
                  <span>Meetings</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Schedule</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="chat" className="h-[calc(100%-48px)]">
                <ChatInterface 
                  username={username} 
                  onMessageSent={handleMessageSent}
                />
              </TabsContent>
              
              <TabsContent value="meetings" className="h-[calc(100%-48px)]">
                <MeetingScheduler username={username} />
              </TabsContent>
              
              <TabsContent value="schedule" className="h-[calc(100%-48px)]">
                <div className="p-6 h-full overflow-auto">
                  <h3 className="text-xl font-bold mb-4">Your Schedule</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <Card className="p-4 border-l-4 border-l-avyo-accent">
                      <h4 className="font-medium">Team Standup Meeting</h4>
                      <p className="text-sm text-gray-500">Today, 10:00 AM - 10:30 AM</p>
                      <div className="flex mt-2">
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                    </Card>
                    <Card className="p-4 border-l-4 border-l-avyo-primary">
                      <h4 className="font-medium">Client Presentation</h4>
                      <p className="text-sm text-gray-500">Today, 2:00 PM - 3:00 PM</p>
                      <div className="flex mt-2">
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                    </Card>
                    <Card className="p-4 border-l-4 border-l-avyo-secondary">
                      <h4 className="font-medium">Product Review</h4>
                      <p className="text-sm text-gray-500">Tomorrow, 11:00 AM - 12:00 PM</p>
                      <div className="flex mt-2">
                        <Button variant="outline" size="sm">Join</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
