import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, isSameDay, getDay, addDays } from 'date-fns'
import { useMemo, useState } from 'react'
import { Dot, DotWrapper, StyledAddBtn, StyledBox, StyledBtn, StyledCell, StyledCloseBtn, StyledContainer, StyledDay, StyledDetail, StyledGrid, StyledHeader, StyledIcon, StyledModal, StyledModalBox, StyledModalContents, StyledModalTextArea, StyledTitle } from './style'
import { CalendarCheck, Plus, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useRecoilValue } from 'recoil'
import { userState } from '../../utils/userState'
import toast from 'react-hot-toast'
import { useGetCalendarRecords } from '../../hooks/useGetCalendarRecords'
import { useAddCalendarRecord } from '../../hooks/useAddCalendarRecord'
import { BeatLoader } from 'react-spinners'


type Records = {
    date: string;
    diet?: string;
    workout?: string;
    kakaoId?: string;
    email?: string;
    userType?: string;
}

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [add, setAdd] = useState<boolean>(false)
    const [workout, setWorkout] = useState<string>('')
    const [diet, setDiet] = useState<string>('')

    const user = useRecoilValue(userState)



    const { data } = useGetCalendarRecords(user?.email, user?.kakaoId)
    const { mutate: addRecord, isPending: isAdding } = useAddCalendarRecord()


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
        data?.calendars.forEach(record => {
            const date = format(new Date(record.date), 'yyyy-MM-dd')

            map[date] = {
                date,
                diet: record.diet,
                workout: record.workout
            }
        })
        return map
    }, [data])



    const handlePostClick = () => {
        if (!user?.email && !user?.kakaoId) {
            toast.error('사용자 정보를 확인할 수 없습니다.')
            return
        }
        const formatDate = format(selectedDate, 'yyyy-MM-dd')

        const formData: Records = {
            date: formatDate,
            workout: workout,
            diet: diet,
        }
        if (user.kakaoId) {

            formData.kakaoId = user.kakaoId
        } else if (user.email) {
            formData.email = user.email
        }
        addRecord(formData, {
            onSuccess: () => {
                toast.success('오늘의 기록이 저장되었습니다!')
                setWorkout('')
                setDiet('')
                setAdd(false)
            },
            onError: () => {
                toast.error('기록 실패')
            }
        })


    }
    const selectedDateString =  format(selectedDate, 'yyyy-MM-dd')
    const selectedRecord = recordsMap[selectedDateString] || null;


    return (
        <>
            <StyledBox>
                <StyledContainer>
                    <StyledTitle>
                        <h1><CalendarCheck size={22} className="mr-2 text-red-600 inline-block align-text-bottom" />기록 캘린더</h1>
                        <StyledAddBtn className="add-btn" onClick={() => setAdd(true)}>
                            <Plus size={18} />
                        </StyledAddBtn>
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
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => <StyledDay key={`${day}-${i}`}>{day}</StyledDay>)}
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
                        <StyledBtn disabled={isAdding} onClick={handlePostClick}>
                            {isAdding ? (
                                <BeatLoader color="#fff" size={7} />
                            ) : (
                                '기록 저장하기'
                            )}
                        </StyledBtn>
                    </StyledModalBox>
                </StyledModal>
            )}
        </>
    )
}

export default CalendarComponent
