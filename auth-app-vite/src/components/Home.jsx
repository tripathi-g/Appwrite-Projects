import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../utils/userContext";
import Header from "./Header";
import { account } from "../utils/useAppwrite";
const Home = () => {
  const { userInfo } = useContext(userContext);

  const handleGoogleLogin = () => {
    try {
      account.createOAuth2Session("google",window.location.href,window.location.href);
    } catch (err) {
      console.log(err.message);
    }
  };

  return userInfo.length === 0 ? (
    <div className="m-4 h-full flex flex-col justify-center items-center">
      <Header />
      <div className="mt-8 w-full max-w-[400px] flex flex-col justify-center items-center">
        <div className="flex w-full justify-between items-center">
          <Link to="/login" className="w-[50%]">
            <button className="w-full rounded-sm bg-pink-700 border border-pink-700 text-white py-4 px-8 font-bold text-xl">
              Login
            </button>
          </Link>
          <Link to="/register" className="w-[50%]">
            <button className="w-full rounded-sm border border-pink-700 text-pink-700 py-4 px-8 font-medium text-xl">
              Register
            </button>
          </Link>
        </div>
        <div className="mt-4 w-full">
          <button
            className="w-full rounded-sm bg-gray-700 text-white py-4 px-8 font-bold text-xl"
            onClick={handleGoogleLogin}
          >
            Google Login
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/profile" />
  );
};

export default Home;
