import { account } from "./useAppwrite";

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
