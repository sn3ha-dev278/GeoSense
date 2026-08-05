import express from "express"
import authenticate from "../middlewares/auth.middleware.js"
import {createMessage, getMessages, deleteMessages} from "../controllers/message.controller.js"

const router = express.Router({mergeParams: true})

router.post("/", authenticate, createMessage)
router.get("/", authenticate,getMessages)
router.delete("/", authenticate, deleteMessages)

export default router