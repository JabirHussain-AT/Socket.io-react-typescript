import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { serverToClient, clientToServer } from '../typing';

const socket: Socket<serverToClient, clientToServer> = io('http://localhost:3000/');

function App() {
  const [room, setRoom] = useState('');
  const [msg, setMsg] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    socket.emit('clientMsg', { msg, room });
    setMsg('');
    setRoom('');
  }

  useEffect(() => {
    socket.on('serverMsg', (data) => {
      setMessages([...messages, data.msg]);
    });
  }, [socket, messages]);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gradient-to-r from-gray-300 to-gray-500 rounded-md shadow-md">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-2">Messages</h1>
        {messages.map((msg, i) => (
          <p key={i} className="bg-white p-2 rounded-md mb-2 shadow-sm">
            {msg}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 text-lg font-bold text-white">Enter Room Key:</label>
        <input
          type="text"
          placeholder="Enter room key"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={room}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}
        />

        <label className="block mb-2 text-lg font-bold text-white">Enter Message:</label>
        <input
          type="text"
          placeholder="Enter message"
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          value={msg}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMsg(e.target.value)}
        />

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit or Send Message
        </button>
      </form>
    </div>
  );
}

export default App;
