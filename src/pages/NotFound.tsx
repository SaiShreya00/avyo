
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-avyo-primary/5 to-avyo-accent/5 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-avyo-primary">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <Button
          onClick={() => navigate("/")}
          className="bg-avyo-primary hover:bg-avyo-secondary"
        >
          <Home className="mr-2" size={16} />
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
