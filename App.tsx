import { PaperProvider } from "react-native-paper";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavHeader from "./components/NavHeader";
import HomeScreen from "./screens/HomeScreen";
import SignUpPage from "./screens/SignUpPage";
import CalendarHabitScreen from "./screens/CalendarHabitScreen";
// import TestScreenA from './screens/TestScreenA';
// import TestScreenB from "./screens/TestScreenB";
// import TestScreenC from './screens/TestScreenC';

const Stack = createNativeStackNavigator();

export default function App() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Exercise",
      description: "20 minutes of movement",
      completed: false,
    },
    { id: 2, name: "Read", description: "minimum 3 pages", completed: false },
    {
      id: 3,
      name: "Meditate",
      description: "minimum 5 minutes",
      completed: false,
    },
  ]);

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator
          initialRouteName=""
          screenOptions={{ header: NavHeader }}
        >
          {/*initialRouteName=firstPage probably login or home, must match name in stack.screen definition*/}

          <Stack.Screen
            name="SignUp/SignIn"
            options={{ title: "SignUp/SignIn" }}
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
              {(props) => <HomeScreen habits={habits} setHabits={setHabits} />}
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
              {(props) => <CalendarHabitScreen />}
            </Stack.Screen>
          }

          {/*name is used by navigation buttons, title appears in the header, child funcion is the screen element*/}

          {/* <Stack.Screen
            name="TestScreenB"
            options={{ title: "THIS IS TestScreenB" , gestureEnabled: false}}
          >
            {(props) => <TestScreenB />}
          </Stack.Screen> */}

          {/* <Stack.Screen name="TestScreenC" options={{title: "THIS IS TestScreenC"}}>
          {(props) => <TestScreenC/>}
          </Stack.Screen> */}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
