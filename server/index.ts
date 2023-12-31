import express from 'express'
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";


const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server(server,{
    cors :{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})
io.on("connection",(socket)=>{
    console.log(socket.id,'its id ');
    
})

server.listen(3000,()=>{
    console.log('server is stared on port no : 3000');
    
})