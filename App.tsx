import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import Notes from './components/Notes';

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="Habit Tracker!"/> 
      <Notes body = {""}/>
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
