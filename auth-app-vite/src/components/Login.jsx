import { useState, useContext } from "react";

import { Link, useNavigate, Navigate } from "react-router-dom";
import useAppwrite from "../utils/useAppwrite";
import userContext from "../utils/userContext";
import Header from "./Header";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(userContext);
  const { loginUserEmail } = useAppwrite();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUserEmail(email, password).then(
      (res) => {
        setUserInfo(res);
        console.log(res);
        navigate("/profile");
      },
      (err) => {
        setStatusMessage(err.message);
      }
    );
  };

  if (userInfo.length !== 0) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className="flex h-full flex-col p-4 justify-center items-center">
      <Header />
      <form className="w-5/6 md:w-[350px]" onSubmit={handleLogin}>
        <div className="w-full flex-col mt-8 flex justify-center items-center">
          <div className="w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="block w-full border border-gray-400 px-4 py-2 rounded-sm"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
            />
          </div>
          <div className="mt-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="block w-full border border-gray-400 px-4 py-2 rounded-sm"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="rounded-sm bg-pink-600 text-white px-4 py-2.5 font-bold mt-4 w-full"
          >
            Sign In
          </button>
          <Link to="/register" className="w-full">
            <p className="mt-2 text-pink-800 font-semibold">
              Don't have and Account ? Sign Up here
            </p>
          </Link>
          {statusMessage !== "" ? (
            <p className="my-4 p-4 text-sm bg-red-100">{statusMessage}</p>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
