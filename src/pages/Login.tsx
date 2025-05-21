
import LoginForm from "@/components/auth/LoginForm";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import AvyoLogo from "@/components/logo/AvyoLogo";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

const Login = () => {
  const { setUsername } = useContext(UserContext);

  const handleLogin = (username: string) => {
    setUsername(username);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-avyo-primary/10 to-avyo-accent/5 p-4">
      <div className="w-full max-w-md mb-8 text-center">
        <AvyoLogo size={60} className="justify-center mb-4" />
        <p className="mt-2 text-lg text-gray-600">
          Your AI companion for personal use
        </p>
      </div>
      
      <LoginForm onLogin={handleLogin} />
      
      <div className="mt-8 max-w-4xl">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-avyo-dark">Avyo Pro: The AI platform you'll love</h2>
          <p className="text-sm text-gray-600 mt-1">
            Perfect for personal use
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 mt-6">
          <Card className="p-4 border-t-4 border-t-avyo-primary">
            <div className="flex items-center gap-3">
              <div className="bg-avyo-primary/10 p-2 rounded-full">
                <MessageCircle className="text-avyo-primary" size={20} />
              </div>
              <h3 className="font-medium">Smart AI Chat</h3>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Get personalized assistance for work or personal tasks
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
