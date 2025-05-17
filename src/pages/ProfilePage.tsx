
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/context/UserContext";
import { ArrowLeft, User, Users } from "lucide-react";
import AvyoLogo from "@/components/logo/AvyoLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const { username } = useContext(UserContext);
  const navigate = useNavigate();

  if (!username) {
    navigate("/");
    return null;
  }

  const teamMembers = [
    { id: 1, name: "Alex Johnson", role: "Product Manager", email: "alex@example.com", avatar: "" },
    { id: 2, name: "Taylor Smith", role: "UX Designer", email: "taylor@example.com", avatar: "" },
    { id: 3, name: "Jamie Wilson", role: "Developer", email: "jamie@example.com", avatar: "" },
  ];

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
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={16} />
              <span>My Profile</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users size={16} />
              <span>Team Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 col-span-1">
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-avyo-primary/20">
                    <AvatarFallback className="bg-avyo-primary text-white text-2xl">
                      {username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <p className="text-gray-500">Business Account</p>
                  
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
                      <p>Avyo Pro - Business</p>
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
                      <span>Meeting settings</span>
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
          </TabsContent>

          <TabsContent value="team">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Team Members</h3>
                <Button className="bg-avyo-primary hover:bg-avyo-secondary">Add Member</Button>
              </div>
              
              <div className="space-y-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center">
                      <Avatar className="mr-3">
                        <AvatarFallback className="bg-avyo-secondary/30 text-avyo-secondary">
                          {member.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.role}</p>
                        <p className="text-xs text-gray-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Message</Button>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
