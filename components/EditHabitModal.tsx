import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Habit, HabitChanges } from "../types";
import HabitModal from "./HabitModal";

interface NewHabitProps {
    visible: boolean
    onClose: () => void
    habit: Habit
    editHabit: (newHabit: HabitChanges) => void
    categoriesStates: {
        categories: {label: string, value: string}[],
        setCategories: Dispatch<SetStateAction<{label: string, value: string}[]>>
    }
}

export default function EditHabitModal({visible, onClose, habit, editHabit, categoriesStates}: NewHabitProps) {
    const [name, setName] = useState("")
    const [category, setCategory] = useState("");
    const {categories, setCategories} = categoriesStates
    const [days, setDays] = useState(new Array);
    const [description, setDescription] = useState("")
    const [errorText, setErrorText] = useState("")

    useEffect(() => {
        setName(habit.name)
        setCategory(habit.category)
        setDays(habit.occurence)
        setDescription(habit.description)
    }, [habit])

    function submitChanges() {
        const dayOrder: {[index: string]: number} = {
            "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, 
            "Friday": 4, "Saturday": 5, "Sunday": 6
        }
        const sortedDays = [...days].sort((a: string, b:string) => dayOrder[a] - dayOrder[b])
        
        const newHabit = {
            name: name.trim(),
            description: description.trim(),
            category: category,
            occurence: sortedDays,
        }   

        editHabit(newHabit)
    }

    const labels = {title: "Edit Habit", button: "Submit Changes"}
    const formStates = {name, setName, category, setCategory, categories, setCategories, days, setDays, description, setDescription}
    const errorStates = {errorText, setErrorText}

    return (
        <HabitModal visible={visible} labels={labels} handleDismiss={onClose} formStates={formStates} submit={submitChanges} errorStates={errorStates}/>
    )
}