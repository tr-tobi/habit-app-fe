import { View } from "react-native";
import { Button } from "react-native-paper";
import HabitsList from "../components/HabitsList";
import { useState } from "react";
import NewHabitModal from "../components/NewHabitModal";
import EditHabitModal from "../components/EditHabitModal";
import {
  Habit,
  HabitSetter,
  HabitListSetter,
  HabitChanges,
  HabitCompletedType,
  HabitCompletionSetter,
} from "../types";

interface HabitsListProps {
  habits: Habit[];
  setHabits: HabitListSetter;
  habitCompletionData: HabitCompletedType[];
  setHabitCompletionData: HabitCompletionSetter;
}

function HomeScreen({
  habits,
  setHabits,
  habitCompletionData,
  setHabitCompletionData,
}: HabitsListProps) {
  const blankHabit: Habit = {
    id: 0,
    name: "",
    description: "",
    category: "",
    occurence: [],
    completed: false,
  };
  const [habitToEdit, setHabitToEdit]: [Habit, HabitSetter] =
    useState(blankHabit);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handlePress = () => setShowCreate(true);
  const openEdit = () => setShowEdit(true);
  const closeCreate = () => setShowCreate(false);
  const closeEdit = () => setShowEdit(false);

  function editHabit(newHabit: HabitChanges) {
    // do API stuff here

    setHabits((habits) => {
      Object.assign(habitToEdit, newHabit);
      return habits;
    });
  }

  return (
    <View>
      <HabitsList
        habits={habits}
        setHabits={setHabits}
        habitCompletionData={habitCompletionData}
        setHabitCompletionData={setHabitCompletionData}
        setHabitToEdit={setHabitToEdit}
        openEdit={openEdit}
      />
      <Button icon="plus" mode="contained" onPress={handlePress}>
        Create New Habit
      </Button>
      
      <NewHabitModal
        visible={showCreate}
        onClose={closeCreate}
        setHabits={setHabits}
        setHabitCompletionData={setHabitCompletionData}
      />
      <EditHabitModal
        visible={showEdit}
        onClose={closeEdit}
        habit={habitToEdit}
        editHabit={editHabit}
      />
    </View>
  );
}

export default HomeScreen;
