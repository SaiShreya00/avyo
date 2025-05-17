
import LoginForm from "@/components/auth/LoginForm";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import AvyoLogo from "@/components/logo/AvyoLogo";

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
          Your interactive AI companion for every occasion
        </p>
      </div>
      
      <LoginForm onLogin={handleLogin} />
      
      <div className="mt-8 text-center max-w-md">
        <h2 className="text-lg font-semibold text-avyo-dark mb-2">Meet Your Personal AI Avatar</h2>
        <p className="text-sm text-gray-600">
          Avyo's avatars celebrate global festivals, provide real-time news and weather, 
          and respond to your emotional needs - all while addressing you personally.
        </p>
      </div>
    </div>
  );
};

export default Login;
