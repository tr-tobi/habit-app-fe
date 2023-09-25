import { useState, useContext } from "react";
import { FlatList, View } from "react-native";
import HabitCard from "./HabitCard";
import { HabitsContext } from "../contexts/Habits";
import { HabitSetter, HabitsContextType } from "../types";
import { Button } from "react-native-paper";

interface HabitsListProps {
    setHabitToEdit: HabitSetter
    openEdit: () => void
}

function HabitsList({setHabitToEdit, openEdit}: HabitsListProps) {
    const { habits } = useContext(HabitsContext) as HabitsContextType;
    const [showEdit, setShowEdit] = useState(false)
    const [showTodayOnly, setShowTodayOnly] = useState(false)


    const filteredHabits = showTodayOnly
    ? habits.filter((habit) => habit.occurence.includes(new Intl.DateTimeFormat("en-US", { weekday: "long"}).format(new Date()))) 
    : habits;

    return (
        <View>
            <Button onPress={() => setShowTodayOnly(!showTodayOnly)}>
            {showTodayOnly ? "Show All Habits" : "Show Today's Habits"}
          </Button>
            <FlatList
                data={filteredHabits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <HabitCard habit={item} setHabitToEdit={setHabitToEdit} showEdit={showEdit} setShowEdit={setShowEdit} openEdit={openEdit}/>
                )}
            />
        </View>
    )
}

export default HabitsList