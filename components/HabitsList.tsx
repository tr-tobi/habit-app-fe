import { useState, useContext, useEffect } from "react";
import { FlatList, View } from "react-native";
import HabitCard from "./HabitCard";
import { HabitsContext } from "../contexts/Habits";
import { HabitSetter, HabitsContextType } from "../types";
import { Button } from "react-native-paper";
import { getHabits } from "../requests/Requests";
import { useUserContext } from "../contexts/UserContext";

interface HabitsListProps {
    setHabitToEdit: HabitSetter
    openEdit: () => void
}

function HabitsList({setHabitToEdit, openEdit}: HabitsListProps) {
    const { habits, setHabits } = useContext(HabitsContext) as HabitsContextType;
    const { currentUser } = useUserContext()
    const [showEdit, setShowEdit] = useState(false)
    const [showTodayOnly, setShowTodayOnly] = useState(false)

    useEffect(() => {
        getHabits(currentUser)
        .then((habits) => {
            setHabits(habits.map(habit => {
                return {
                    id: habit.habit_id,
                    name: habit.habit_name,
                    description: habit.description,
                    category: habit.habit_category,
                    occurrence: habit.occurrence,
                    completed: false
                }
            })) 
        })
        .catch((err) => {
            console.log("ERROR");
        })
    }, [])

    const filteredHabits = showTodayOnly
    ? habits.filter((habit) => habit.occurrence.includes(new Intl.DateTimeFormat("en-US", { weekday: "long"}).format(new Date()))) 
    : habits;

    return (
        <View style={{flexBasis: 0, flexGrow: 1}}>
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