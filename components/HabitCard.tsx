import React, { SetStateAction } from "react";
import { Text, View, FlatList } from "react-native";
import { List, Checkbox } from "react-native-paper";

interface HabitType {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

interface HabitCompletedType {
  id: number
  date: string
  completed: boolean
}

interface HabitCardProps {
  habits: HabitType[];
  setHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  habitCompletionData: HabitCompletedType[]
  setHabitCompletionData: (value: SetStateAction<HabitCompletedType[]>) => void
}

function HabitCard({ habits, setHabits, habitCompletionData, setHabitCompletionData}: HabitCardProps) {

  const handleHabitCompletion = (id: number) => {
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
    // console.log(habitCompletionData, "<<<<<<<<")
  }

  const handleCheckboxPress = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
    handleHabitCompletion(id);
  };

  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <List.Item
          onPress={() => handleCheckboxPress(item.id)}
          style={{ backgroundColor: item.completed ? "lightgreen" : "white" }}
          title={item.name}
          description={item.description}
          left={(props) => <List.Icon {...props} icon="circle" />}
          right={() => (
            <Checkbox
              status={item.completed ? "checked" : "unchecked"}
              onPress={() => handleCheckboxPress(item.id)}
              color="green"
            />
          )}
        />
      )}
    />
  );
}

export default HabitCard;
