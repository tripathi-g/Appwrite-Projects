import appwriteLogo from "../img/appwrite.png";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../utils/userContext";
const Home = () => {
  const { userInfo } = useContext(userContext);
  return userInfo.length === 0 ? (
    <div className="m-4 flex flex-col h-full justify-center items-center">
      <div className="flex flex-wrap justify-center items-center">
        <h1 className="inline text-3xl font-bold">
          Authentication App powered by
        </h1>
        &nbsp;
        <img
          className="inline h-10 w-auto"
          src={appwriteLogo}
          alt="appwrite logo"
        />
      </div>
      <div className="flex mt-8 justify-center items-center">
        <Link to="/login">
          <button className="rounded-md bg-pink-700 text-white py-4 px-8 font-bold text-xl mr-3">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="rounded-md border border-pink-700 text-pink-700 py-4 px-8 font-medium text-xl ml-3">
            Register
          </button>
        </Link>
      </div>
    </div>
  ) : (
    <Navigate to="/profile" />
  );
};

export default Home;
