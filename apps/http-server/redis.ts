import {Redis} from "ioredis"

export const redis=new Redis("redis://localhost:6379") 

redis.on("connect",()=>{
  console.log("Connected to the redis server sir")
})