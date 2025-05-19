
import { createContext, useContext } from "react";
import { User } from "../types";

interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
});

export const useUser = () => useContext(UserContext);
