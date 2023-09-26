import { useContext, useState, Dispatch, SetStateAction } from "react";
import { HabitCompletionContextType, HabitsContextType } from "../types";
import HabitModal from "./HabitModal";
import { HabitsContext } from "../contexts/Habits";
import { HabitCompletionContext } from "../contexts/HabitCompletion";

interface NewHabitProps {
    visible: boolean
    onClose: () => void
    categoriesStates: {
        categories: {label: string, value: string}[],
        setCategories: Dispatch<SetStateAction<{label: string, value: string}[]>>
    }
}

export default function NewHabitModal({visible, onClose, categoriesStates}: NewHabitProps) {
    const { habits, setHabits } = useContext(HabitsContext) as HabitsContextType;
    const { setHabitCompletionData } = useContext(HabitCompletionContext) as HabitCompletionContextType
    const [name, setName] = useState("")
    const [category, setCategory] = useState("");
    const {categories, setCategories} = categoriesStates
    const [days, setDays] = useState(new Array);
    const [description, setDescription] = useState("")
    const [errorText, setErrorText] = useState("")


    function submitHabit() {
        const dayOrder: {[index: string]: number} = {
            "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3, 
            "Thursday": 4, "Friday": 5, "Saturday": 6
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
        //Do API post request here too i think
        setHabitCompletionData(previousState => {
            const newHabitCompletion = {
                id: previousState.length + 1,
                date: new Date().toISOString().split('T')[0],
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
    const formStates = {name, setName, category, setCategory, categories, setCategories, days, setDays, description, setDescription}
    const errorStates = {errorText, setErrorText}


    return (
        <HabitModal visible={visible} labels={labels} handleDismiss={handleDismiss} formStates={formStates} submit={submitHabit} errorStates={errorStates}/>
    )
}