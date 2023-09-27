import { useState, useContext } from "react";
import { StyleSheet, FlatList, View } from "react-native";
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
    ? habits.filter((habit) => habit.occurrence.includes(new Intl.DateTimeFormat("en-US", { weekday: "long"}).format(new Date()))) 
    : habits;

    return (
        <View>
            <Button style={styles.buttons} textColor="black" onPress={() => setShowTodayOnly(!showTodayOnly)}>
            {showTodayOnly ? "List All" : "Todays Habits"}
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

const styles = StyleSheet.create({
    text: {
      color: "black",
      fontSize: 20,
      padding: 0.5,
    },
    buttons: {
      width: 150,
    
    }
  })

export default HabitsList