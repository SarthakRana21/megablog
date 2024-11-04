import { current } from "@reduxjs/toolkit";
import conf from "../conf/conf";
import { Account, Client, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setProject(conf.appwriteURL)
      .setEndpoint(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another method
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(`appwrite : createAccount error :: ${error}`);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(`appwrite : login error :: ${error}`);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(`appwrite : getCurrentUser error :: ${error}`);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession(current);
    } catch (error) {
      console.log(`appwrite : logout error :: ${error}`);
    }
  }
}

const authService = new AuthService();

export default authService;
