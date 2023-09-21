import {useState, Dispatch, SetStateAction} from "react";
import { View } from "react-native";
import { List, Checkbox, Button } from "react-native-paper";
import { Habit, HabitListSetter, HabitSetter } from "../types";

interface HabitCardProps {
  habit: Habit;
  setHabits: HabitListSetter;
  setHabitToEdit: HabitSetter
  showEdit: boolean;
  setShowEdit: Dispatch<SetStateAction<boolean>>;
  openEdit: () => void
}

function HabitCard({ habit, setHabits, setHabitToEdit, showEdit, setShowEdit, openEdit }: HabitCardProps) {
  const [longPressed, setLongPressed] = useState(false)
  
  const handleCheckboxPress = () => {
    const id = habit.id
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
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
      {showEdit && <Button onPress={openEditor}>Edit</Button>}
      
    </View>
  );
}

export default HabitCard;
