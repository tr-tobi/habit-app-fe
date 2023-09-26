import { View, StyleSheet } from "react-native";
import { TextInput, Button, Portal, Modal, Text } from 'react-native-paper'
import DayPicker from "./DayPicker";
import CategoryPicker from "./CategoryPicker";
import ErrorBar from "./ErrorBar";
import { Dispatch, SetStateAction } from "react";

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

interface HabitModalProps {
    visible: boolean
    labels: {title: string, button: string}
    handleDismiss: () => void
    formStates: {
        name: string, setName: Dispatch<SetStateAction<string>>, 
        category: string, setCategory: Dispatch<SetStateAction<string>>, 
        categories: {label: string, value: string}[],
        setCategories: Dispatch<SetStateAction<{label: string, value: string}[]>>,
        days: string[], setDays: Dispatch<SetStateAction<string[]>>, 
        description: string, setDescription: Dispatch<SetStateAction<string>>
    }
    submit: () => void
    errorStates: {errorText: string, setErrorText: Dispatch<SetStateAction<string>>}
}

export default function HabitModal({visible, labels, handleDismiss, formStates, submit, errorStates}: HabitModalProps) {
    const {name, setName, category, setCategory, categories, setCategories, days, setDays, description, setDescription} = formStates
    const {errorText, setErrorText} = errorStates

    function handleOnPress() {
        if (name.trim().length < 3) return setErrorText("Name too short")       
        
        if (!category) return setErrorText("Select a category")
        
        if (!days.length ) return setErrorText("Select at least one day")

        submit()
        handleDismiss()
    }

    return (
        <Portal>
        <Modal visible={visible} onDismiss={handleDismiss} style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>
            <View style={styles.container}>
                <Text style={{fontSize: 24}}>{labels.title}</Text>
                
                <TextInput label="Habit" value={name} onChangeText={(text) => setName(text)} style={{minWidth: "80%", marginTop: 20}}/>
                
                <CategoryPicker category={category} setCategory={setCategory} categories={categories} setCategories={setCategories}/>

                <DayPicker daysValue={days} setDaysValue={setDays}/>

                <TextInput label="Description" multiline={true} value={description} onChangeText={(text) => setDescription(text)} style={styles.multilineTextInput} contentStyle={{height: "100%"}}/>

                <Button icon="note-edit-outline" mode="contained" onPress={handleOnPress} style={styles.margin}>
                    {labels.button}
                </Button>
            </View>
        </Modal>
        <ErrorBar errorText={errorText} setErrorText={setErrorText}/>
        </Portal>
    )
}