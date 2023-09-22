import { useState } from "react";
import { HabitListSetter, HabitCompletedType, HabitCompletionSetter } from "../types";
import HabitModal from "./HabitModal";

interface NewHabitProps {
    visible: boolean,
    onClose: () => void,
    setHabits: HabitListSetter
    setHabitCompletionData: HabitCompletionSetter
}

export default function NewHabitModal({visible, onClose, setHabits, setHabitCompletionData}: NewHabitProps) {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("");
    const [days, setDays] = useState(new Array);
    const [description, setDescription] = useState("")
    const [errorText, setErrorText] = useState("")

    function submitHabit() {
        const dayOrder: {[index: string]: number} = {
            "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, 
            "Friday": 4, "Saturday": 5, "Sunday": 6
        }
        const sortedDays = [...days].sort((a: string, b:string) => dayOrder[a] - dayOrder[b])

        // Do API post thing here and get the ID
        setHabits(prevState => {
            const newHabit = {
                id: prevState.length + 1,
                name: name.trim(),
                date: new Date().toISOString().split('T')[0],
                description: description.trim(),
                category: category,
                occurence: sortedDays,
                completed: false
            }

            return [...prevState, newHabit]
        })
        //Do API post request here too i think
        setHabitCompletionData(previousState => {
            const newHabitCompletion = {
                id: previousState.length + 1,
                name: name.trim(),
                date: new Date().toISOString().split('T')[0],
                description: description.trim(),
                category: category,
                occurence: sortedDays,
                completed: false
            }
            return [...previousState, newHabitCompletion]
        })
    }

    function handleDismiss() {
        setName("")
        setCategory("")
        setDays(new Array)
        setDescription("")
        onClose()
    }

    const labels = {title: "Create Habit", button: "Submit Habit"}
    const formStates = {name, setName, category, setCategory, days, setDays, description, setDescription}
    const errorStates = {errorText, setErrorText}

    return (
        <HabitModal visible={visible} labels={labels} handleDismiss={handleDismiss} formStates={formStates} submit={submitHabit} errorStates={errorStates}/>
    )
}