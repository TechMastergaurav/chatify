import express from "express";
const router = express.Router();
router.get("/send",(req,res)=>{
    res.send("Message Route");
})
export default router;