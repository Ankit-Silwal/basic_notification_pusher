import redis from "./redis.js";

async function startProcessor(){
  console.log("Register is workign sirrrrrrrrr yeahhhhhhhhhhhhh")
  while(true){
    const response=await redis.xread(
      "BLOCK",0,
      "STREAMS","NOTIFICATIONS","$"
    )
    if(!response) continue;
    const stream = response[0];
    if(!stream) continue;
    const [streamName,messages]=stream;
    for(const [id,fields] of messages){
      const data:Record<string,string>={};
      for(let i=0;i<fields.length;i+=2){
        const key = fields[i];
        const value = fields[i+1];
        if(key && value) {
            data[key]=value;
        }
      }
      const message=data.MESSAGE;
      const notificationId = data.NOTIFICATION_ID;
      if(message && notificationId){
          await redis.xadd(
            "delivery-events","*",
            "type","PROCESS_NOTIFICATION",
            "NOTIFICATION_ID",notificationId,
            "message",message
          );
          console.log("Sent for the delivery man yoooooo ")
      }
    }
  }
}
startProcessor();