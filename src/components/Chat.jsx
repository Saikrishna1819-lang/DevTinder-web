import React, { useEffect, useState } from 'react'
import { useParams,  } from 'react-router-dom';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const {targetUserId}=useParams();
    const user=useSelector(store=> store.user);
    const userId=user?._id;
    const[messages,setMessages]=useState([]);
    const [newMessage,setNewMessage]=useState("");
    

    const sendMessage=()=>{
        if(newMessage.trim()==="") return 
        
        const socket=createSocketConnection();
        socket.emit("sendMessage",{
            firstName:user.firstName,
            userId,
            targetUserId,
            text:newMessage,

        })
        setNewMessage("")

    }

    const fetchChatMessages=async()=>{
        const chat=await axios.get(BASE_URL+"/chat/"+targetUserId,{withCredentials:true});
        

        const chatMessages=chat?.data?.messages.map((msg)=>{
            const {senderId,text}=msg;
            return {
                firstName:senderId?.firstName,
                text,
            }
        })
        setMessages(chatMessages);


    }

    useEffect(()=>{
        fetchChatMessages();
    },[])
    useEffect(()=>{
        if(!user) return 
        const socket=createSocketConnection();
        socket.emit("joinChat",{userId,targetUserId})
        socket.on("messageReceived",({firstName,text})=>{
           
            setMessages((message)=> [...message,{firstName,text}])
        })

        return ()=>{
            socket.disconnect();
        }
    },[userId,targetUserId])

    useEffect(()=>{
        const chatContainer=document.querySelector('.overflow-y-auto');
        if(chatContainer){
            chatContainer.scrollTop=chatContainer.scrollHeight;
        }
    },[messages])


  return (
    <div className='flex flex-col h-[100vh]  md:h-[80vh]   w-full sm:w-[500px] md:w-[800px] mx-auto p-4 bg-gray-900 text-white md:mt-10   px-10 py-5'>
        <div className='text-xl text-center font-semibold mb-4'>
            Chat
             
        </div>
        <div className='flex-1 overflow-y-auto bg-gray-300 rounded-lg shadow'>
            {messages.map((message,index)=>{
                const isMyMessage=message.firstName===user.firstName;
                return (
                    <div key={index} className={`p-5 flex ${isMyMessage?'justify-end':'justify-start'}`}>
                        <div>
                            {!isMyMessage&&(
                                <div className='text-sm  mb-1 pr-1'>{message.firstName}</div>
                            )}

                            <div className={`inline-block text-lg font-semibold rounded-xl px-4 py-1 ${isMyMessage? 'bg-designColor text-white':'bg-blue-500 text-white'}`}>{message.text}</div>
                        </div>
                    </div>
                )
            })}
        </div>
        <div className='mt-4 flex items-center'>
            <input 
            type="text" 
            value={newMessage}
            onChange={(e)=>{setNewMessage(e.target.value)}}
            onKeyDown={(e)=>{
                if(e.key=="Enter") sendMessage();
            }}
            placeholder='type a message...' 
            className='flex-1 border border-gray-300 rounded-lg px-4 py-2 mr-2'
            
            >
            </input>
            <button onClick={sendMessage} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg'>Send</button>
             
        </div>

    </div>


  )
}

export default Chat;
