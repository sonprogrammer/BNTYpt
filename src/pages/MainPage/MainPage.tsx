import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { Value } from 'react-calendar/dist/cjs/shared/types'


const MainPage = () => {
  const [date, setDate] = useState<Value>(new Date())
  const onChange = (newDate: Value) => {
    setDate(newDate)
  }

  return (
    <div className='h-screen flex flex-col items-center '>
      <Calendar 
        onChange={onChange}
        value={date}
        className="react-calendar "
      />
      <p>
        Selected date : {Array.isArray(date) 
        ? `${date[0]?.toDateString()} - ${date[1]?.toDateString()}` 
        : date?.toDateString()
      }
      </p>

    </div>
  )
}

export default MainPage
