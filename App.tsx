import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Notes from './components/Notes';
import HabitsList from './components/HabitsList';
import { useState } from 'react';

export default function App() {
const [habits, setHabits] = useState([
  { id: 1, name: 'Exercise', description: '20 minutes of movement', completed: false },
  { id: 2, name: 'Read', description: 'minimum 3 pages', completed: false },
  { id: 3, name: 'Meditate', description: 'minimum 5 minutes', completed: false }]
)

  return (
    
    <View style={styles.container}>
      <Header title="Habit Tracker!"/> 
      <Notes body = {""}/>
      <HabitsList habits={habits} setHabits={setHabits}/>

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
