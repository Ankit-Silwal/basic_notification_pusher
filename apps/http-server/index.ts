import dotenv from "dotenv"
dotenv.config()
import "./redis.js"
import express from "express"
import router from "./router.js"

const PORT=process.env.PORT ||8000
const app=express()
app.use(express.json())
app.use("/api",router);

app.listen(PORT,()=>{
  console.log(`Server connected to the port no ${PORT}`);
})
