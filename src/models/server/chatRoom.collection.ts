import { IndexType, Permission } from "node-appwrite";
import { chatRoomCollection, db } from "../name";
import { databases } from "./config";


export default async function createChatRoomCollection() {
    console.log("📦 Starting chat room collection creation...");
    try {
        // creating chatroom collection
        await databases.createCollection(db, chatRoomCollection, chatRoomCollection, [
            Permission.read("any"),
            Permission.read("users"),
            Permission.create("users"),
            Permission.update("users"),
            Permission.delete("users")
        ])
        console.log("Chat room collection created");

        console.log("Creating attributes...");
        await Promise.all([
            databases.createStringAttribute(db, chatRoomCollection, "name", 100, true),
            databases.createStringAttribute(db, chatRoomCollection, "description", 500, false),
            databases.createStringAttribute(db, chatRoomCollection, "ownerId", 100, true),
            databases.createBooleanAttribute(db, chatRoomCollection, "isPrivate", false),
            databases.createStringAttribute(db, chatRoomCollection, "participants", 100, false),
            databases.createIntegerAttribute(db, chatRoomCollection, "messageCount", false, 0, 100,50),
            databases.createStringAttribute(db, chatRoomCollection, "createdAt", 100, true),
            databases.createStringAttribute(db, chatRoomCollection, "updatedAt", 100, true),
        ]);
        console.log("Chat room attributes created");


        console.log("Creating indexes...");
        await Promise.all([
            databases.createIndex(db, chatRoomCollection, "ownerIdIndex", IndexType.Key, ["ownerId"]),
            databases.createIndex(db, chatRoomCollection, "isPrivateIndex", IndexType.Fulltext,["isPrivate"]),
            databases.createIndex(db, chatRoomCollection, "participantsIndex", IndexType.Fulltext,["participants"]),

        ])
        console.log(" Chat room indexes created.");
 
    } catch (error) {
        console.error(" Error creating chat room collection or attributes:", error);
    }
}