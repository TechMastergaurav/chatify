import { isSpoofedBot } from "@arcjet/inspect";
import aj from "../lib/arcjet.js";
export const arcjetProtection = async(req,res,next) => {
    try{
     const decision = await aj.protect(req)
     if(decision.isDenied()){
     if(decision.reason.isRateLimit()){
        res.status(429).json({message:"Rate Limit Exceeded. Please try again later"})
     }
     else if(decision.reason.isBot()){
     return res.status(403).json({message:"Bot access Denied"})
     }else{
     return res.status(403).json({message:"Access Denied by security policy"})
     }
    }
    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({
            error:"spoofed bot detected",
            message:"Malicious bot activity detected"
        })
    }
    next();
    }catch(error){
     console.log("Arcjet Protection Error :",error);
     next();
     
    }
}