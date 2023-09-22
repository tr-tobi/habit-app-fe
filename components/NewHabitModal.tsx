import { useState } from "react";
import { HabitListSetter } from "../types";
import HabitModal from "./HabitModal";

interface NewHabitProps {
    visible: boolean,
    onClose: () => void,
    setHabits: HabitListSetter
}

export default function NewHabitModal({visible, onClose, setHabits}: NewHabitProps) {
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
                description: description.trim(),
                category: category,
                occurence: sortedDays,
                completed: false
            }

            return [...prevState, newHabit]
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