/* eslint-disable*/


import React from 'react'
import { useState, useEffect } from 'react'
import { StyledBtns, StyledContainer, StyledTimeBox, StyledTimeSetting } from './style'


const TimerComponent = () => {

  const [minutes, setMinutes] = useState<number>(0)
  const [seconds, setSeconds] = useState<number>(0)

  const [isRunning, setIsRunning] = useState<boolean>(false)

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer!);
            const audio = new Audio('/alarm.mp3')
            audio.play()
            setIsRunning(false)
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(timer!);
  }, [isRunning, minutes, seconds]);
  
  
  const handleChaneMinutes = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setMinutes(Number(e.target.value))
  }
  const handleChaneSeconds = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setSeconds(Number(e.target.value))
  }


  const startTimer = () =>{
    setIsRunning(true)
  }
  
  const stopTimer = () =>{
    setIsRunning(false)
  }

  const resetTimer = () =>{
    setIsRunning(false)
    setMinutes(0)
    setSeconds(0)
  }
  
  return (
    <StyledContainer>
      <h1>타이머</h1>
      <StyledTimeBox>
        <h2>
          {minutes === 0 && seconds === 0 ? ('easy weight! just do it!') : (
            <h2>
            {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
            </h2>
          )}
        </h2>
        </StyledTimeBox>
          <h2>타이머 설정</h2>
        <StyledTimeSetting>
          <input
            type="number"
            value={minutes} 
            placeholder='Minutes'
            onChange={handleChaneMinutes}
            // min="0"
           /> <p>분</p>
          <input 
            type="number" 
            value={seconds}
            placeholder='Seconds'
            onChange={handleChaneSeconds} 
            // min="0"
          /> <p>초</p>
        </StyledTimeSetting>
      <StyledBtns>
        <button onClick={startTimer} disabled={isRunning}>
            start
        </button>
        <button onClick={stopTimer} disabled={!isRunning}>
            stop
        </button>
        <button onClick={resetTimer}>
            reset
        </button>
      </StyledBtns>
    </StyledContainer>
  )
}

export default TimerComponent
