import express from 'express'
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { serverToClient, clientToServer } from '../client/typing';
import cors from "cors";


const app = express()
app.use(cors())
const server = createServer(app)
const io = new Server<clientToServer,serverToClient>(server,{
    cors :{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
    }
})
io.on("connection",(socket : Socket<clientToServer,serverToClient>)=>{
    
    socket.on("clientMsg",(data)=>{
        // io.sockets.emit('serverMsg',data) => for sending to eveyone
        // socket.broadcast.emit("serverMsg",data) => for sending everyone without the client who send it

        if(data.room === ''){
            io.sockets.emit("serverMsg",data)
        }else{
            socket.join(data.room)
            io.to(data.room).emit("serverMsg",data)
        }
    })
})

server.listen(3000,()=>{
    console.log('server is stared on port no : 3000');
    
})