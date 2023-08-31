import { useContext, useEffect } from "react";
import userContext from "../utils/userContext";
import { Navigate } from "react-router-dom";
import useAppwrite from "../utils/useAppwrite";

const Profile = () => {
  const { userInfo, setUserInfo } = useContext(userContext);
  const { logoutUser } = useAppwrite();

  const handleLogout = () => {
    logoutUser().then(() => {
      setUserInfo([]);
    });
  };

  console.log("profile page" + userInfo);
  if (userInfo.length !== 0) {
    return (
      <div className="flex h-full justify-center items-center">
        <div>
          <h1 className="mb-4 font-bold text-2xl">User Profile Page</h1>
          <h3 className="mb-2 font-medium text-l">Hello {userInfo.name}</h3>
          <h3 className="mb-2 font-medium text-l">
            Your Email id is {userInfo.email}{" "}
          </h3>
          <button
            className="rounded-sm border border-pink-700 text-pink-700 py-4 px-8 font-medium text-xl mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
};
export default Profile;
