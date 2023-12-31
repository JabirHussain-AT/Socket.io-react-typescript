import { useState } from 'react'
import { io ,Socket } from "socket.io-client";
import {serverToClient,clientToServer} from '../typing'

const socket : Socket<serverToClient , clientToServer >= io("http://localhost:3000/");
function App() {

  return (
    <>
        
    </>
  )
}

export default App
