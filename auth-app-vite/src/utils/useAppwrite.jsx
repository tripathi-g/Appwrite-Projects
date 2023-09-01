import { Client, Account, Functions, ID, Teams } from "appwrite";
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

  const addUserToTeamA = (email) => {
    return new Promise(async (resolve, reject) => {
      console.log("addusercalled");
      try {
        console.log();
        const addUserFnId = import.meta.env.VITE_APPWRITE_FUNC_ADDUSERTOTEAMA;
        const fnRes = await functions.createExecution(
          addUserFnId,
          JSON.stringify({ id: ID.unique(), teamName: "ABCD", email: email }),
          false,
          " ",
          "POST"
        );

        if (fnRes.added === "true") {
          resolve(true);
        } else {
          reject(fnRes);
          console.log(fnRes);
          return false;
        }
      } catch (err) {
        console.log(err);
        reject(fnRes);
      }
    });
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
    account,
    functions,
    loginUserEmail,
    signUpUser,
    isLoggedIn,
    logoutUser,
    addUserToTeamA,
  };
};

export default useAppwrite;
