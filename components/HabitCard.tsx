import {useState, Dispatch, SetStateAction, useContext} from "react";
import { View } from "react-native";
import { List, Checkbox, Button } from "react-native-paper";
import { Habit, HabitSetter, HabitsContextType, HabitCompletionContextType } from "../types";
import { HabitsContext } from "../contexts/Habits";
import DeleteHabitDialog from "./DeleteHabitDialog";
import { HabitCompletionContext } from "../contexts/HabitCompletion";

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
  
  const handleHabitCompletion = (id: string) => {
    const today = new Date().toISOString().split('T')[0];

    const existingEntryIndex = habitCompletionData.findIndex((entry) => entry.id === id && entry.date === today)

    if(existingEntryIndex !== -1){
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
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    handleHabitCompletion(id);
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
    // do API stuff here
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
