import React, { useEffect } from "react";
import { account } from "../utils/useAppwrite";
const GoogleLogin = () => {
  useEffect(() => {
    account.createJWT().then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  });
  return <div>GoogleLogin</div>;
};

export default GoogleLogin;
