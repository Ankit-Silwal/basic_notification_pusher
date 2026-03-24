import {Redis} from "ioredis"

export const redis=new Redis("redis://localhost:6969") //according to the docker host port number

redis.on("connect",()=>{
  console.log("Connected to the redis server sir")
})