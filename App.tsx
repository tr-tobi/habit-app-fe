import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Notes from './components/Notes';
import HabitsList from './components/HabitsList';

export default function App() {
  return (
    
    <View style={styles.container}>
      <Header title="Habit Tracker!"/> 
      <Notes body = {""}/>
      <HabitsList/>

    </View>
   
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
