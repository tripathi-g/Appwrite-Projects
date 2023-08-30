import { Client, Account, ID } from "appwrite";
const client = new Client();
console.log(
  import.meta.env.APPWRITE_ENDPOINT,
  import.meta.env.APPWRITE_PROJECT_ID
);
client
  .setEndpoint("https://appwritelocal.stripathi.tech/v1")
  .setProject("64eb1f41c5f0f30ab422");
export const account = new Account(client);

export const loginUserEmail = async (email, password) => {
  return await account.createEmailSession(email, password);
};

export const signUpUser = async (email, password, fullName) => {
  return await account.create(ID.unique(), email, password, fullName);
};
