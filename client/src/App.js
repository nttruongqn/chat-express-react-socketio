import { useState } from 'react';
import io from 'socket.io-client';
import { Chat } from './Chat';

const socket = io.connect("http://localhost:3001");
function App() {
  const [room, setRoom] = useState("");
  const [username, setUserName] = useState("");
  const [isShowChat, setIsShowChat] = useState(false);


  const joinRoom = () => {
    if (username && room) {
      socket.emit("join_room", room);
      setIsShowChat(true);
    }
  }


  return (
    <div className="App">
      <div className="w-screen h-screen">
        <div className="container h-full relative">
          <div className="flex justify-center items-center h-full ">
            {isShowChat ? (<Chat socket={socket} username={username} room={room}></Chat>
            ) : (<div className="w-1/4 h-auto max-md:w-3/4 max-md:h-auto border flex-col p-4">
              <h3 className='text-center text-xl font-bold'>Phòng chat</h3>

              <div className="flex flex-col gap-4 w-full p-4">
                <input className='border p-2 outline-none' type="text" placeholder='Tên....' onChange={(e) => setUserName(e.target.value)} />
                <input className='border p-2 outline-none' type="text" placeholder='ID Phòng' onChange={(e) => setRoom(e.target.value)} />
                <button className='p-2 bg-green-500 text-white' onClick={joinRoom}>Join room</button>
              </div>
            </div>)}
          </div>


        </div>
      </div>
    </div >
  );
}

export default App;
