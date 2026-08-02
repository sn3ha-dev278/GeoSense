import {createChat,getChats,getChat,renameChat,removeChat} from "../services/chat.service.js"

export async function createChatSession(req,res){
    try{
        const userId = req.user.id
        const session = await createChat(userId)

        return res.status(201).json({
            success: true,
            message: "Chat session created successfully",
            data: session
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export async function getAllChats(req,res){
    try{
        const userId = req.user.id
        const chats = await getChats(userId);

        return res.status(200).json({
            success: true,
            data: chats
        })
    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }
}

//fetching a single chat
export async function getChatById(req,res){
    try {
        const userId = req.user.id
        const {sessionId} = req.params
        const chat = await getChat(sessionId, userId)

        return res.status(200).json({
            success: true,
            data: chat
        })   
    } catch(error){
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function updateChatTitle(req, res){
    try {
        const userId = req.user.id
        const {sessionId} = req.params
        const {title} = req.body

        const chat = await renameChat(sessionId, userId, title)
        return res.status(200).json({
            success: true,
            message: "Chat renames duccessfully",
            data: chat
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function deleteChatSession(req,res){
    try {
        const userId = req.user.id
        const {sessionId} = req.params

        await removeChat(sessionId, userId)

        return res.status(200).json({
            success: true,
            message: "Chat deleted successfully"
        })
    } catch (error) {
        return res.status(404).json({
            success: true,
            message: error.message
        })
    }
}
