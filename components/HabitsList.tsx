import { SetStateAction, useState, Dispatch } from "react";
import { FlatList } from "react-native";
import HabitCard from "./HabitCard";
import { Habit, HabitListSetter, HabitSetter } from "../types";


interface HabitCompletedType {
    id: number
    date: string
    completed: boolean
}
interface HabitsListProps {
    habits: Habit[];
    setHabits: HabitListSetter
    setHabitToEdit: HabitSetter
    openEdit: () => void
    habitCompletionData: HabitCompletedType[]
    setHabitCompletionData: (value: SetStateAction<HabitCompletedType[]>) => void
}

function HabitsList({habits, setHabits, habitCompletionData, setHabitCompletionData, setHabitToEdit, openEdit}: HabitsListProps) {
    const [showEdit, setShowEdit] = useState(false)

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HabitCard habit={item} setHabits={setHabits} habitCompletionData={habitCompletionData} setHabitCompletionData={setHabitCompletionData} setHabitToEdit={setHabitToEdit} showEdit={showEdit} setShowEdit={setShowEdit} openEdit={openEdit}/>
            )}
        />
    )
}

export default HabitsList