import { View } from "react-native";
import { Button } from "react-native-paper"
import HabitsList from "../components/HabitsList";
import { SetStateAction, useState } from "react";
import NewHabitModal from "../components/NewHabitModal";

interface HabitType {
    id: number
    name: string
    description: string
    completed: boolean
}

interface HabitCompletedType {
    id: number
    date: string
    completed: boolean
}

interface HabitsListProps {
    habits: HabitType[];
    setHabits: (value: SetStateAction<HabitType[]>) => void
    habitCompletionData: HabitCompletedType[]
    setHabitCompletionData: (value: SetStateAction<HabitCompletedType[]>) => void
  }

interface ButtonProps {
    icon: string
    mode: string
    onPress: () => void
}

interface NewHabitModalProps {
    visible: boolean
    onClose: () => void
}

function HomeScreen ({habits, setHabits, habitCompletionData, setHabitCompletionData}:HabitsListProps){

    const [show, setShow] = useState(false)

    const handlePress = () => {
        setShow(true)
      }

    const closeModal = () => {
        setShow(false)
    }
    
    return (
        <View>
            <HabitsList habits={habits} setHabits={setHabits} habitCompletionData = {habitCompletionData} setHabitCompletionData = {setHabitCompletionData}/>
            <Button icon ="plus" mode="contained" onPress={handlePress}>Create New Habit</Button>
            <NewHabitModal visible = {show} onClose = {closeModal} setHabits = {setHabits}/>
        </View>
    )
}

export default HomeScreen