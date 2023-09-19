import {PaperProvider} from 'react-native-paper'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavHeader from './components/NavHeader';
// import TestScreenA from './screens/TestScreenA';
// import TestScreenB from './screens/TestScreenB';
// import TestScreenC from './screens/TestScreenC';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="" screenOptions={{header: NavHeader}}> 
        {/*initialRouteName=firstPage probably login or home, must match name in stack.screen definition*/}
          
          {/* <Stack.Screen name="TestScreenA" options={{title: "THIS IS TestScreenA"}}>
            {(props) => <TestScreenA/>}
          </Stack.Screen> */}
          {/*name is used by navigation buttons, title appears in the header, child funcion is the screen element*/}

          {/* <Stack.Screen name="TestScreenB" options={{title: "THIS IS TestScreenB"}}>
          {(props) => <TestScreenB/>}
          </Stack.Screen> */}

          {/* <Stack.Screen name="TestScreenC" options={{title: "THIS IS TestScreenC"}}>
          {(props) => <TestScreenC/>}
          </Stack.Screen> */}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
