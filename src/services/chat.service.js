import {
createChatSession,getUserChatSessions,
getChatSession,updateChatTitle,
deleteChatSession
} from "../repositories/chat.repository.js";

export async function createChat(userId){
    const session = await createChatSession(userId)
    return session
}

export async function getChats(userId){
    const chats = await getUserChatSessions(userId)
    return chats
}

//single chat
export async function getChat(sessionId, userId){
    const chat = await getChatSession(sessionId, userId)
        if(!chat){
            throw new Error("Chat session not found")
        }
        return chat
}

export async function renameChat(sessionId, userId, title){
    if(!title || title.trim() === ""){
        throw new Error("Chat title is required")
    }

    const updatedChat = await updateChatTitle(sessionId, userId, title.trim())

    if(!updatedChat){
        throw new Error("Chat session not found")
    }
    return updatedChat
}

export async function removeChat(sessionId, userId){
    const deleteChat = await deleteChatSession(sessionId, userId)

    if(!deleteChat){
        throw new Error("Chat session not found")
    }

    return deleteChat
}
