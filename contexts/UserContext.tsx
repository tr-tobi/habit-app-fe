import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentUser: string;
  setCurrentUser: (value: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  return (
    <UserContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
