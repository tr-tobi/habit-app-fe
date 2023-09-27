import { useContext, useState, Dispatch, SetStateAction } from "react";
import { HabitCompletionContextType, HabitsContextType } from "../types";
import HabitModal from "./HabitModal";
import { HabitsContext } from "../contexts/Habits";
import { HabitCompletionContext } from "../contexts/HabitCompletion";
import { postHabit, postHabitCompletion } from "../requests/Requests";
import { useUserContext } from "../contexts/UserContext";

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
    const { currentUser } = useUserContext()
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

        const newHabit = {
            habit_name: name.trim(),
            description: description.trim(),
            habit_category: category,
            occurrence: sortedDays,
        }

        postHabit(currentUser, newHabit)
        .then(habit => {
            setHabits(prevState => {
                const newHabit = {
                    id: habit.habit_id,
                    name: habit.habit_name,
                    description: habit.description,
                    category: habit.category,
                    occurrence: habit.occurrence,
                    completed: false
                }
    
                return [...prevState, newHabit]
            })

            const today = new Intl.DateTimeFormat("en-US", { weekday: "long"}).format(new Date())
            if (sortedDays.includes(today)) {
                
                const newHabitCompletion = {
                    habit_id: habit.habit_id,
                    username: currentUser,
                    completed: false
                }

                return postHabitCompletion(currentUser, newHabitCompletion)
                .then(() => {
                    setHabitCompletionData(previousState => {
                        const newHabitCompletion = {
                            id: habit.habit_id,
                            date: new Date().toISOString().split('T')[0],
                            completed: false
                        }
                        return [...previousState, newHabitCompletion]
                    })
                })
            }
        })
        .catch((err) => {
            setErrorText("Failed to upload new habit")
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