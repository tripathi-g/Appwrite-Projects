import { Client, Account, ID } from "appwrite";
const client = new Client();
const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

client.setEndpoint(endpoint).setProject(projectId);
export const account = new Account(client);

export const loginUserEmail = async (email, password) => {
  return await account.createEmailSession(email, password);
};

export const signUpUser = async (email, password, fullName) => {
  return await account.create(ID.unique(), email, password, fullName);
};

// export const
