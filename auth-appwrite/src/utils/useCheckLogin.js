import { useState, useEffect } from "react";
import { account } from "./appwriteConfig";
const useCheckLogin = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (userData.length === 0) {
      checkIsLoggedIn();
    }
  }, []);

  const checkIsLoggedIn = () => {
    console.log("checkIsLoggedIn fn called");
    return new Promise(async (resolve, reject) => {
      try {
        const data = await account.get();
        setUserData(data);
        if (data) {
          resolve(true);
        }
      } catch (e) {
        // reject(false);
        console.log(e.message);
      }
    });
  };

  return { userData, setUserData };
};

export default useCheckLogin;
