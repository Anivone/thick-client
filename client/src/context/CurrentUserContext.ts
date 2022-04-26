import { createContext, Dispatch, SetStateAction } from "react";

export enum Roles {
  USER = "user",
  ADMIN = "admin",
}

export interface CurrentUser {
  id: string;
  login: string;
  role: Roles;
}

interface CurrentUserContextProps {
  currentUser: CurrentUser | null;
  setCurrentUser: Dispatch<SetStateAction<CurrentUser | null>>;
}

const CurrentUserContext = createContext<CurrentUserContextProps>({
  currentUser: null,
  setCurrentUser: () => {},
});

export default CurrentUserContext;
