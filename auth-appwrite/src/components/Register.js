import { useState, useContext } from "react";
import Header, { headerWithHomeBtn } from "./Header";
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
  const HeaderModified = headerWithHomeBtn(Header);
  const registerUser = async (e) => {
    setStatusMessage("");
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
    <div className="flex h-full flex-col p-4 justify-center items-center">
      <HeaderModified />
      <form className="w-5/6 md:w-[350px]" onSubmit={registerUser}>
        <div className="w-full flex-col mt-8 flex justify-center items-center">
          <div className="w-full">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              required
              className="block w-full border border-gray-400 px-4 py-2 rounded-sm"
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
              className="block w-full border border-gray-400 px-4 py-2 rounded-sm"
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
              className="block w-full border border-gray-400 px-4 py-2 rounded-sm"
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
            className="rounded-sm bg-pink-600 text-white px-4 py-2.5 font-bold mt-4 w-full"
          >
            Sign Up
          </button>
          <Link to="/login" className="w-full">
            <p className="mt-2 text-pink-800 font-semibold">
              Already have an account ? Sign In here
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

export default Register;
