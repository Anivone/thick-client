import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import CurrentUserContext, { CurrentUser } from "./context/CurrentUserContext";
import { MainPage } from "./pages/MainPage";
import { AuthPage } from "./pages/AuthPage";
import { ManageBookPage } from "./pages/ManageBookPage";

function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="content min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <Router>
          <Routes>
            <Route path={"/login"} element={<AuthPage authType={"login"} />} />
            <Route
              path={"/register"}
              element={<AuthPage authType={"signup"} />}
            />
            <Route path={"/addBook"} element={<ManageBookPage type="add" />} />
            <Route
              path={"/editBook/*"}
              element={<ManageBookPage type="edit" />}
            />
            <Route path={"/*"} element={<MainPage />} />
          </Routes>
        </Router>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
