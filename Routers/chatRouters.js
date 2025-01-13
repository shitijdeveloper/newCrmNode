const { chat, chatget } = require('../Controllers/ChatController')
const express=require('express')
const router=express.Router()
router.post("/chat",chat)
router.get("/showchat",chatget)
module.exports = router;