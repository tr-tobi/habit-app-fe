import { useState } from "react";
import { FlatList } from "react-native";
import HabitCard from "./HabitCard";
import { Habit, HabitListSetter, HabitSetter, HabitCompletedType, HabitCompletionSetter } from "../types";

interface HabitsListProps {
    habits: Habit[];
    setHabits: HabitListSetter
    setHabitToEdit: HabitSetter
    openEdit: () => void
    habitCompletionData: HabitCompletedType[]
    setHabitCompletionData: HabitCompletionSetter
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