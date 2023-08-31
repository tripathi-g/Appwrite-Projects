import { useState, useContext } from "react";
import Header from "./Header";
import useAppwrite from "../utils/useAppwrite";
import { Link, useNavigate, Navigate } from "react-router-dom";
import userContext from "../utils/userContext";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const { userInfo, setUserInfo } = useContext(userContext);
  const [signUpBtnText, setSignUpBtnText] = useState("Sign Up");
  const navigate = useNavigate();

  const { loginUserEmail, signUpUser, addUserToTeamA, isLoggedIn } =
    useAppwrite();

  const registerUser = async (e) => {
    e.preventDefault();
    setSignUpBtnText("Signing Up.. Please Wait");
    setStatusMessage("");
    try {
      const signup = await signUpUser(email, password, fullName);

      if (signup) {
        console.log("inside signup");
        setSignUpBtnText("Sign Up");
        loginUserEmail(email, password).then(
          () => {
            isLoggedIn().then((res) => {
              setUserInfo(res);
              addUserToTeamA(userInfo.email);
            });
            navigate("/profile");
          },
          (err) => {
            setStatusMessage(err.message);
          }
        );
      }
    } catch (err) {
      setSignUpBtnText("Sign Up");
      setStatusMessage(err.message);
    }
  };

  if (userInfo.length !== 0) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="flex h-full flex-col p-4 justify-center items-center">
      <Header />
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
            {signUpBtnText}
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
