import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";
import axios from "axios";

export const Header = ({ authType }: { authType?: string }) => {
  const currentUserContext = useContext(CurrentUserContext);

  const handleSignOut = async () => {
    await axios.post("/api/auth/signout", {});
  };

  const links = [
    currentUserContext.currentUser?.role === "admin" && (
      <a className="btn btn-success nav-link link-light" href={"/addBook"}>
        Add Book
      </a>
    ),
    currentUserContext.currentUser && (
      <a
        className="nav-link link-light"
        href={"/login"}
        onClick={handleSignOut}
      >
        Sign Out
      </a>
    ),
    !currentUserContext.currentUser && authType === "login" && (
      <a className="nav-link link-light" href={"/register"}>
        Register
      </a>
    ),
    !currentUserContext.currentUser && authType === "signup" && (
      <a className="nav-link link-light" href={"/login"}>
        Login
      </a>
    ),
  ];

  return (
    <header className="fixed-top p-3 bg-dark text-white">
      <div className="w-75 m-auto">
        <h3 className="float-md-start">
          <a href={"/"} className="logo">
            Books.com
          </a>
        </h3>
        <nav className="nav float-md-end">{links}</nav>
      </div>
    </header>
  );
};
