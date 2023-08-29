import { account } from "./appwriteConfig";

export const checkIsLoggedIn = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await account.get();
      resolve(data);
    } catch (e) {
      // reject(false);
      console.log(e.message);
    }
  });
};
