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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-avyo-primary/10 to-avyo-accent/5">
      {/* Header Section */}
      <header className="w-full p-4 md:p-6 flex justify-between items-center">
        <AvyoLogo size={40} className="justify-center" />
        <button className="text-avyo-primary font-medium hover:text-avyo-accent transition-colors">
          Contact Us
        </button>
      </header>
      
      {/* Hero Section */}
      <section className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 py-10 md:py-20 gap-8 md:gap-16 max-w-7xl mx-auto">
        <div className="w-full max-w-md text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-avyo-dark">
            Meet <span className="text-avyo-primary">Avyo</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your intelligent AI companion designed for personal assistance
          </p>
          <p className="text-lg text-avyo-accent italic mb-6">
            A whisper of tomorrow
          </p>
          <div className="flex flex-col md:flex-row gap-2 justify-center md:justify-start">
            <button className="px-6 py-3 bg-avyo-primary text-white rounded-lg hover:bg-avyo-secondary transition-colors">
              Learn More
            </button>
            <button className="px-6 py-3 border border-avyo-primary text-avyo-primary rounded-lg hover:bg-avyo-primary/5 transition-colors">
              View Demo
            </button>
          </div>
        </div>
        
        <div className="w-full max-w-md">
          <LoginForm onLogin={handleLogin} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-avyo-dark mb-10">
            Why Choose Avyo Pro?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-avyo-primary/10 p-3 rounded-full">
                  <MessageCircle className="text-avyo-primary" size={24} />
                </div>
                <h3 className="font-medium text-lg">Smart AI Chat</h3>
              </div>
              <p className="text-gray-600">
                Get personalized assistance with daily tasks, research, writing, and more through our intelligent chat interface.
              </p>
            </Card>
            
            <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-avyo-primary/10 p-3 rounded-full">
                  <svg className="text-avyo-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Lightning Fast</h3>
              </div>
              <p className="text-gray-600">
                Experience rapid response times with our optimized AI system designed for efficiency and performance.
              </p>
            </Card>
            
            <Card className="p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-avyo-primary/10 p-3 rounded-full">
                  <svg className="text-avyo-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-medium text-lg">Private & Secure</h3>
              </div>
              <p className="text-gray-600">
                Your data stays private with our secure system that prioritizes user privacy and information security.
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-avyo-dark mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6 text-left">
              <p className="italic text-gray-700 mb-4">"Avyo has become an essential part of my daily workflow. Its ability to understand complex queries and provide accurate information is remarkable."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-avyo-primary/20 rounded-full flex items-center justify-center text-avyo-primary font-bold">
                  J
                </div>
                <div className="ml-3">
                  <p className="font-medium">John Davis</p>
                  <p className="text-sm text-gray-500">Product Manager</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 text-left">
              <p className="italic text-gray-700 mb-4">"I'm impressed with how intuitive and helpful Avyo is. It's like having a personal assistant available whenever I need help."</p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-avyo-primary/20 rounded-full flex items-center justify-center text-avyo-primary font-bold">
                  L
                </div>
                <div className="ml-3">
                  <p className="font-medium">Lisa Chen</p>
                  <p className="text-sm text-gray-500">Content Creator</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Footer Section */}
      <footer className="bg-avyo-dark text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <AvyoLogo size={40} className="mb-4" variant="full" />
            <p className="text-gray-300 mt-2">
              Your AI companion for a smarter life
            </p>
            <p className="text-gray-400 italic mt-1">
              avyo - A whisper of tomorrow
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-700 text-center md:text-left text-gray-400 text-sm">
          <p>&copy; 2025 Avyo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
