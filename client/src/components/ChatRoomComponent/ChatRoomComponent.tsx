import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledArrow, StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client'
// import socket from '../../socket'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import { setPriority } from 'os';
const apiUrl = process.env.REACT_APP_API_URL;




interface User {
    id: string;
    name: string;
    profile?: string;
}

interface Message {
    text?: string;
    isMine: boolean;
    sender: string;
    type? : 'text'|'media';
    data?: string;
    fileName?: string;
}

const ChatRoomComponent = () => {
    const { userId } = useParams<{ userId: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const [user] = useRecoilState(userState)
    const [socket, setSocket] = useState<any>(null);
    const [chatRoomId, setChatRoomId] = useState<string | null>(null);
    const messageBoxRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputFocusRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)



    useEffect(() => {
        inputFocusRef.current?.focus()

    }, [])
    
    useEffect(() => {
        const socketInstance = io(apiUrl)
        setSocket(socketInstance)
        return () => {
            socketInstance.disconnect()
        }
    }, [])

    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`);
                // console.log('res' , res)
                const chatRooms = res.data.chatRooms;

                const currentChatRoom = chatRooms.find((room: any) =>
                    (room.trainerId === user.objectId && room.opponentName === userId) ||
                    (room.memberId === user.objectId && room.opponentName === userId)
                ); 
                
                if (currentChatRoom) {
                    setChatRoomId(currentChatRoom._id);
                    if(socket){
                        socket.emit('joinRoom', currentChatRoom._id)
                    }
                    
                } else {
                    console.log(`No chat room found with ${userId}.`);
                }

            } catch (error) {
                console.error('Error fetching chat room:', error);
            }
        };

        if (user.objectId) {
            fetchChatRoom();
        }
    }, [user.objectId, socket]);



    useEffect(() => {
        const fetchMessages = async () => {
            if (chatRoomId) {
                try {
                    const res = await axios.get(`${apiUrl}/api/chat/messages/${chatRoomId}`)
                    console.log('ressss', res)
                    if (res.data.success) {
                        const fetchedMessages = res.data.message.map((msg: any) => ({
                            text: msg.message,
                            isMine: msg.sender === user.name,
                            sender: msg.sender,
                            timestamp: msg.timestamp,
                            type: msg.type || 'text',
                            data: msg.data
                        }));
                        setMessages(fetchedMessages);
                    }

                } catch (error) {
                    console.error('Error chat room:', error);
                }
            }
        };

        fetchMessages();
    }, [chatRoomId]);


    useEffect(() => {
        if (chatRoomId && socket) {
            socket.emit('joinRoom', chatRoomId);

            socket.on('newMessage', (message: any) => {
                setMessages((prevMessages) => [...prevMessages, {
                    text: message.message,
                    isMine: message.sender === user.name,
                    sender: message.sender,
                    type: message.type,
                    data: message.data,
                    fileName: message.fileName
                }]);
            });

            return () => {
                socket.off('newMessage');
            };
        }
    }, [chatRoomId, socket]);

    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    const handleSendMessage = async () => {
        if (!input.trim() && !selectedFile) return
            // const newMessage = { text: input, isMine: true, sender: user.name };

            try {
                let mediaUrl: string | null = null
                if(selectedFile){
                    const formData = new FormData()
                    formData.append('file', selectedFile)
                    const res = await axios.post(`${apiUrl}/api/chat/send`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                      })
                      mediaUrl = res.data.url
                }

                // console.log('selected', selectedFile)
                const newMessage: Message = {
                    text: input || '',
                    isMine: true,
                    sender: user.name,
                    type: mediaUrl ? 'media' : 'text',
                    data: mediaUrl || undefined,
                    // fileName: selectedFile?.name
                }
                
                
                await axios.post(`${apiUrl}/api/chat/send`, {
                    chatRoomId,
                    sender: newMessage.sender,
                    message: newMessage.text,
                    type: newMessage.type,
                    data: mediaUrl,
                    fileName: newMessage.fileName
                })


                socket.emit('sendMessage', newMessage);

                setMessages(prevMessages => [...prevMessages, newMessage]);
                setInput('')
                setSelectedFile(null)
                setPreview(null)

            } catch (error) {
                console.error('Error sending message:', error);
            }
        
    }

    const handlePlusClick = () => fileInputRef.current?.click()

    
    const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return
        const file = e.target.files[0]
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
        e.target.value =''

    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter'  && !e.nativeEvent.isComposing) {
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
                <>
                    {messages.length > 0 ? (
                        messages.map((message, i) => (
                            <StyledMessage key={i} isMine={message.isMine}>
                                    {message.type === 'media' ? <img src={message.data} alt={message.fileName} className="max-w-xs rounded" /> : message.text}
                                    {/* {message.text} */}
                            </StyledMessage>
                        ))
                    ) : (
                        <p className='text-center flex items-center justify-center h-full font-bold text-2xl text-red-900'>
                            there is no message.
                        </p>
                    )}
                </>
                <div ref={messageBoxRef} />
            </StyledMessageBox>
            <StyledSendEl>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    ref={inputFocusRef}
                />
                {preview && (
          <div className="relative w-16 h-16 mr-2">
            <img src={preview} alt="preview" className="w-16 h-16 object-cover bg-black rounded" />
            <button
              className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
              onClick={() => {
                setSelectedFile(null)
                setPreview(null)
              }}
            >
              ✕
            </button>
          </div>
        )}

                <StyledPlus onClick={handlePlusClick}>
                    <FontAwesomeIcon icon={faPlus} />
                </StyledPlus>
                <input type="file" ref={fileInputRef} onChange={handleFilePreview} className='hidden' accept='image/*,video/*'/>
                <button onClick={handleSendMessage}>send</button>
            </StyledSendEl>
        </StyledContainer>
    )
}

export default ChatRoomComponent
