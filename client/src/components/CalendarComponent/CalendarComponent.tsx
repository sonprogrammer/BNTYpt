import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, getDay, addDays } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Dot, DotWrapper, StyledBox, StyledBtn, StyledCell, StyledCloseBtn, StyledContainer, StyledDay, StyledDetail, StyledGrid, StyledHeader, StyledIcon, StyledModal, StyledModalBox, StyledModalContents, StyledModalTextArea, StyledTitle } from './style'
import { CalendarCheck, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useRecoilState } from 'recoil'
import { userState } from '../../utils/userState'
import { axiosInstance } from '../../utils/axiosInstance';
import toast from 'react-hot-toast'

const apiUrl = process.env.REACT_APP_API_URL;

type Records = {
    date: string;
    diet?: string;
    workout?: string;
    kakaoId? : string;
    email? : string;
    userType? : string;
}

interface CalendarsData{
    _id: string;
    diet: string;
    workout: string
    date: Date
    userId: string
}

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date >(new Date())
    const [records, setRecords] = useState<Records[]>([])
    const [add, setAdd] = useState<boolean>(false)
    const [workout, setWorkout] = useState<string>('')
    const [diet, setDiet] = useState<string>('')

    const [user] = useRecoilState(userState)

    const { days, leadingEmptyDays } = useMemo(() => {
        const firstDayOfMonth = startOfMonth(currentDate)
        const lastDayOfMonth = endOfMonth(currentDate)
        const startDay = getDay(firstDayOfMonth)
        
        return {
            days: eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth }),
            leadingEmptyDays: Array.from({ length: startDay }, (_, i) => addDays(firstDayOfMonth, i - startDay))
        }
    }, [currentDate])

    const recordsMap = useMemo(() => {
        const map: Record<string, Records> = {}
        records.forEach(record => {
            if (record.date) map[record.date] = record
        })
        return map
    }, [records])


    const fetchCalendar = useCallback(async() => {
        try {
            let url= ''
            if(user.email){
                url = `${apiUrl}/api/calendar/user/email/${user.email}`
            } else if(user.kakaoId){
                url = `${apiUrl}/api/calendar/user/kakao/${user.kakaoId}`
            }
            
            const res = await axiosInstance.get(url)
            if(res.data.success){
                const formattedRecords = res.data.calendars.map((record:CalendarsData) => ({
                    ...record,
                    date: format(new Date(record.date), 'yyyy-MM-dd'),
                }));
                setRecords(formattedRecords);
            }
        } catch (error) {
            console.log('err', error)
            toast.error('데이터를 불러오지 못했습니다.')
        }
    }, [user])
    

    useEffect(()=>{
        if(!user) return
        if(user.email || user.kakaoId){
            fetchCalendar() 
        }
    },[user, fetchCalendar])


    const handlePostClick = async() => {
        if(!selectedDate){
            toast.error('날짜를 선택해주세요.')
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
           const res = await axiosInstance.post(`${apiUrl}/api/calendar`, formData)
            if(res.data.success){
                const newRecord: Records = {
                    date: format(res.data.post.date, 'yyyy-MM-dd'),
                    workout: res.data.post.workout,
                    diet: res.data.post.diet,
                }
    
                setRecords([...records, newRecord])
                setAdd(false)
                toast.success('오늘의 기록이 저장되었습니다!')

            }

        }catch(error){
            console.log('error', error)
            toast.error('저장에 실패했습니다.')
        }
    }
    const selectedDateString = useMemo(() => format(selectedDate, 'yyyy-MM-dd'), [selectedDate])
    const selectedRecord = recordsMap[selectedDateString] || null;


    return (
        <>
            <StyledBox>
                <StyledContainer>
                    <StyledTitle>
                        <h1><CalendarCheck size={22} className="mr-2 text-red-600 inline-block align-text-bottom" />기록 캘린더</h1>
                        <button className="add-btn" onClick={() => setAdd(true)}>
                            <Plus size={18} />
                        </button>
                    </StyledTitle>
                    
                    <StyledHeader>
                        <StyledIcon onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>
                            <ChevronLeft size={20} />
                        </StyledIcon>
                        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
                        <StyledIcon onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>
                            <ChevronRight size={20} />
                        </StyledIcon>
                    </StyledHeader>

                    <StyledGrid>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => <StyledDay key={day}>{day}</StyledDay>)}
                        {leadingEmptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                        {days.map(day => {
                            const dateString = format(day, 'yyyy-MM-dd')
                            const record = recordsMap[dateString]
                            return (
                                <StyledCell
                                    key={day.toString()}
                                    onClick={() => setSelectedDate(day)}
                                    isToday={isToday(day)}
                                    isSelected={isSameDay(day, selectedDate)}
                                    isDisabled={!isSameMonth(day, currentDate)}
                                >
                                    <span>{format(day, 'd')}</span>
                                    <DotWrapper>
                                        {record?.diet && <Dot color='#fbbf24' />}
                                        {record?.workout && <Dot color='#ef4444' />}
                                    </DotWrapper>
                                </StyledCell>
                            )
                        })}
                    </StyledGrid>
                </StyledContainer>

                <StyledDetail>
                    <div className="detail-header">
                        <h3>{format(selectedDate, 'yyyy. MM. dd')}</h3>
                    </div>
                    <div className="detail-content">
                        <div className="item">
                            <span className="label diet">DIET</span>
                            <p>{selectedRecord?.diet || '기록된 식단이 없습니다.'}</p>
                        </div>
                        <div className="item">
                            <span className="label workout">WORKOUT</span>
                            <p>{selectedRecord?.workout || '기록된 운동이 없습니다.'}</p>
                        </div>
                    </div>
                </StyledDetail>
            </StyledBox>

            {add && (
                <StyledModal onClick={() => setAdd(false)}>
                    <StyledModalBox onClick={(e) => e.stopPropagation()}>
                        <StyledCloseBtn onClick={() => setAdd(false)}><X size={20} /></StyledCloseBtn>
                        <StyledModalContents>
                            <label>오늘의 운동</label>
                            <StyledModalTextArea 
                                placeholder='수행한 운동 루틴을 적어주세요'
                                value={workout}
                                onChange={(e) => setWorkout(e.target.value)}
                            />
                        </StyledModalContents>
                        <StyledModalContents>
                            <label>오늘의 식단</label>
                            <StyledModalTextArea 
                                placeholder='무엇을 드셨나요?'
                                value={diet}
                                onChange={(e) => setDiet(e.target.value)}
                            />
                        </StyledModalContents>
                        <StyledBtn onClick={handlePostClick}>기록 저장하기</StyledBtn>
                    </StyledModalBox>
                </StyledModal>
            )}
        </>
    )
}

export default CalendarComponent
