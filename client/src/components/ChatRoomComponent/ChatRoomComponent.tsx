import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledArrow, StyledContainer, StyledMessage, StyledMessageBox, StyledPlus, StyledSendEl, Styledupper } from './style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowLeft, faUser} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


interface User {
    id: string;
    name: string;
    profile?: string;
}

interface Message {
    text: string;
    isMine: boolean;
    userId: string;
}
const users: User[] = [
    { id: '1', name: 'User1', profile: './logo1.png' },
    { id: '2', name: 'User2' },
];


const ChatRoomComponent = () => {
    const { userId } = useParams<{userId: string}>()
    const[messages, setMessages] = useState<Message[]>([])
    const [input, setInput] = useState<string>('')
    const messageBoxRef = useRef<HTMLDivElement>(null)

    //mockup data -> 나중에 지우기
    useEffect(() => {
        const mockMessages: Message[] = [
            { text: '안녕하세요!', isMine: false, userId: '1'},
            { text: '안녕하세요! 어떻게 도와드릴까요?', isMine: true, userId: '2' },
            { text: '새로운 프로젝트에 대해 이야기해볼까요?', isMine: false, userId: '1' },
            { text: '좋아요, 시작해봅시다!', isMine: true, userId: '2' },
            { text: '안녕하세요!', isMine: false, userId: '1' },
        ];
        setMessages(mockMessages);
    }, []);


    useEffect(()=>{
        if(messageBoxRef.current){
            messageBoxRef.current.scrollIntoView({ behavior: 'smooth'})
        }
    },[messages])



    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSendMessage = () => {
        if(input.trim() !== ''){
            setMessages([...messages, { text: input, isMine: true , userId: '2'}])
            setInput('')
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
