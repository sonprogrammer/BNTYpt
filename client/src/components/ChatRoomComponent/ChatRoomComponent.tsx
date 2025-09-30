import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledArrow, StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
// import { io } from 'socket.io-client'
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import axios from 'axios';
import socket from '../../socket';
import loadingBar from '../../assets/loading.gif';

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
    type?: 'text' | 'media';
    data?: string;
    readBy?: string[];
}

const ChatRoomComponent = () => {
    const { userId } = useParams<{ userId: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const [user] = useRecoilState(userState)
    const [chatRoomId, setChatRoomId] = useState<string | null>(null);
    const messageBoxRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputFocusRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)



    useEffect(() => {
        inputFocusRef.current?.focus()

    }, [])



    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                const res = await axios.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`);
                const chatRooms = res.data.chatRooms;

                const currentChatRoom = chatRooms.find((room: any) =>
                    (room.trainerId === user.objectId && room.opponentName === userId) ||
                    (room.memberId === user.objectId && room.opponentName === userId)
                );

                if (currentChatRoom) {
                    setChatRoomId(currentChatRoom._id);
                    if (socket) {
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
                    setLoading(true)
                    const res = await axios.get(`${apiUrl}/api/chat/messages/${chatRoomId}`)

                    if (res.data.success) {
                        const fetchedMessages = res.data.message.map((msg: any) => ({
                            text: msg.message,
                            isMine: msg.sender === user.objectId,
                            sender: msg.sender,
                            timestamp: msg.timestamp,
                            type: msg.type || 'text',
                            data: msg.data,
                            readBy: msg.readBy || []
                        }));
                        setMessages(fetchedMessages);

                        socket.emit('read', { chatRoomId, userId: user.objectId })
                        setLoading(false)
                    } else {
                        setMessages([])
                    }

                } catch (error) {
                    console.error('Error chat room:', error);
                } finally {
                    setLoading(false)
                }
            }
        };

        fetchMessages();
    }, [chatRoomId]);


    useEffect(() => {
        if (chatRoomId && socket) {
            socket.emit('joinRoom', chatRoomId);

            socket.on('receiveMessage', (message: any) => {
                setMessages(prevMessages => [...prevMessages, message])
                setLoading(false)
                if (message.sender !== user.name) {
                    socket.emit('read', { chatRoomId, userId: user.objectId })
                }
            });

            socket.on('read', ({ chatRoomId: roomId, userId: readerId }: { chatRoomId: string, userId: string }) => {
                setMessages(prev => prev.map(msg => {
                    if (!msg.readBy) msg.readBy = [];
                    if (!msg.readBy.includes(readerId)) {
                        msg.readBy.push(readerId);
                    }
                    return msg;
                }));
            })

            return () => {
                socket.off('receiveMessage');
                socket.off('read')
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

        try {
            let mediaUrl: string | null = null
            if (selectedFile) {
                const formData = new FormData()
                formData.append('file', selectedFile)
                console.log('form', formData)
                const res = await axios.post(`${apiUrl}/api/chat/upload`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                mediaUrl = res.data.url
            }

            const newMessage: Message = {
                text: input || '',
                isMine: true,
                sender: user.objectId,
                type: mediaUrl ? 'media' : 'text',
                data: mediaUrl || undefined,
                readBy: [user.objectId]
            }

            await axios.post(`${apiUrl}/api/chat/send`, {
                chatRoomId,
                sender: newMessage.sender,
                message: newMessage.text,
                type: newMessage.type,
                data: mediaUrl,
            })


            socket.emit('sendMessage', { ...newMessage, chatRoomId });

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
        if (!e.target.files) return
        const file = e.target.files[0]
        setSelectedFile(file)
        setPreview(URL.createObjectURL(file))
        e.target.value = ''

    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <StyledContainer className='hi'>

            <Styledupper>
                <StyledArrow>
                    <Link to='/chat'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </StyledArrow>
                <h2>{userId} chat</h2>
            </Styledupper>
            <StyledMessageBox className='hidd'>
                <>
                    {loading ? (

                        <>
                        <div className='flex justify-center items-center h-full'>
                            <img src={loadingBar} alt="로딩이미지" className='w-20' />
                        </div>
                    </>
                    ) 
                    : messages.length > 0 ? (
                        messages.map((message, i) => (
                            <StyledMessage key={i} isMine={message.isMine}>
                                {message.type === 'media' ?
                                    <img src={message.data} alt={'이미지'} className="max-w-xs rounded" />
                                    :
                                    <p>{message.text}</p>
                                }
                                {message.isMine && message.readBy ? (
                                    message.readBy.some(id => id !== user.objectId) ? (
                                        <span className='text-sm'></span>
                                    ) : (
                                        <span className='text-sm'>안읽음</span>
                                    )
                                ) : null}


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
                <input type="file" ref={fileInputRef} onChange={handleFilePreview} className='hidden' accept='image/*,video/*' />
                <button onClick={handleSendMessage}>send</button>
            </StyledSendEl>
        </StyledContainer>
    )
}

export default ChatRoomComponent
