import {Redis} from "ioredis"

const redis=new Redis({port:6969}) //depends upon docker container and shits

export default redis;