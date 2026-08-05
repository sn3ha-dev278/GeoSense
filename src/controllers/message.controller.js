import {sendMessage,getConversation,clearConversation} from "../services/message.service.js"

export async function createMessage(req, res) {
    try {
        const { sessionId } = req.params
        const { message } = req.body
        const userId = req.user.id
        const savedMessage = await sendMessage(sessionId,userId,message)

        return res.status(201).json({
            success: true,
            data: savedMessage
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getMessages(req, res) {
    try {
        const { sessionId } = req.params
        const userId = req.user.id
        const messages =await getConversation(sessionId,userId)

        return res.status(200).json({
            success: true,
            data: messages
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function deleteMessages(req, res) {
    try {
        const { sessionId } = req.params
        const userId = req.user.id
        await clearConversation(
            sessionId,
            userId
        )

        return res.status(200).json({
            success: true,
            message: "Conversation cleared"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })

    }

}