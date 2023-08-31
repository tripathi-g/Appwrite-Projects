import { Client, Account, Functions, ID } from "appwrite";
import userContext from "./userContext";

const useAppwrite = () => {
  const client = new Client();
  const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
  const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

  client.setEndpoint(endpoint).setProject(projectId);
  const account = new Account(client);
  const functions = new Functions(client);

  const loginUserEmail = (email, password) => {
    return new Promise((resolve, reject) => {
      account.createEmailSession(email, password).then(
        () => {
          account.get().then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  const signUpUser = (email, password, fullName) => {
    return new Promise(async (resolve, reject) => {
      try {
        //signup up user
        const user = await account.create(
          ID.unique(),
          email,
          password,
          fullName
        );
        if (user) {
          resolve(true);
        }
      } catch (err) {
        reject(err);
        console.log(err.message);
      }
    });
  };

  const addUserToTeamA = async (email) => {
    const addUserFnId = import.meta.env.VITE_APPWRITE_FUNC_ADDUSERTOTEAMA;
    const fnRes = await functions.createExecution(
      addUserFnId,
      JSON.stringify({ email: email }),
      false,
      " ",
      "POST"
    );
    console.log(fnRes);
    if (fnRes.response === "true") {
      return true;
      console.log("User added to TEAM - A");
    } else {
      return false;
      console.log("Unable tp add user to TEAM - A");
    }
  };

  const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
      account.get().then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log("user not logged in");
        }
      );
    });
  };

  const logoutUser = () => {
    return new Promise((resolve, reject) => {
      account.deleteSession("current").then(() => {
        resolve(true);
      });
    });
  };

  return {
    functions,
    loginUserEmail,
    signUpUser,
    isLoggedIn,
    logoutUser,
    addUserToTeamA,
  };
};

export default useAppwrite;
