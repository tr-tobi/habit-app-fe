import React from "react";
import { Text, View, FlatList } from "react-native";
import { List, Checkbox } from "react-native-paper";

interface Habit {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

interface HabitCardProps {
  habits: Habit[];
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>;
}

function HabitCard({ habits, setHabits }: HabitCardProps) {
  const handleCheckboxPress = (id: number) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <FlatList
      data={habits}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          description={item.description}
          left={(props) => <List.Icon {...props} icon="circle" />}
          right={() => (
            <Checkbox
              status={item.completed ? "checked" : "unchecked"}
              onPress={() => handleCheckboxPress(item.id)}
            />
          )}
        />
      )}
    />
  );
}

export default HabitCard;
