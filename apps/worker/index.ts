import redis from "./redis";

async function startWorker(){
  console.log("The kaamdar has started his majduri")
  while(true){
    const response=await redis.xread(
      "BLOCK",0,
      "STREAMS","delivery-events","$"
    )
    if(!response) continue;
    const stream = response[0];
    const [streamName,messages]=stream;
    for(const [id,fields] of messages){
      const data:Record<string,string>={};
      for(let i=0;i<fields.length;i+=2){
        const key=fields[i];
        const value=fields[i+1];
        if(key && value){
          data[key]=value;
        }
        console.log("Notification send yeaaahhhhhhh",data.message);
      }
    }
  }
}

startWorker()