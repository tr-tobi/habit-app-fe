import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Portal, Modal, Text } from 'react-native-paper'
import DayPicker from "./DayPicker";
import CategoryPicker from "./CategoryPicker";
import ErrorBar from "./ErrorBar";
import { HabitListSetter } from "../types";

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center',
        justifyContent: "center",
        minWidth: "90%", maxHeight: "90%",
        backgroundColor: "white", 
    },
    multilineTextInput: {
        marginTop: 20, flex: 1, maxHeight: "30%", width: "80%", justifyContent: "flex-start"
    },
    margin: {
        marginTop: 20
    }
  });

interface NewHabitProps {
    visible: boolean,
    onClose: () => void,
    setHabits: HabitListSetter
}

export default function NewHabitModal({visible, onClose, setHabits}: NewHabitProps) {
    const [habitName, setHabitName] = useState("")
    const [selectValue, setSelectValue] = useState("");
    const [daysValue, setDaysValue] = useState(new Array);
    const [habitDesc, setHabitDesc] = useState("")
    const [errorText, setErrorText] = useState("")

    function submitHabit() {
        if (habitName.trim().length < 3) {
            setErrorText("Name too short")
            return
        }
        if (!selectValue) {
            setErrorText("Select a category")
            return
        }
        if (!daysValue.length ) {
            setErrorText("Select at least one day")
            return
        }

        const dayOrder: {[index: string]: number} = {
            "Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, 
            "Friday": 4, "Saturday": 5, "Sunday": 6
        }
        const sortedDays = [...daysValue].sort((a: string, b:string) => dayOrder[a] - dayOrder[b])
        // Send in request
        console.log(sortedDays);
        
        
        // Do API post thing here and get the ID
        setHabits(prevState => {
            const newHabit = {
                id: prevState.length + 1,
                name: habitName.trim(),
                description: habitDesc.trim(),
                category: selectValue,
                occurence: sortedDays,
                completed: false
            }

            return [...prevState, newHabit]
        })

        handleDismiss()
    }

    function handleDismiss() {
        setHabitName("")
        setSelectValue("")
        setDaysValue(new Array)
        setHabitDesc("")
        onClose()
    }

    return (
        <Portal>
        <Modal visible={visible} onDismiss={handleDismiss} style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
            <View style={styles.container}>
                <Text style={{fontSize: 24}}>Create Habit</Text>
                
                <TextInput label="Habit" value={habitName} onChangeText={(text) => setHabitName(text)} style={{minWidth: "80%", marginTop: 20}}/>
                
                <CategoryPicker selectValue={selectValue} setSelectValue={setSelectValue}/>

                <DayPicker daysValue={daysValue} setDaysValue={setDaysValue}/>

                <TextInput label="Description" multiline={true} value={habitDesc} onChangeText={(text) => setHabitDesc(text)} style={styles.multilineTextInput} contentStyle={{height: "100%"}}/>

                <Button icon="note-edit-outline" mode="contained" onPress={submitHabit} style={styles.margin}>
                    Create Habit
                </Button>
            </View>
        </Modal>
        <ErrorBar errorText={errorText} setErrorText={setErrorText}/>
        </Portal>
    )
}