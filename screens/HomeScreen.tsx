import { View } from "react-native";
import { Button } from "react-native-paper"
import { HabitsList, NewHabitModal, EditHabitModal } from "../components";
import { useState, useContext } from "react";
import { Habit, HabitSetter, HabitChanges, HabitsContextType } from "../types";
import { HabitsContext } from "../contexts/Habits";

function HomeScreen (){
    const { setHabits } = useContext(HabitsContext) as HabitsContextType;

    const blankHabit: Habit = {id: 0, name: "", description: "", category: "", occurence: [], completed: false}
    const [habitToEdit, setHabitToEdit]: [Habit, HabitSetter] = useState(blankHabit)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const handlePress = () => setShowCreate(true)
    const openEdit = () => setShowEdit(true)
    const closeCreate = () => setShowCreate(false)
    const closeEdit = () => setShowEdit(false)

    function editHabit(newHabit: HabitChanges) {
        // do API stuff here
    
        setHabits(habits => {
          Object.assign(habitToEdit, newHabit)
          return habits
        })
      }
    
    return (
        <View>
            <HabitsList setHabitToEdit={setHabitToEdit} openEdit={openEdit}/>
            <Button icon ="plus" mode="contained" onPress={handlePress}>Create New Habit</Button>
            <NewHabitModal visible={showCreate} onClose={closeCreate}/>
            <EditHabitModal visible={showEdit} onClose={closeEdit} habit={habitToEdit} editHabit={editHabit}/>
        </View>
    )
}

export default HomeScreen