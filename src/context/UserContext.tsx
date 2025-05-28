
import { createContext, useState, ReactNode, useEffect } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  questionsAsked: number;
  incrementQuestionsAsked: () => void;
  resetQuestionsAsked: () => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  questionsAsked: 0,
  incrementQuestionsAsked: () => {},
  resetQuestionsAsked: () => {},
  isPremium: false,
  setIsPremium: () => {},
  isAuthenticated: false,
  logout: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState("");
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const { user, logout: firebaseLogout } = useFirebaseAuth();

  useEffect(() => {
    if (user) {
      setUsername(user.displayName || user.email || 'User');
    } else {
      setUsername("");
    }
  }, [user]);

  const incrementQuestionsAsked = () => {
    setQuestionsAsked(prev => prev + 1);
  };

  const resetQuestionsAsked = () => {
    setQuestionsAsked(0);
  };

  const logout = async () => {
    await firebaseLogout();
    setUsername("");
    setQuestionsAsked(0);
  };

  return (
    <UserContext.Provider 
      value={{ 
        username, 
        setUsername,
        questionsAsked,
        incrementQuestionsAsked,
        resetQuestionsAsked,
        isPremium,
        setIsPremium,
        isAuthenticated: !!user,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
