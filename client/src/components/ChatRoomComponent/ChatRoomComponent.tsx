import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledArrow, StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';



interface User {
    id: string;
    name: string;
    profile?: string;
}

interface Message {
    text: string;
    isMine: boolean;
    sender: string;
}

const ChatRoomComponent = () => {
    const { userId } = useParams<{userId: string}>()
    const[messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const messageBoxRef = useRef<HTMLDivElement>(null)
    const [user] = useRecoilState(userState)
    const [socket, setSocket] = useState<any>(null); 
    const [chatRoomId, setChatRoomId] = useState<string | null>(null);


    console.log('user', user.name)
    
    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/chat/chatrooms/${userId}`); 
                setChatRoomId(response.data._id); 
                console.log('res', response.data)
            } catch (error) {
                console.error('Error fetching chat room:', error);
            }
        };

        fetchChatRoom();
    }, [userId]);
    
    
    useEffect(() => {
        const newSocket = io('http://localhost:4000', {secure:true, reconnection : false, rejectUnauthorized: false, transports:['websocket']});
        setSocket(newSocket)
        newSocket.on('connect', () => {
            console.log('connected to socket sever')
        })
        newSocket.on('receiveMessage', (message: Message) => {
            setMessages(prev => [...prev, message])
        })
        return () => {
            newSocket.disconnect()
        }
    }, []);


    useEffect(()=>{
        if(messageBoxRef.current){
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth'})
        }
    },[messages])



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    const handleSendMessage = async() => {
        if(input.trim() !== ''){
            const newMessage = { text: input, isMine: true, sender: user.name};
            console.log('Sending message:', newMessage); 
            try {
                await axios.post('http://localhost:4000/api/chat/send', {
                    chatRoomId: chatRoomId, 
                    sender: newMessage.sender,
                    message: newMessage.text,
                })
            
                
                socket.emit('sendMessage', newMessage);
                setInput('')
                
            } catch (error) {
                console.error('Error sending message:', error); 
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSendMessage();
        }
    }
    
    return (
      <StyledContainer>
          <Styledupper>
            <StyledArrow>
                <Link to='/chat'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
            </StyledArrow>
            <h2>{userId} chat</h2>
          </Styledupper>
          <StyledMessageBox>
            {messages.map((message, i) => (
                <>
                <StyledMessage key={i} isMine={message.isMine}>
                    {message.text}
                    </StyledMessage>
                    </>
            ))}
            <div ref={messageBoxRef}/>
          </StyledMessageBox>
          <StyledSendEl>
            <input 
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                />
            <StyledPlus>
                <FontAwesomeIcon icon={faPlus} />
            </StyledPlus>
            <button onClick={handleSendMessage}>send</button>
          </StyledSendEl>
      </StyledContainer>
    )
}

export default ChatRoomComponent
