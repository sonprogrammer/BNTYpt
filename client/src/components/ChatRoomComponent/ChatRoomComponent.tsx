import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledArrow, StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { SendHorizontal, Image as ImageIcon, MessageSquareText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../../utils/userState';
import { BeatLoader } from 'react-spinners';
import { useGetChatRoomId } from '../../hooks/useGetChatRoomId';
import { useGetChatMsgs } from '../../hooks/useGetChatMsgs';
import { useChatRealtime } from '../../hooks/useChatRealtime';
import { useSendChatMsg } from '../../hooks/useSendChatMsg';



const ChatRoomComponent = () => {
    const { userId: opponentName } = useParams<{ userId: string }>()

    const [input, setInput] = useState<string>('')
    const user = useRecoilValue(userState)

    const messageBoxRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null);
    const inputFocusRef = useRef<HTMLInputElement>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)


    const { data: chatRoomId, isPending: isRoomPending } = useGetChatRoomId(user?.objectId, opponentName)
    const { data: messages = [], isPending: isMsgPending } = useGetChatMsgs(chatRoomId ?? undefined, user?.objectId)

    useChatRealtime(chatRoomId ?? undefined, user?.objectId)

    const { mutateAsync: sendMsg, isPending: isSending } = useSendChatMsg()

    useEffect(() => {
        inputFocusRef.current?.focus()

    }, [])


    useEffect(() => {
        if (messageBoxRef.current) {
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    const handleSendMessage = async () => {
        if ((!input.trim() && !selectedFile) || !chatRoomId || !user?.objectId) return

        try {
            await sendMsg({ chatRoomId, senderId: user.objectId, text: input, file: selectedFile })
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
                        <ArrowLeft size={20} />
                    </Link>
                </StyledArrow>
                <h2>{opponentName}</h2>
            </Styledupper>

            <StyledMessageBox>
                {isRoomPending || isMsgPending ? (
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
                        <MessageSquareText size={48} className="mb-4" />
                        <p className='font-bold text-xl'>대화 내용이 없습니다.</p>
                    </div>
                )}
                <div ref={messageBoxRef} />
            </StyledMessageBox>

            <StyledSendEl>
                <StyledPlus onClick={handlePlusClick}>
                    <ImageIcon size={20} />
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
                <button
                    className="send-btn"
                    onClick={handleSendMessage}
                    disabled={isSending}
                >
                    {isSending ? (
                        <BeatLoader color="#fff" size={5} />
                    ) : (
                        <SendHorizontal size={20} />
                    )}
                </button>
            </StyledSendEl>
        </StyledContainer>
    )
}

export default ChatRoomComponent
