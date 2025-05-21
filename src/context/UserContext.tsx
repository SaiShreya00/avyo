
import { createContext, useState, ReactNode } from "react";

interface UserContextType {
  username: string;
  setUsername: (username: string) => void;
  questionsAsked: number;
  incrementQuestionsAsked: () => void;
  resetQuestionsAsked: () => void;
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
}

export const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  questionsAsked: 0,
  incrementQuestionsAsked: () => {},
  resetQuestionsAsked: () => {},
  isPremium: false,
  setIsPremium: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [username, setUsername] = useState("");
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  const incrementQuestionsAsked = () => {
    setQuestionsAsked(prev => prev + 1);
  };

  const resetQuestionsAsked = () => {
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
        setIsPremium
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
