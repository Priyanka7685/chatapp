import { IndexType, Permission } from "node-appwrite"
import { db, messageCollection } from "../name"
import { databases } from "./config"


export default async function createMessageCollection() {
   try {
     // create coollection
     await databases.createCollection(db, messageCollection, messageCollection, [
         //permissions
         Permission.read("any"),
         Permission.read("users"),
         Permission.create("users"),
         Permission.update("users"),
         Permission.delete("users"),
     ])
     console.log("Message is created");
 
 
     // creating attributes and indexes
 
     await Promise.all([
         databases.createStringAttribute(db, messageCollection, "chatRoomId", 100, true),
         databases.createStringAttribute(db, messageCollection, "senderId", 50, true),
         databases.createStringAttribute(db, messageCollection, "content", 100, true),
         databases.createStringAttribute(db, messageCollection, "type", 50, false),
         databases.createStringAttribute(db, messageCollection, "createdAt", 100, true),
         databases.createStringAttribute(db, messageCollection, "updateAt", 100, false),
         databases.createBooleanAttribute(db, messageCollection, "updateAt", false),
         databases.createBooleanAttribute(db, messageCollection, "isDeleted",false),
 
     ])
     console.log("Message attributes created")
 
     // create indexes
     console.log("Creating indexes...");
     
     await Promise.all([
         databases.createIndex(db, messageCollection, "ChatRoomIdIndex", IndexType.Key, ["chatRoomId"]),
         databases.createIndex(db, messageCollection, "ChatRoomIdIndex", IndexType.Key, ["senderId"]),
     ])
 
     console.log("Message indexes created");
   } catch (error) {
    console.error("Error creating message collection", error);
    
   }
    
    
        
}