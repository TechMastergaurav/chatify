import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import path from "path"
import { connectDb } from "./lib/db.js"
import cors from "cors"
import { app, server } from "./lib/socket.js"
dotenv.config();

app.use(express.json({limit:"5mb"}));
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(cookieParser());
const __dirname = path.resolve();
const PORT = process.env.PORT||5000;
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get(/^\/(?!api).*/,(_,res)=>{
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"))
    })
}
server.listen(PORT, () => {
    connectDb();
  console.log(`Server running on port ${PORT}`);
  
});
