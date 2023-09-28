import { useState, useContext, useEffect } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import HabitCard from "./HabitCard";
import { HabitsContext } from "../contexts/Habits";
import { HabitCompletionContextType, HabitSetter, HabitsContextType } from "../types";
import { Button } from "react-native-paper";
import { getHabitCompletion, getHabits, postHabitCompletion } from "../requests/Requests";
import { useUserContext } from "../contexts/UserContext";
import { AxiosResponse } from "axios";
import { HabitCompletionContext } from "../contexts/HabitCompletion";

interface HabitsListProps {
    setHabitToEdit: HabitSetter
    openEdit: () => void
}

function HabitsList({setHabitToEdit, openEdit}: HabitsListProps) {
    const { habits, setHabits } = useContext(HabitsContext) as HabitsContextType;
    const { setHabitCompletionData } = useContext(HabitCompletionContext) as HabitCompletionContextType
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

            // getHabitCompletion(currentUser, new Date().toISOString().split('T')[0])
            // .then((habitCompletion) => {
            //     const todaysHabits = getTodaysHabits()
            //     const newCompletions: Promise<AxiosResponse<any, any>>[] = []
            //     todaysHabits.forEach(habit => {
            //         if (!habitCompletion.find(element => element.habit_id === habit.id)) {
            //             const newHabitCompletion = {
            //                 habit_id: habit.id,
            //                 username: currentUser,
            //                 completed: false
            //             }
            //             newCompletions.push(postHabitCompletion(currentUser, newHabitCompletion))
            //         }
            //     })
            //     return Promise.all(newCompletions)
            // })
            // .then(() => {
            //     return getHabitCompletion(currentUser, new Date().toISOString().split('T')[0])
            // })
            // .then((habitCompletion) => {
            //     setHabitCompletionData(habitCompletion.map((completion) => {
            //         return {
            //             id: completion.habit_id,
            //             date: new Date().toISOString().split('T')[0],
            //             completed: false,
            //         }
            //     }))
            // })
        })
        .catch((err) => {
            console.log(err);
            
            console.log("ERROR");
        })
    }, [])

    function getTodaysHabits() {
        return habits.filter((habit) => habit.occurrence.includes(new Intl.DateTimeFormat("en-US", { weekday: "long"}).format(new Date()))) 
    }

    const filteredHabits = showTodayOnly
    ? getTodaysHabits()
    : habits;

    return (
        <View style={{flexBasis: 0, flexGrow: 1}}>
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