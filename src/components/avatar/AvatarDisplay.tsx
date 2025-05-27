
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { getFestivalAvatar, getMoodAvatar } from "@/utils/avatarUtils";
import { Calendar, Cloud, Sun } from "lucide-react";
import Avatar3D from "./Avatar3D";

interface AvatarDisplayProps {
  username: string;
  message?: string;
  isWaving?: boolean;
}

const AvatarDisplay = ({ username, message, isWaving = false }: AvatarDisplayProps) => {
  const [avatar, setAvatar] = useState("");
  const [weather, setWeather] = useState({ temp: "24°C", condition: "Sunny" });
  const [news, setNews] = useState("Latest: New advances in AI technology announced today!");
  const [festival, setFestival] = useState("");
  const [userMood, setUserMood] = useState("neutral");
  const [isThinking, setIsThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Detect current festival
    const today = new Date();
    const festivalInfo = getFestivalAvatar(today);
    setAvatar(festivalInfo.avatarSrc);
    setFestival(festivalInfo.name);

    // For demo: show a welcome message
    if (username) {
      toast({
        title: `Hello, ${username}!`,
        description: `Today is ${today.toLocaleDateString()}. ${
          festivalInfo.name ? `Happy ${festivalInfo.name}!` : "Have a great day!"
        }`,
      });
    }
  }, [username, toast]);

  useEffect(() => {
    // Analyze mood and trigger animations if there's a message
    if (message) {
      // Show listening animation first
      setIsListening(true);
      
      setTimeout(() => {
        setIsListening(false);
        setIsThinking(true);
        
        // Analyze mood after "thinking"
        setTimeout(() => {
          const detectedMood = analyzeMood(message);
          setUserMood(detectedMood);
          setIsThinking(false);
          setIsSpeaking(true);
          
          // Stop speaking after a moment
          setTimeout(() => {
            setIsSpeaking(false);
          }, 2000);
        }, 1500);
      }, 1000);
    }
  }, [message]);

  const analyzeMood = (text: string): "happy" | "sad" | "angry" | "neutral" => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes("happy") || 
        lowerText.includes("great") || 
        lowerText.includes("awesome") || 
        lowerText.includes("excellent")) {
      return "happy";
    } else if (lowerText.includes("sad") || 
               lowerText.includes("unhappy") || 
               lowerText.includes("depressed") || 
               lowerText.includes("disappointed")) {
      return "sad";
    } else if (lowerText.includes("angry") || 
               lowerText.includes("upset") || 
               lowerText.includes("frustrated") || 
               lowerText.includes("annoyed")) {
      return "angry";
    }
    
    return "neutral";
  };

  const handleAvatarClick = () => {
    // Trigger random interaction on click
    const interactions = ["wave", "think", "speak"];
    const randomInteraction = interactions[Math.floor(Math.random() * interactions.length)];
    
    if (randomInteraction === "wave") {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    } else if (randomInteraction === "think") {
      setIsThinking(true);
      setTimeout(() => setIsThinking(false), 3000);
    } else if (randomInteraction === "speak") {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Card className="p-6 bg-gradient-to-br from-avyo-primary/20 to-avyo-highlight shadow-xl rounded-xl relative overflow-hidden border-avyo-accent/30">
        <div className="absolute top-4 right-4 flex space-x-2 text-avyo-dark/70">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span className="text-xs">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sun size={16} />
            <span className="text-xs">{weather.temp}</span>
          </div>
        </div>
        
        {festival && (
          <div className="absolute top-4 left-4 bg-avyo-accent/20 px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-avyo-accent">{festival}</span>
          </div>
        )}

        <div onClick={handleAvatarClick} className="cursor-pointer">
          <Avatar3D 
            isWaving={isWaving} 
            userMood={userMood}
            isThinking={isThinking}
            isListening={isListening}
            isSpeaking={isSpeaking}
          />
        </div>
        
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold">
            Hello, <span className="text-avyo-primary">{username || "Friend"}</span>!
          </h3>
          
          {isListening && (
            <p className="mt-2 text-sm text-avyo-accent">
              I'm listening... 👂
            </p>
          )}
          
          {isThinking && (
            <p className="mt-2 text-sm text-avyo-accent">
              Let me think about that... 🤔
            </p>
          )}
          
          {isSpeaking && (
            <p className="mt-2 text-sm text-avyo-accent">
              Here's what I think! 💬
            </p>
          )}
          
          {!isListening && !isThinking && !isSpeaking && (
            <>
              {userMood === "sad" && (
                <p className="mt-2 text-sm text-avyo-accent">
                  It seems you're feeling down. How can I cheer you up today?
                </p>
              )}
              
              {userMood === "angry" && (
                <p className="mt-2 text-sm text-avyo-accent">
                  I notice you're frustrated. Let's take a deep breath together.
                </p>
              )}
              
              {(userMood === "neutral" || userMood === "happy") && (
                <p className="mt-2 text-sm text-gray-600">
                  How can I assist you today? Click me for a surprise! 
                </p>
              )}
            </>
          )}
        </div>
      </Card>
      
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-3 border border-avyo-primary/20">
        <div className="flex items-center space-x-2">
          <Cloud className="text-avyo-primary" size={18} />
          <h4 className="text-sm font-medium text-gray-700">Today's Highlights</h4>
        </div>
        <p className="mt-1 text-xs text-gray-600">{news}</p>
      </div>
    </div>
  );
};

export default AvatarDisplay;
