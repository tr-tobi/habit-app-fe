import { StyleSheet, View, Text} from "react-native";
import { Button } from "react-native-paper"
import { HabitsList, NewHabitModal, EditHabitModal } from "../components";
import { useState, useContext } from "react";
import { Habit, HabitSetter, HabitChanges, HabitsContextType } from "../types";
import { HabitsContext } from "../contexts/Habits";
import { patchHabit } from "../requests/Requests";
import { useUserContext } from "../contexts/UserContext";
import { CurrentRenderContext } from "@react-navigation/native";

function HomeScreen (){
    const { setHabits } = useContext(HabitsContext) as HabitsContextType;

    const blankHabit: Habit = {id: "", name: "", description: "", category: "", occurrence: [], completed: false}
    const [habitToEdit, setHabitToEdit]: [Habit, HabitSetter] = useState(blankHabit)
    const [showCreate, setShowCreate] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const handlePress = () => setShowCreate(true)
    const openEdit = () => setShowEdit(true)
    const closeCreate = () => setShowCreate(false)
    const closeEdit = () => setShowEdit(false)
    const {currentUser} = useUserContext()    

    function editHabit(newHabit: HabitChanges) {
      const username = currentUser

      const updatedHabit = {
        habit_name: newHabit.name,
        habit_category: newHabit.category,
        description: newHabit.description,
        occurence: newHabit.occurrence
      }

        setHabits(habits => {
          Object.assign(habitToEdit, newHabit)
          return habits
        })
        patchHabit(username, updatedHabit, newHabit.id)
      }

    const [categories, setCategories] = useState([
      {label: "Create a category", value: ''},
      {label: 'Activity', value: 'Activity'},
      {label: 'Education', value: 'Education'},
      {label: 'Relaxation', value: 'Relaxation'},
    ]);

    const categoriesStates = {categories, setCategories}
    
    return (
        <View style={{flex: 1, flexDirection: "column"}}>
            <HabitsList setHabitToEdit={setHabitToEdit} openEdit={openEdit}/>
            <View style={{flexBasis: "auto", margin: 10}}>
              <Button icon ="plus" mode="contained" onPress={handlePress} style={styles.buttons}>Create New Habit</Button>
            </View>
            <NewHabitModal visible={showCreate} onClose={closeCreate} categoriesStates={categoriesStates}/>
            <EditHabitModal visible={showEdit} onClose={closeEdit} habit={habitToEdit} editHabit={editHabit} categoriesStates={categoriesStates}/>
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
    backgroundColor: "black",
  
  }
})
export default HomeScreen;
