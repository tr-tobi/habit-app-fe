import {useState, Dispatch, SetStateAction, useContext} from "react";
import { View } from "react-native";
import { List, Checkbox, Button } from "react-native-paper";
import { Habit, HabitSetter, HabitsContextType, HabitCompletionContextType } from "../types";
import { HabitsContext } from "../contexts/Habits";
import DeleteHabitDialog from "./DeleteHabitDialog";
import { HabitCompletionContext } from "../contexts/HabitCompletion";
import { deleteHabitById } from "../requests/Requests";
import { useUserContext } from "../contexts/UserContext";
import { patchHabitCompletion } from "../requests/Requests";

interface HabitCardProps {
  habit: Habit;
  setHabitToEdit: HabitSetter
  showEdit: boolean;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  openEdit: () => void
}

function HabitCard({ habit, setHabitToEdit, showEdit, setShowEdit, openEdit }: HabitCardProps) {
  const { setHabits } = useContext(HabitsContext) as HabitsContextType;
  const { habitCompletionData, setHabitCompletionData } = useContext(HabitCompletionContext) as HabitCompletionContextType
  const [longPressed, setLongPressed] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const {currentUser} = useUserContext()
  
  const handleHabitCompletion = (id: string, newComplete: boolean) => {
    const today = new Date().toISOString().split('T')[0];

    const existingEntryIndex = habitCompletionData.findIndex((entry) => entry.id === id && entry.date === today)

    if(existingEntryIndex !== -1){

      const newHabitCompletion = {
        completed: newComplete,
        habit_id: habit.id
      }

      patchHabitCompletion(currentUser, newHabitCompletion)
      .catch((err) => {
        console.log(err)
        console.log('Can not patch habit completion')
      })

      setHabitCompletionData((prevData) => {
        const updatedData = [...prevData]
        updatedData[existingEntryIndex].completed = !updatedData[existingEntryIndex].completed
        return updatedData
      })
    } else {
      setHabitCompletionData((prevData) => [...prevData, { id: id, date:today, completed:true}])
    }
  }

  const handleCheckboxPress = () => {
    const id = habit.id
    const newComplete = !habit.completed
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    handleHabitCompletion(id, newComplete);
  };

  function handleTouch() {
    if (longPressed) return setLongPressed(false)
    handleCheckboxPress()
  }

  function handleLongPress() {
    setLongPressed(true)
    setShowEdit(show => !show)
  }

  function openEditor() {
    setHabitToEdit(habit)
    openEdit()
  }

  function deleteHabit() {
    const username = currentUser
    const id = habit.id

    deleteHabitById(username, id)
    .catch ((err) => {
        console.log(err)
        console.log('Failed to delete habit')
      })
      setHabits(currState => {
        return currState.filter(element => element !== habit)
    })
    }

  function hideDialog() {
    setShowDelete(false)
  }

  return (
    <View style={{flexDirection: "row", alignItems: "center"}}>
      <List.Item
      onTouchEnd={handleTouch}
      onLongPress={handleLongPress}
        style={{flex: 1, backgroundColor: habit.completed ? "lightgreen" : "white" }}
        title={habit.name}
        description={habit.description}
        left={(props) => <List.Icon {...props} icon="circle" />}
        right={() => (
            <Checkbox
            status={habit.completed ? "checked" : "unchecked"}
            color="green"
            />
        )}
      />
      {
        showEdit && <>
        <Button onPress={openEditor}>Edit</Button>
        <Button onPress={() => setShowDelete(true)} labelStyle={{color: "red"}}>Delete</Button>
        </>}
      <DeleteHabitDialog visible={showDelete} hideDialog={hideDialog} deleteHabit={deleteHabit}/>
    </View>
  );
}

export default HabitCard;
