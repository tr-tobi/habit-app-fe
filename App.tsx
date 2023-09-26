import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavHeader from "./components/NavHeader";
import { HomeScreen, SignUpPage, CalendarHabitScreen } from "./screens";
import { HabitsProvider } from "./contexts/Habits";
import { HabitCompletionProvider } from "./contexts/HabitCompletion";
import { UserProvider } from "./contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <PaperProvider>
        <HabitsProvider>
          <HabitCompletionProvider>
            <Stack.Navigator initialRouteName="SignUp/SignIn" screenOptions={{ header: NavHeader }}>

              <Stack.Screen name="SignUp/SignIn" options={{ title: "SignUp/SignIn", headerShown: false }}>
                {(props) => <SignUpPage />}
              </Stack.Screen>

              <Stack.Screen name="Home" options={{ title: "Home", gestureEnabled: false }}>
                {(props) => <HomeScreen/>}
              </Stack.Screen>
              
              <Stack.Screen name="Calendar" options={{ title: "Calendar", gestureEnabled: false }}>
                {(props) => <CalendarHabitScreen/>}
              </Stack.Screen>

            </Stack.Navigator>
          </HabitCompletionProvider>
        </HabitsProvider>
      </PaperProvider>
    </NavigationContainer>
    </UserProvider>
  );
}
