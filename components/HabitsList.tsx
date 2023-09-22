import { useState, useContext } from "react";
import { FlatList } from "react-native";
import HabitCard from "./HabitCard";
import { HabitsContext } from "../contexts/Habits";
import { HabitSetter, HabitsContextType } from "../types";

interface HabitsListProps {
    setHabitToEdit: HabitSetter
    openEdit: () => void
}

function HabitsList({setHabitToEdit, openEdit}: HabitsListProps) {
    const { habits } = useContext(HabitsContext) as HabitsContextType;
    const [showEdit, setShowEdit] = useState(false)

    return (
        <FlatList
            data={habits}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <HabitCard habit={item} setHabitToEdit={setHabitToEdit} showEdit={showEdit} setShowEdit={setShowEdit} openEdit={openEdit}/>
            )}
        />
    )
}

export default HabitsList