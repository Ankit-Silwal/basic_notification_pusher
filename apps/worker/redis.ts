import {Redis} from "ioredis"

export const redis=new Redis({port:6969})

export default redis;