import { Header } from "../components/Header";
import { useState } from "react";
import { useRequest } from "../hooks/useRequest";
import { useNavigate } from "react-router-dom";

export const AuthPage = ({ authType }: { authType: string }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [doRequest, errors] = useRequest({
    url: `/api/auth/${authType}`,
    method: "post",
    body: { login, password },
    onSuccess: () => navigate("/"),
  });

  const handleLogin = (e: any) => {
    setLogin(e.target.value);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <>
      <Header authType={authType} />
      <div className="w-50 m-auto">
        <form className="w-50 m-auto d-flex flex-column justify-content-center align-items-center">
          <h3 className="mb-3">
            {authType === "login" ? "Login" : "Register"}
          </h3>
          <div className="form-floating w-100">
            <input
              id={"login-input"}
              className="form-control mb-2"
              placeholder={"Login"}
              value={login}
              onChange={handleLogin}
            />
            <label htmlFor={"login-input"} className="text-black">
              Login
            </label>
          </div>
          <div className="form-floating w-100">
            <input
              id={"password-input"}
              className="form-control"
              placeholder={"Password"}
              type={"password"}
              value={password}
              onChange={handlePassword}
            />
            <label htmlFor={"password-input"} className="text-black">
              Password
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type={"submit"}
            className="w-100 btn-primary btn-lg mt-4"
          >
            {authType === "login" ? "Login" : "Register"}
          </button>
        </form>
        {errors}
      </div>
    </>
  );
};
