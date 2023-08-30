import appwriteLogo from "../img/appwrite.png";
import { Link } from "react-router-dom";

const Header = () => {
  console.log("header called");

  return (
    <div>
      <Link className="text-black" to="/">
          <span className="inline-block underline font-medium text-sm my-4 p-2">
            Back to Home
          </span>
        </Link>
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
    </div>
  );
};

export default Header;
