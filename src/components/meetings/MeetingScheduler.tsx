
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Users, Video, Link as LinkIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface MeetingSchedulerProps {
  username: string;
}

type MeetingType = "instant" | "scheduled";

interface MeetingRoom {
  id: string;
  name: string;
  type: MeetingType;
  date?: Date;
  participants: string[];
  link: string;
}

const MeetingScheduler: React.FC<MeetingSchedulerProps> = ({ username }) => {
  const [activeTab, setActiveTab] = useState<MeetingType>("instant");
  const [meetingName, setMeetingName] = useState("");
  const [participants, setParticipants] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetingRooms, setMeetingRooms] = useState<MeetingRoom[]>([
    {
      id: "meeting-1",
      name: "Weekly Team Sync",
      type: "scheduled",
      date: new Date(new Date().setHours(14, 0, 0, 0)),
      participants: ["Alex", "Jamie", "Taylor"],
      link: "https://meet.avyo.pro/weekly-sync",
    },
  ]);
  const { toast } = useToast();

  const handleCreateMeeting = () => {
    if (!meetingName) {
      toast({
        title: "Meeting name required",
        description: "Please enter a name for your meeting.",
        variant: "destructive",
      });
      return;
    }

    const newMeeting: MeetingRoom = {
      id: `meeting-${Date.now()}`,
      name: meetingName,
      type: activeTab,
      link: `https://meet.avyo.pro/${meetingName.toLowerCase().replace(/\s+/g, "-")}`,
      participants: participants ? participants.split(",").map(p => p.trim()) : [],
    };

    if (activeTab === "scheduled" && selectedDate) {
      newMeeting.date = selectedDate;
    }

    setMeetingRooms([newMeeting, ...meetingRooms]);
    
    toast({
      title: "Meeting created",
      description: `Your ${activeTab} meeting has been created successfully.`,
    });

    setMeetingName("");
    setParticipants("");
  };

  const handleJoinMeeting = (meeting: MeetingRoom) => {
    toast({
      title: "Joining meeting",
      description: `Connecting to ${meeting.name}...`,
    });
    // In a real app, this would launch the meeting interface
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied",
      description: "Meeting link copied to clipboard",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeTab === "instant" ? "default" : "outline"}
            onClick={() => setActiveTab("instant")}
            className="flex items-center gap-2"
          >
            <Video size={16} />
            Instant Meeting
          </Button>
          <Button
            variant={activeTab === "scheduled" ? "default" : "outline"}
            onClick={() => setActiveTab("scheduled")}
            className="flex items-center gap-2"
          >
            <Calendar size={16} />
            Schedule Meeting
          </Button>
        </div>

        <div className="space-y-3">
          <div>
            <Input
              placeholder="Meeting name"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
            />
          </div>
          <div>
            <Input
              placeholder="Participants (comma-separated emails)"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
            />
          </div>
          {activeTab === "scheduled" && (
            <div className="border rounded-md p-3 flex justify-center bg-white">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md pointer-events-auto"
              />
            </div>
          )}
          <Button
            onClick={handleCreateMeeting}
            className="w-full bg-avyo-primary hover:bg-avyo-secondary"
          >
            {activeTab === "instant" ? "Start Meeting Now" : "Schedule Meeting"}
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <h3 className="text-lg font-semibold mb-3">Your Meetings</h3>
        {meetingRooms.length > 0 ? (
          <div className="space-y-3">
            {meetingRooms.map((meeting) => (
              <Card key={meeting.id} className="p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{meeting.name}</h4>
                    <p className="text-sm text-gray-500">
                      {meeting.type === "scheduled" && meeting.date
                        ? meeting.date.toLocaleString()
                        : "Instant Meeting"}
                    </p>
                    {meeting.participants.length > 0 && (
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Users size={14} className="mr-1" />
                        <span>{meeting.participants.join(", ")}</span>
                      </div>
                    )}
                  </div>
                  <div className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCopyLink(meeting.link)}
                      className="flex items-center gap-1"
                    >
                      <LinkIcon size={14} />
                      <span className="hidden sm:inline">Copy Link</span>
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleJoinMeeting(meeting)}
                    >
                      Join
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No meetings yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingScheduler;
