import { View, Text } from "react-native";
import HabitCalendar from "../components/HabitCalendar";

interface HabitCompletedType {
    id: number
    date: string
    completed: boolean
}

interface HabitCalendarProps {
    habitCompletionData: HabitCompletedType[];
    
}

export default function CalendarHabitScreen({habitCompletionData,}:HabitCalendarProps) {
    return (
        <View>
            <HabitCalendar habitCompletionData = {habitCompletionData}/>
        </View>
    )
}