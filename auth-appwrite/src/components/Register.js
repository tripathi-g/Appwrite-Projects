import { useState, useContext } from "react";
import appwriteLogo from "../img/appwrite.png";
import { account } from "../utils/appwriteConfig";
import { ID } from "appwrite";
import { Link, useNavigate, Navigate } from "react-router-dom";
import userContext from "../utils/userContext";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { userInfo, setUserInfo } = useContext(userContext);

  const navigate = useNavigate();
  const registerUser = async (e) => {
    try {
      e.preventDefault();
      const promise = await account.create(
        ID.unique(),
        email,
        password,
        fullName
      );
      if (promise) {
        loginUser();
      }
    } catch (err) {
      setStatusMessage(err.message);
    }
  };

  const loginUser = () => {
    account.createEmailSession(email, password).then((res) => {
      setUserInfo(res);
      navigate("/profile");
    });
  };

  if (userInfo.length !== 0) {
    return <Navigate to="/profile" />;
  }

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
      <form className="w-5/6 md:w-[350px]" onSubmit={registerUser}>
        <div className="w-full flex-col mt-8 flex justify-center items-center">
          <div className="w-full">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              required
              className="block w-full border border-gray-400 px-4 py-2 rounded-md"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
              placeholder="Full Name"
            />
          </div>
          <div className="mt-2 w-full">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              required
              className="block w-full border border-gray-400 px-4 py-2 rounded-md"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
            />
          </div>
          <div className="mt-2 w-full">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              required
              className="block w-full border border-gray-400 px-4 py-2 rounded-md"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-pink-600 text-white px-4 py-2.5 font-bold mt-4 w-full"
          >
            Register
          </button>
          <Link to="/login" className="w-full">
            <p className="mt-2 text-center">Login</p>
          </Link>
          <p className="my-4">{statusMessage}</p>
        </div>
      </form>
    </div>
  );
};

export default Register;
