import { useState, SetStateAction, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Portal, Modal, Text } from 'react-native-paper'
import DayPicker from "./DayPicker";
import CategoryPicker from "./CategoryPicker";
import ErrorBar from "./ErrorBar";
import { Habit, HabitChanges } from "../types";

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
    habit: Habit,
    editHabit: (newHabit: HabitChanges) => void
}

export default function EditHabitModal({visible, onClose, habit, editHabit}: NewHabitProps) {
    const [habitName, setHabitName] = useState("")
    const [selectValue, setSelectValue] = useState("");
    const [daysValue, setDaysValue] = useState(new Array);
    const [habitDesc, setHabitDesc] = useState("")
    const [errorText, setErrorText] = useState("")

    useEffect(() => {
        setHabitName(habit.name)
        setSelectValue(habit.category)
        setDaysValue(habit.occurence)
        setHabitDesc(habit.description)
    }, [habit])

    function submitChanges() {
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
        
        const newHabit = {
            name: habitName.trim(),
            description: habitDesc.trim(),
            category: selectValue,
            occurence: sortedDays,
        }   

        editHabit(newHabit)

        handleDismiss()
    }

    function handleDismiss() {
        onClose()
    }

    return (
        <Portal>
        <Modal visible={visible} onDismiss={handleDismiss} style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
            <View style={styles.container}>
                <Text style={{fontSize: 24}}>Edit Habit</Text>
                
                <TextInput label="Habit" value={habitName} onChangeText={(text) => setHabitName(text)} style={{minWidth: "80%", marginTop: 20}}/>
                
                <CategoryPicker selectValue={selectValue} setSelectValue={setSelectValue}/>

                <DayPicker daysValue={daysValue} setDaysValue={setDaysValue}/>

                <TextInput label="Description" multiline={true} value={habitDesc} onChangeText={(text) => setHabitDesc(text)} style={styles.multilineTextInput} contentStyle={{height: "100%"}}/>

                <Button icon="note-edit-outline" mode="contained" onPress={submitChanges} style={styles.margin}>
                    Submit Changes
                </Button>
            </View>
        </Modal>
        <ErrorBar errorText={errorText} setErrorText={setErrorText}/>
        </Portal>
    )
}