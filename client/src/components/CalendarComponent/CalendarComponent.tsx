import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, getDay, addDays } from 'date-fns'
import styles from './Calendar.module.css'
import React, { useEffect, useState } from 'react'
import { Dot, DotWrapper, StyledBox, StyledBtn, StyledCell, StyledCloseBtn, StyledContainer, StyledDay, StyledDetail, StyledGrid, StyledHeader, StyledIcon, StyledModal, StyledModalBox, StyledModalContents, StyledModalTextArea, StyledTitle } from './style'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'

type Records = {
    date: string;
    diet?: string;
    workout?: string;
    kakaoId? : string;
    email? : string;
    userType? : string;

}

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [records, setRecords] = useState<Records[]>([])
    const [add, setAdd] = useState<boolean>(false)
    const [workout, setWorkout] = useState<string>('')
    const [diet, setDiet] = useState<string>('')

    const [user] = useRecoilState(userState)

    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

    const startDay = getDay(firstDayOfMonth);
    const leadingEmptyDays = Array.from({ length: startDay }, (_, i) => addDays(firstDayOfMonth, i - startDay));

    const handlePreviousMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
    }
    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
    }
    const handleDayClick = (date: Date) => {
        setSelectedDate(date)
    }
    const getRecordForDate = (date: Date) => {
        const dateString = format(date, 'yyyy-MM-dd')
        return records.find(record => record.date === dateString)
    }

    useEffect(()=>{
        if(user.email || user.kakaoId){
            fetchCalendar() 
        }
    },[user])


    const fetchCalendar = async() => {
        try {
            let url= ''
            if(user.email){
                url = `http://localhost:4000/api/calendar/user/email/${user.email}`
            }else if(user.kakaoId){
                url = `http://localhost:4000/api/calendar/user/kakao/${user.kakaoId}`
            }

            const res = await axios.get(url,{
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
            if(res.data.success){
                const formattedRecords = res.data.calendars.map((record: {
                    _id: string;
                    workout: string;
                    diet: string;
                    date: string;
                    userId: string;
                    __v: number;
                }) => ({
                    ...record,
                    date: format(new Date(record.date), 'yyyy-MM-dd'),
                }));
    
                setRecords(formattedRecords);
            }
        } catch (error) {
            console.log('err', error)
        }
    }

    const handleAddClicked = () => {
        setAdd(!add)
        if(!add){
            setWorkout('')
            setDiet('')
        }
    }

    const handlePostClick = async() => {
        if(!selectedDate){
            alert('날짜를 선택하세요')
            return
        }
        const formatDate = format(selectedDate, 'yyyy-MM-dd')
        try{

            const formData: Records ={
                date: formatDate,
                workout: workout,
                diet: diet,
            }
           if(user.kakaoId){
            formData.kakaoId = user.kakaoId
           }else if(user.email){
            formData.email = user.email
           }

           const res = await axios.post('http://localhost:4000/api/calendar', formData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.kakaoAccessToken || user.token}`
            }
           })
            if(res.data.success){
                const newRecord: Records = {
                    date: formatDate,
                    workout: workout,
                    diet: diet,
                    kakaoId: user.kakaoId,
                    email: user.email,

                }
    
                setRecords([...records, newRecord])
                setAdd(false)

            }

        }catch(error){
            console.log('error', error)
        }
    }

    const selectedRecord = selectedDate ? getRecordForDate(selectedDate) : null;


    return (
        <>
            <StyledBox>
                <StyledContainer>
                    <StyledTitle>
                        <h1 className='font-bold text-3xl text-slate-900'>운동, 식단 기록</h1>
                        <p onClick={handleAddClicked}>추가하기</p>
                    </StyledTitle>
                    <StyledHeader>
                        <StyledIcon onClick={handlePreviousMonth}>
                            <FaChevronLeft />
                        </StyledIcon>
                        <h2>{format(currentDate, 'MMM yyyy')}</h2>
                        <StyledIcon onClick={handleNextMonth}>
                            <FaChevronRight />
                        </StyledIcon>
                    </StyledHeader>
                    <StyledGrid>
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <StyledDay>{day}</StyledDay>
                        ))}
                        {leadingEmptyDays.map((_, i) => (
                            <div></div>
                        ))}
                        {days.map(day => {
                            const record = getRecordForDate(day)
                            return (
                                <StyledCell
                                    onClick={() => handleDayClick(day)}
                                    isToday={isToday(day)}
                                    isSelected={isSameDay(day, selectedDate || new Date())}
                                    isDisabled={!isSameMonth(day, currentDate)}
                                >
                                    {format(day, 'd')}
                                    <DotWrapper>
                                        {record?.diet && <Dot color='yellow' />}
                                        {record?.workout && <Dot color='blue' />}
                                    </DotWrapper>
                                </StyledCell>
                            )
                        })}
                    </StyledGrid>
                </StyledContainer>

                {selectedRecord && (
                    <StyledDetail>
                        <h2 className='mb-2 text-center'>{format(selectedDate!, 'yy년 M월 d일')}</h2>
                        <div className='border border-stone-300 ' />
                        {selectedRecord.diet && (
                            <div className='my-3'>
                                <h1 className='text-lg text-yellow-300 font-bold'>식단:</h1>
                                <p>{selectedRecord.diet}</p>
                            </div>
                        )}
                        <div className='border border-stone-300 ' />
                        {selectedRecord.workout && (
                            <div className='my-3'>
                                <h1 className='text-lg text-blue-600 font-bold'>운동:</h1>
                                <p>{selectedRecord.workout}</p>
                            </div>
                        )}
                    </StyledDetail>
                )}
            </StyledBox>
            {add && (
                <StyledModal onClick={handleAddClicked}>
                    <StyledModalBox onClick={(e) => e.stopPropagation()}>
                        <StyledCloseBtn onClick={handleAddClicked}>
                            <FontAwesomeIcon icon={faXmark} size='xl' />
                        </StyledCloseBtn>
                        <StyledModalContents>
                            <h1>운동</h1>
                            <StyledModalTextArea 
                                placeholder='당신의 운동을 기록하세요'
                                className='placeholder:text-red-950 placeholder:opacity-50'
                                value={workout}
                                onChange={(e) => setWorkout(e.target.value)}
                                >
                            </StyledModalTextArea>
                        </StyledModalContents>
                        <StyledModalContents>
                            <h1>식단</h1>
                            <StyledModalTextArea 
                                placeholder='당신의 식단을 기록하세요'
                                className='placeholder:text-red-950 placeholder:opacity-50'
                                value={diet}
                                onChange={(e) => setDiet(e.target.value)}
                                >
                            </StyledModalTextArea>
                        </StyledModalContents>
                        <StyledBtn onClick={handlePostClick}>게시하기</StyledBtn>
                    </StyledModalBox>
                </StyledModal>
            )}
        </>
    )
}

export default CalendarComponent
