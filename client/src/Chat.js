import React, { useEffect, useMemo, useState } from 'react'

export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = async () => {
        if (currentMessage !== '') {
            const messageData = {
                room: room,
                author: username,
                messsage: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }

    }

    useMemo(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket])

    return (
        <>
            <div className="border w-1/4 h-auto max-md:w-3/4  flex flex-col justify-between">
                <div className="h-1/6 bg-slate-900 p-4 flex items-center rounded-sm">
                    <p className='text-white'>Live Chat</p>
                </div>
                <div className="h-5/6 flex flex-col justify-between p-2">
                    <div className="flex flex-col gap-2 odd:items-start even:bg-red-200 overflow-y-auto scroll-hidden">
                        { messageList.length > 0 ? (
                            messageList.map((messageData) => {
                                return (<div id={username === messageData.author ? "you" : "orther"} className='message-content'>
                                    <div className="inline-block p-4 border rounded-md message-text">
                                        <span className='text-sm text-white'>{messageData.messsage}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <span className='text-sm text-gray-500 font-bold'>{messageData.author}</span>
                                        <span className='text-sm text-gray-500'>{messageData.time}</span>
                                    </div>
                                </div>)
                            }))
                            : (<div className="my-2">
                                <span>Trống</span>
                            </div>)
                        }
                    </div>
                    <div className="flex justify-between gap-1 items-center">
                        <input className='p-1 outline-none border w-4/5' type="text" placeholder='Hey' onChange={(e) => setCurrentMessage(e.target.value)} />
                        <button className='p-1 outline-none border w-1/5' onClick={sendMessage}>Gửi</button>
                    </div>
                </div>
            </div>
        </>
    )
}
