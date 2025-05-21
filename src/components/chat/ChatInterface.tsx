
import { useState, useRef, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateAIResponse } from "@/utils/aiUtils";
import { UserContext } from "@/context/UserContext";
import SubscriptionModal from "@/components/subscription/SubscriptionModal";

interface ChatInterfaceProps {
  username: string;
  onMessageSent: (message: string) => void;
}

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const FREE_MESSAGE_LIMIT = 20;

const ChatInterface = ({ username, onMessageSent }: ChatInterfaceProps) => {
  const { questionsAsked, incrementQuestionsAsked, isPremium, setIsPremium } = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `Hello ${username}! I'm Avyo, your personal AI assistant. How can I help you today?`,
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Check if user has reached the free message limit and is not premium
    if (questionsAsked >= FREE_MESSAGE_LIMIT && !isPremium) {
      setShowSubscriptionModal(true);
      return;
    }
    
    // Add user message to chat
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      sender: "user" as const,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    onMessageSent(input); // Pass message to parent for mood analysis
    setInput("");
    setIsTyping(true);
    
    try {
      // Get AI response
      const response = await generateAIResponse(input, username);
      
      // Add AI response to chat
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: response,
          sender: "ai",
          timestamp: new Date(),
        },
      ]);
      
      // Increment the questions counter
      incrementQuestionsAsked();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSubscribe = () => {
    setIsPremium(true);
    toast({
      title: "Welcome to Premium!",
      description: "You now have unlimited access to Avyo AI.",
    });
  };

  // Show message limit counter
  const renderMessageCounter = () => {
    if (isPremium) return null;
    
    return (
      <div className="text-xs text-gray-500 flex justify-center mb-2">
        {questionsAsked < FREE_MESSAGE_LIMIT ? (
          <span>{FREE_MESSAGE_LIMIT - questionsAsked} free messages remaining</span>
        ) : (
          <span className="text-avyo-primary">Message limit reached</span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full border rounded-lg bg-white overflow-hidden">
      <div className="p-3 border-b bg-avyo-background">
        <h2 className="text-lg font-semibold">Chat with Avyo</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                } space-x-2`}
              >
                {message.sender === "user" ? (
                  <div className="ms-2">
                    <Avatar className="border-2 border-avyo-primary">
                      <AvatarFallback className="bg-avyo-primary text-white">
                        <User size={16} />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="mr-2">
                    <Avatar>
                      <AvatarFallback className="bg-avyo-secondary text-white">
                        A
                      </AvatarFallback>
                      <AvatarImage src="/avatar-ai.png" />
                    </Avatar>
                  </div>
                )}
                
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === "user"
                      ? "bg-avyo-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <Avatar>
                  <AvatarFallback className="bg-avyo-secondary text-white">
                    A
                  </AvatarFallback>
                </Avatar>
                <div className="px-4 py-2 rounded-lg bg-gray-100">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-75"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={endOfMessagesRef} />
        </div>
      </ScrollArea>
      
      {renderMessageCounter()}
      
      <div className="p-3 border-t flex space-x-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1"
          disabled={questionsAsked >= FREE_MESSAGE_LIMIT && !isPremium}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!input.trim() || isTyping || (questionsAsked >= FREE_MESSAGE_LIMIT && !isPremium)}
          className="bg-avyo-primary hover:bg-avyo-secondary"
        >
          <Send size={18} />
        </Button>
      </div>

      <SubscriptionModal 
        open={showSubscriptionModal} 
        onOpenChange={setShowSubscriptionModal} 
        onSubscribe={handleSubscribe}
      />
    </div>
  );
};

export default ChatInterface;
