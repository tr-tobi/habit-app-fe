import Reach from 'react'
import { Calendar, CalendarList, Agenda } from "react-native-calendars"

interface HabitCalendarProps {
    onDayPress: () => void
}
function HabitCalendar (){
    return (
        <Calendar onDayPress={day => {
            console.log('selected day', day)}}/>
    )
}

export default HabitCalendar