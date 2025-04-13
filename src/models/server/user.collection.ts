import { IndexType, Permission } from "node-appwrite"
import { db, userCollection } from "../name"
import { databases } from "./config"


export default async function createUserCollection() {
   try {
     // create coollection
     await databases.createCollection(db, userCollection, userCollection, [
         //permissions
         Permission.read("any"),
         Permission.create("users"),
         Permission.update("users"),
         Permission.delete("users"),
     ])
     console.log("User is created");
 
 
     // creating attributes and indexes
 
     await Promise.all([
         databases.createStringAttribute(db, userCollection, "username", 100, true),
         databases.createStringAttribute(db, userCollection, "email", 200, true),
         databases.createStringAttribute(db, userCollection, "avatarUrl", 500, false),
         databases.createStringAttribute(db, userCollection, "bio", 300, false),
         databases.createStringAttribute(db, userCollection, "createdAt", 100, true),
         databases.createStringAttribute(db, userCollection, "lastSeenAt", 100, false),
         
 
     ])
     console.log("User attributes created")
 
     // create indexes
     console.log("Creating indexes...");
     await Promise.all([
         databases.createIndex(db, userCollection, "emailIndex", IndexType.Unique, ["email"]),
         databases.createIndex(db, userCollection, "ChatRoomIdIndex", IndexType.Unique, ["username"]),
     ])
 
     console.log("User indexes created");
   } catch (error) {
    console.error("Error creating User collection", error);
    
   }
    
    
        
}