import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path"
import { connectDb } from "./lib/db.js"
dotenv.config();

const app = express();
app.use(express.json());
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
app.listen(PORT, () => {
    connectDb();
  console.log(`Server running on port ${PORT}`);
  
});
