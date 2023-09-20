import { View } from "react-native";
import { Button } from "react-native-paper"
import HabitsList from "../components/HabitsList";
import { SetStateAction, useState } from "react";


interface HabitType {
    id: number
    name: string
    description: string
    completed: boolean
}
interface HabitsListProps {
    habits: HabitType[];
    setHabits: (value: SetStateAction<HabitType[]>) => void
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

function HomeScreen ({habits, setHabits}:HabitsListProps){

    const [show, setShow] = useState(false)

    const handlePress = () => {
        setShow(true)
      }

    const closeModal = () => {
        setShow(false)
    }
    
    return (
        <View>
            <HabitsList habits={habits} setHabits={setHabits}/>
            <Button icon ="plus" mode="contained" onPress={handlePress}>Create New Habit</Button>
            {/* <NewHabitModal visible = {show} onClose = {closeModal}/> */}
        </View>
    )
}

export default HomeScreen