import { useState, useContext } from "react";
import appwriteLogo from "../img/appwrite.png";
import { Link } from "react-router-dom";
import { account } from "../utils/appwriteConfig";
import userContext from "../utils/userContext";
import useCheckLogin from "../utils/useCheckLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { setUserData } = useCheckLogin();

  const data = useContext(userContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("form submitted to login");
    const promise = account.createEmailSession(email, password);
    promise.then(
      (res) => {
        setStatusMessage("Login Successful");
        setUserData(res);
        console.log("Login Successful");
      },
      (err) => {
        setStatusMessage(err.message);
        console.log(err.message);
      }
    );
  };
  if (data.length === 0) {
    return (
      <div className="flex flex-col h-full p-4 justify-center items-center">
        <div className="flex flex-wrap justify-center items-center">
          <h1 className="inline text-3xl font-bold">
            Authentication App powered by
          </h1>
          &nbsp; &nbsp;
          <img
            className="inline h-10 w-auto"
            src={appwriteLogo}
            alt="appwrite logo"
          />
        </div>
        <form className="w-5/6 md:w-[350px]" onSubmit={handleLogin}>
          <div className="w-full flex-col mt-8 flex justify-center items-center">
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="block w-full border border-gray-400 px-4 py-2 rounded-md"
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
                className="block w-full border border-gray-400 px-4 py-2 rounded-md"
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
              className="rounded-md bg-pink-600 text-white px-4 py-2.5 font-bold mt-4 w-full"
            >
              Login
            </button>
            <Link to="/register" className="w-full">
              <p className="mt-2 text-center">Sign Up</p>
            </Link>
            <p className="m-4">{statusMessage}</p>
          </div>
        </form>
      </div>
    );
  } else {
    return <h1>User Already Logged In</h1>;
  }
};

export default Login;
