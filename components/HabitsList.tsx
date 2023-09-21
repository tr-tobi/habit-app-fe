import { SetStateAction, useState, Dispatch } from "react";
import { FlatList } from "react-native";
import HabitCard from "./HabitCard";
import { Habit, HabitListSetter, HabitSetter } from "../types";

interface HabitsListProps {
    habits: Habit[];
    setHabits: HabitListSetter
    setHabitToEdit: HabitSetter
    openEdit: () => void
}

function HabitsList({habits, setHabits, setHabitToEdit, openEdit}: HabitsListProps) {
    const [showEdit, setShowEdit] = useState(false)

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HabitCard habit={item} setHabits={setHabits} setHabitToEdit={setHabitToEdit} showEdit={showEdit} setShowEdit={setShowEdit} openEdit={openEdit}/>
            )}
        />
    )
}

export default HabitsList