import { useContext } from "react";
import userContext from "../utils/userContext";
const Profile = () => {
  const data = useContext(userContext);
  //check if user is loged in
  console.log(data);
  if (data.length === 0) {
    return <h1>User Not Logged in</h1>;
  }
  return (
    <div className="">
      <h1>Profile</h1>
      <h3>Name : {data.name} </h3>
    </div>
  );
};
export default Profile;
