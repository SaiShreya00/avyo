
// List of major festivals with dates and avatar paths
// In a real app, these would be more complete and possibly come from an API
interface Festival {
  name: string;
  month: number; // 0-indexed (January is 0)
  day: number;
  avatarSrc: string;
}

const festivals: Festival[] = [
  { name: "New Year", month: 0, day: 1, avatarSrc: "/avatars/new-year.png" },
  { name: "Valentine's Day", month: 1, day: 14, avatarSrc: "/avatars/valentines.png" },
  { name: "St. Patrick's Day", month: 2, day: 17, avatarSrc: "/avatars/patrick.png" },
  { name: "Easter", month: 3, day: 9, avatarSrc: "/avatars/easter.png" }, // This would need to be dynamic
  { name: "Halloween", month: 9, day: 31, avatarSrc: "/avatars/halloween.png" },
  { name: "Thanksgiving", month: 10, day: 24, avatarSrc: "/avatars/thanksgiving.png" }, // US date
  { name: "Christmas", month: 11, day: 25, avatarSrc: "/avatars/christmas.png" },
  { name: "Diwali", month: 10, day: 12, avatarSrc: "/avatars/diwali.png" }, // This would need to be dynamic
  { name: "Chinese New Year", month: 1, day: 10, avatarSrc: "/avatars/chinese-new-year.png" }, // This would need to be dynamic
];

// Default avatars for different moods
const moodAvatars = {
  happy: "/avatars/mood-happy.png",
  sad: "/avatars/mood-sad.png",
  angry: "/avatars/mood-angry.png",
  neutral: "/avatars/mood-neutral.png",
};

// Function to get the current festival avatar if today is a festival day
export const getFestivalAvatar = (date: Date): { name: string; avatarSrc: string } => {
  const today = {
    month: date.getMonth(),
    day: date.getDate(),
  };

  // For demo purposes - check if any festival is today or within 3 days
  const currentFestival = festivals.find(
    (festival) => festival.month === today.month && 
    Math.abs(festival.day - today.day) <= 3 // Within 3 days
  );

  if (currentFestival) {
    return {
      name: currentFestival.name,
      avatarSrc: currentFestival.avatarSrc,
    };
  }

  // Default avatar if no festival
  return {
    name: "",
    avatarSrc: moodAvatars.neutral,
  };
};

// Function to get avatar based on mood
export const getMoodAvatar = (mood: "happy" | "sad" | "angry" | "neutral"): string => {
  return moodAvatars[mood] || moodAvatars.neutral;
};
