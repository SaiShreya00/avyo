
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserContext } from "@/context/UserContext";
import { ArrowLeft, User } from "lucide-react";
import AvyoLogo from "@/components/logo/AvyoLogo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfilePage = () => {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  if (!username) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-avyo-primary/10 to-avyo-accent/5 p-4 md:p-8">
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="mr-4"
          >
            <ArrowLeft size={20} />
          </Button>
          <AvyoLogo />
        </div>
      </header>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 col-span-1">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4 border-4 border-avyo-primary/20">
                <AvatarFallback className="bg-avyo-primary text-white text-2xl">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-gray-500">Personal Account</p>
              
              <Button className="mt-4 w-full">Edit Profile</Button>
            </div>
          </Card>
          
          <div className="col-span-1 md:col-span-2">
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Account Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p>{username.toLowerCase()}@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Plan</p>
                  <p>Avyo Pro</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p>May 2023</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email notifications</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Theme preferences</span>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
