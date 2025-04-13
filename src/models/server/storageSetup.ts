import { Permission, Role } from "node-appwrite";
import { chatAttachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(chatAttachmentBucket)
        console.log("✅ Chat storage bucket already exists and connected");
        
    } catch (error) {
        try {
            await storage.createBucket(
                chatAttachmentBucket,
                chatAttachmentBucket,
                [
                    Permission.create("users"),
                    Permission.read("users"),
                    Permission.update("users"),
                    Permission.delete("users"),
                ],
                false,
                undefined,
                undefined,
                ['jpg', 'png', 'jpeg', 'webp', 'gif', 'mp4', 'mp3', 'pdf', 'docx']
            )
            console.log(" Chat storage bucket created and connected.");
        } catch (error) {
            console.error(" Error creating chat storage bucket:", error);
        }
    }
}