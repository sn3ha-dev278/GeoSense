import {
    saveMessage,
    getMessages,
    deleteMessages
} from "../repositories/message.repository.js";

import { getChatSession } from "../repositories/chat.repository.js";

// Create a new message
export async function sendMessage(sessionId, userId, message) {
    // Check whether the chat session belongs to the user
    const chat = await getChatSession(sessionId, userId);

    if (!chat) {
        throw new Error("Chat session not found");
    }

    // Validate message
    if (!message || message.trim() === "") {
        throw new Error("Message cannot be empty");
    }

    // Save the user's message
    const savedMessage = await saveMessage(
        sessionId,
        "user",
        message.trim()
    );

    return savedMessage;
}

// Get all messages in a conversation
export async function getConversation(sessionId, userId) {
    // Verify chat ownership
    const chat = await getChatSession(sessionId, userId);

    if (!chat) {
        throw new Error("Chat session not found");
    }

    // Fetch all messages
    return await getMessages(sessionId);
}

// Delete all messages in a conversation
export async function clearConversation(sessionId, userId) {
    // Verify chat ownership
    const chat = await getChatSession(sessionId, userId);

    if (!chat) {
        throw new Error("Chat session not found");
    }

    // Delete conversation
    await deleteMessages(sessionId);
}