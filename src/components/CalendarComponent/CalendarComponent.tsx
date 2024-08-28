import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, getDay, addDays } from 'date-fns'
import styles from './Calendar.module.css'
import React, { useState } from 'react'
import { Dot, DotWrapper, StyledBox, StyledCell, StyledContainer, StyledDay, StyledDetail, StyledGrid, StyledHeader, StyledIcon } from './style'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type Records = {
    date: string;
    diet?: string;
    workout?: string;
}

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [records, setRecords] = useState<Records[]>([
        { date: '2024-08-28', diet: '아침: 샐러드, 점심: 닭가슴살, 저녁: 야채스프', workout: '가슴 운동, 하체 운동' },
        { date: '2024-08-29', diet: '아침: 오트밀, 점심: 생선구이, 저녁: 채소 볶음', workout: '등 운동, 유산소' }
    ])

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
        // 여기에 선택된 날에 식단이랑 어떤운동했는지 떠야함
    }
    const getRecordForDate = (date: Date) => {
        const dateString = format(date, 'yyyy-MM-dd')
        return records.find(record => record.date === dateString)
    }

    const selectedRecord = selectedDate ? getRecordForDate(selectedDate) : null

    return (
        <StyledBox>
        <StyledContainer>
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
                    return(
                    <StyledCell
                        onClick={() => handleDayClick(day)}
                        isToday={isToday(day)}
                        isSelected={isSameDay(day, selectedDate || new Date())}
                        isDisabled={!isSameMonth(day, currentDate)}
                    >
                        {format(day, 'd')}
                        <DotWrapper>
                        {record?.diet && <Dot color= 'yellow' />}    
                        {record?.workout && <Dot color= 'blue' />}    
                        </DotWrapper>
                    </StyledCell>
                )
                    })}
            </StyledGrid>
        </StyledContainer>

{selectedRecord && (
    <StyledDetail>
        <h2>{format(selectedDate!, 'yyyy-MM-dd')}</h2>
        <div className='border border-stone-300 '/>
        {selectedRecord.diet && (
            <div>
                <h4>식단:</h4>
                <p>{selectedRecord.diet}</p>
            </div>
        )}
        <div className='border border-stone-300 '/>
        {selectedRecord.workout && (
            <div>
                <h4>운동:</h4>
                <p>{selectedRecord.workout}</p>
            </div>
        )}
    </StyledDetail>
)}
</StyledBox>
    )
}

export default CalendarComponent
