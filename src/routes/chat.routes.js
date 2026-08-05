import express from "express"
import { authenticate } from "../middlewares/auth.middleware.js"
import {createChatSession, getAllChats, getChatById, updateChatTitle, deleteChatSession} from "../controllers/chat.controller.js"
import messageRoutes from "./message.routes.js"

const router = express.Router()

router.use("/:sessionId/messages", messageRoutes)

router.post("/", authenticate, createChatSession)
router.get("/", authenticate, getAllChats)
router.get("/:sessionId", authenticate, getChatById)
router.patch("/:sessionId", authenticate, updateChatTitle)
router.delete("/:sessionId", authenticate, deleteChatSession)


export default router