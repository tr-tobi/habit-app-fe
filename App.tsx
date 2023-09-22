import { PaperProvider } from "react-native-paper";
import { SetStateAction, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavHeader from "./components/NavHeader";
import HomeScreen from "./screens/HomeScreen";
import SignUpPage from "./screens/SignUpPage";
import CalendarHabitScreen from "./screens/CalendarHabitScreen";
import { Habit, HabitListSetter } from "./types";

interface HabitCompletedType {
  id: number
  date: string
  completed: boolean
}

interface HabitCalendarProps {
  habitCompletionData: HabitCompletedType[];
  setHabitCompletionData: (value: SetStateAction<HabitCompletedType[]>) => void
}

const Stack = createNativeStackNavigator();

export default function App() {
  const testDataHabits: Habit[] = [
    {
      id: 1,
      name: "Exercise",
      description: "20 minutes of movement",
      category: "Activity",
      occurence: ["Monday", "Wednesday", "Friday"],
      completed: false,
    },
    { 
      id: 2, 
      name: "Read", 
      description: "minimum 3 pages", 
      category: "Education",
      occurence: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      completed: false 
    },
    {
      id: 3,
      name: "Meditate",
      description: "minimum 5 minutes",
      category: "Relaxation",
      occurence: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      completed: false,
    },
  ]
  const [habits, setHabits]: [Habit[], HabitListSetter] = useState(testDataHabits);

  const blankCompletionData:HabitCompletedType[] = []

  const [habitCompletionData, setHabitCompletionData] = useState(blankCompletionData)

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName="SignUp/SignIn"
          screenOptions={{ header: NavHeader }}
        >
          <Stack.Screen
            name="SignUp/SignIn"
            options={{ title: "SignUp/SignIn", headerShown: false }}
          >
            {(props) => <SignUpPage />}
          </Stack.Screen>

          {
            <Stack.Screen
              name="Home"
              options={{
                title: "Home",
                gestureEnabled: false,
              }}
            >
              {(props) => <HomeScreen habits={habits} setHabits={setHabits} habitCompletionData = {habitCompletionData} setHabitCompletionData = {setHabitCompletionData} />}
            </Stack.Screen>
          }
          {
            <Stack.Screen
              name="Calendar"
              options={{
                title: "Calendar",
                gestureEnabled: false,
              }}
            >
              {(props) => <CalendarHabitScreen habitCompletionData = {habitCompletionData} />}
            </Stack.Screen>
          }
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
