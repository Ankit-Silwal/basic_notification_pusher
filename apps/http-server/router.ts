import { Router } from "express";
import type { Request,Response } from "express";
import { notificationSchema } from "./validator.js";
import { randomUUID } from "node:crypto";
import { redis } from "./redis.js";

const router=Router();

router.post("/notify",async (req:Request,res:Response)=>{
  try{
    const data=notificationSchema.parse(req.body);
    if(!data.message){
      return res.status(400).json({
        success:false,
        message:"Please pass on the message too"
      })
    }
    const notificationId=randomUUID();
    await redis.xadd(
      "NOTIFICATIONS","*",
      "type","CREATE_NOTIFICATION",
      "NOTIFICATION_ID",notificationId,
      "MESSAGE",data.message
    )
    console.log(`Notification to be send:${notificationId} =>${data.message}`)
    return res.status(200).json({
      success:true,
      message:"The message is queued",
      notificationId
    })
  }catch(err){
    return res.status(500).json({
      success:false,
      message:`err:${err}`
    })
  }
})

export default router;