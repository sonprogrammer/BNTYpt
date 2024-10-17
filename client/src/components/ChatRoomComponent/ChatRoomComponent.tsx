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
    const { userId } = useParams<{ userId: string }>()
    const [messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const messageBoxRef = useRef<HTMLDivElement>(null)
    const [user] = useRecoilState(userState)
    const [socket, setSocket] = useState<any>(null);
    const [chatRoomId, setChatRoomId] = useState<string | null>(null);

    useEffect(() => {
        const socketInstance = io('http://localhost:4000')
        setSocket(socketInstance)
        return () => {
            socketInstance.disconnect()
        }
    }, [])

    useEffect(() => {
        const fetchChatRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/chat/chatrooms/${user.objectId}`);
                const chatRooms = response.data.chatRooms;

                const currentChatRoom = chatRooms.find((room: any) =>
                    (room.trainerId === user.objectId && room.opponentName === userId) ||
                    (room.memberId === user.objectId && room.opponentName === userId)
                );

                if (currentChatRoom) {
                    setChatRoomId(currentChatRoom._id);
                    socket.emit('joinRoom', currentChatRoom._id)
                    
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
                    const res = await axios.get(`http://localhost:4000/api/chat/messages/${chatRoomId}`)
                    if (res.data.success) {
                        const fetchedMessages = res.data.message.map((msg: any) => ({
                            text: msg.message,
                            isMine: msg.sender === user.name,
                            sender: msg.sender,
                            timestamp: msg.timestamp
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
                    sender: message.sender
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
        if (input.trim() !== '') {
            const newMessage = { text: input, isMine: true, sender: user.name };

            try {
                await axios.post('http://localhost:4000/api/chat/send', {
                    chatRoomId,
                    sender: newMessage.sender,
                    message: newMessage.text,
                })


                socket.emit('sendMessage', newMessage);

                // socket.emit('sendMessage', {
                //     chatRoomId,
                //     sender: newMessage.sender,
                //     message: newMessage.text,
                // });

                setMessages(prevMessages => [...prevMessages, newMessage]);
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
                <>
                    {messages.length > 0 ? (
                        messages.map((message, i) => (
                            <StyledMessage key={i} isMine={message.isMine}>
                                {message.text}
                            </StyledMessage>
                        ))
                    ) : (
                        <p className='text-center flex items-center justify-center h-full font-bold text-2xl text-red-900'>there is no message.</p>
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
