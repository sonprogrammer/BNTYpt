import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay } from 'date-fns'
import styles from './Calendar.module.css'
import React, { useState } from 'react'
import { StyledCell, StyledContainer, StyledDay, StyledGrid, StyledHeader } from './style'


const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)

    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const days = eachDayOfInterval({start: firstDayOfMonth, end: lastDayOfMonth})

    const handlePreviousMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
    }
    const handleNextMonth = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
    }
    const handleDayClick = (date: Date) => {
        setSelectedDate(date)
    }
  return (
    <StyledContainer>
      <StyledHeader>
        <button onClick={handlePreviousMonth}>prev</button>
        <h2>{format(currentDate, 'MMM yyyy')}</h2>
        <button onClick={handleNextMonth}>next</button>
      </StyledHeader>
      <StyledGrid>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <StyledDay>{day}</StyledDay>
        ))}
        {days.map(day =>(
            <StyledCell
                onClick={() => handleDayClick(day)}
                isToday={isToday(day)}    
                isSelected={isSameDay(day, selectedDate || new Date())}
                isDisabled={!isSameMonth(day, currentDate)}
            >
                {format(day, 'd')}
            </StyledCell>
        ))}
      </StyledGrid>
    </StyledContainer>

)
}

export default CalendarComponent
