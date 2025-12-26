import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StyledArrow, StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../utils/userState';
import socket from '../../socket';
import { axiosInstance } from '../../utils/axiosInstance';
import { BeatLoader } from 'react-spinners';
import { faPaperPlane, faImage, faCommentDots, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const apiUrl = process.env.REACT_APP_API_URL;



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


    const navigate = useNavigate()

    useEffect(() => {
        inputFocusRef.current?.focus()

    }, [])



    useEffect(() => {
        const fetchChatRoom = async () => {
            if (!user.objectId) return; 
            try {
                const res = await axiosInstance.get(`${apiUrl}/api/chat/chatrooms/${user.objectId}`);
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
                    navigate(-1)
                }

            } catch (error) {
                console.error('Error fetching chat room:', error);
            }
        };

        if (user?.objectId) {
            fetchChatRoom();
        }
    }, [user?.objectId, userId, navigate]);



    useEffect(() => {

        const fetchMessages = async () => {
            if (chatRoomId) {
                try {
                    setLoading(true)
                    const res = await axiosInstance.get(`${apiUrl}/api/chat/messages/${chatRoomId}`)

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
    }, [chatRoomId, user?.objectId]);


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
    }, [chatRoomId, user?.objectId, user?.name]);

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
                const res = await axiosInstance.post(`${apiUrl}/api/chat/upload`, formData, {
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

            await axiosInstance.post(`${apiUrl}/api/chat/send`, {
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
        <StyledContainer>
            <Styledupper>
                <StyledArrow>
                    <Link to='/chat'>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Link>
                </StyledArrow>
                <h2>{userId}</h2>
            </Styledupper>

            <StyledMessageBox>
                {loading ? (
                    <div className='flex flex-col justify-center items-center h-full gap-3'>
                        <BeatLoader color="#ef4444" size={10} />
                        <p className="text-gray-500 text-xs">메시지를 불러오는 중...</p>
                    </div>
                ) : messages.length > 0 ? (
                    messages.map((message, i) => (
                        <StyledMessage key={i} isMine={message.isMine}>
                            <div className="bubble">
                                {message.type === 'media' ? (
                                    <img src={message.data} alt='media' className="rounded-lg max-w-full" />
                                ) : (
                                    <p>{message.text}</p>
                                )}
                            </div>
                            
                            {message.isMine && (
                                <span className="status">
                                    {message.readBy?.some(id => id !== user?.objectId) ? '' : '1'}
                                </span>
                            )}
                        </StyledMessage>
                    ))
                ) : (
                    <div className='flex flex-col items-center justify-center h-full opacity-20'>
                        <FontAwesomeIcon icon={faCommentDots} size="3x" className="mb-4" />
                        <p className='font-bold text-xl'>대화 내용이 없습니다.</p>
                    </div>
                )}
                <div ref={messageBoxRef} />
            </StyledMessageBox>

            <StyledSendEl>
                <StyledPlus onClick={handlePlusClick}>
                    <FontAwesomeIcon icon={faImage} />
                </StyledPlus>
                
                <div className="input-wrapper">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요..."
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        ref={inputFocusRef}
                    />
                    {preview && (
                        <div className="preview-overlay">
                            <img src={preview} alt="preview" />
                            <button onClick={() => { setSelectedFile(null); setPreview(null); }}>✕</button>
                        </div>
                    )}
                </div>

                <input type="file" ref={fileInputRef} onChange={handleFilePreview} className='hidden' accept='image/*,video/*' />
                <button className="send-btn" onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </StyledSendEl>
        </StyledContainer>
    )
}

export default ChatRoomComponent
