import { db } from "../name";
import createChatRoomCollection from "./chatRoom.collection";
import { databases } from "./config";
import createMessageCollection from "./message.collection";
import createUserCollection from "./user.collection";

export default async function getOrCreateDB() {
    console.log(" getOrCreateDB started"); 
    try {
        await databases.get(db)
        console.log("Database connected");
        
    } catch (error) {
        console.log("Database not found, creating...");
        await databases.create(db, db)
        console.log("Database created");
    }
        try {
            await Promise.all([
                createChatRoomCollection(),
                createUserCollection(),
                createMessageCollection()
            ])
            console.log("Collections created or already exists");
            
        } catch (error) {
            console.log("Error creating databases or collections");
            
        }
    
    return databases;
}