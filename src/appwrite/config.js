import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;
  constructor() {
    this.client
      .setProject(conf.appwriteURL)
      .setEndpoint(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(`Appwrite service : createPost error :: ${error}`);
    }
  }

  async updateDocument(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(`Appwrite service : updateDocument error :: ${error}`);
    }
  }

  async deleteDocument(slug) {
    try {
       await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      )
      return true
    } catch (error) {
      console.log(`Appwrite service : deleteDocument error :: ${error}`)
      return false
    }
  }

  async getPost(slug){
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
      )
    } catch (error) {
      consolelog(`Appwrite service : getPost error:: ${error}`)
      return false
    }
  }

  async getAllPost (queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries,
      )
    } catch (error) {
      console.log(`Appwrite service : getAllPost error :: ${error}`)
    }
  }

  // file upload service

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file,
      )
    } catch (error) {
      console.log(`Appwrite Service : uploadFile error :: ${error}`)
    }
  }

  async deleteFile(fileId){
    try {
      this.bucket.deleteFile(
        conf.appwriteBucketID,
        fileId,
      )
      return true
    } catch (error) {
      console.log(`Appwrite service : deleteFile :: ${error}`)
    }
  }

  async filePreview(fileId){
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketID,
        fileId
      )
    } catch (error) {
      console.log(`Appwrite Service : filePreview Error: ${error}`)
    }
  }
}
const service = new Service();
export default service;
