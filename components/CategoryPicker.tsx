import DropDownPicker from 'react-native-dropdown-picker';
import { useState, SetStateAction, Dispatch } from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from "react-native";
import DeleteCategoryDialog from './DeleteCategoryDialog';
import CreateCategoryDialog from './CreateCategoryDialog';

const styles = StyleSheet.create({
    green: {
        color: "green", 
        fontSize: 19
    },
    red: {
        color: "red", 
        fontSize: 19
    }
})

interface CategoryPickerProps {
    selectValue: string,
    setSelectValue: Dispatch<SetStateAction<string>>
}

export default function CategoryPicker({selectValue, setSelectValue}: CategoryPickerProps) {
    const [errorText, setErrorText] = useState("")
    const errorStates = {errorText, setErrorText}
    const [selectOpen, setSelectOpen] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [createVisible, setCreateVisible] = useState(false)
    
    const closeDelete = () => {setDeleteVisible(false)}
    const deletePressed = () => {setDeleteVisible(true)}

    const closeCreate = () => {setCreateVisible(false)}
    const createPressed = () => {setCreateVisible(true)}

    function deleteCategory() {
        // do API stuff here
        setCategories(categories.filter((category => category.value !== selectValue)))
        setSelectValue("")
    }

    function createCategory(value: string) {
        if (value.trim().length < 3) {
            setErrorText("Name too short")
            return false
        }
        value = value.trim()

        // do API stuff here
        setCategories(currState => {
            currState.push({label: value, value: value})
            return currState
        })
        setSelectValue(value)
        return true
    }

    const [categories, setCategories] = useState([
        {label: "Create a category", value: ''},
        {label: 'Activity', value: 'Activity'},
        {label: 'Education', value: 'Education'},
        {label: 'Relaxation', value: 'Relaxation'},
    ]);

    return (
        <>
            <View style={{flexDirection: "row", maxWidth: "80%", minWidth: "80%", justifyContent: "space-between", marginTop: 20}}>
                <View style={{maxWidth: "70%"}}>
                <DropDownPicker 
                    open={selectOpen} setOpen={setSelectOpen} 
                    value={selectValue} setValue={setSelectValue} 
                    items={categories} setItems={setCategories}
                />
                </View>
                {
                    selectValue === "" ? 
                        <Button mode="elevated" onPress={createPressed} 
                            labelStyle={styles.green} 
                            style={{justifyContent: "center"}}
                        >+</Button> 
                        :
                        <Button mode="elevated" onPress={deletePressed} 
                            labelStyle={styles.red} 
                            style={{justifyContent: "center"}}
                        >-</Button>
                }
            </View>
            <DeleteCategoryDialog visible={deleteVisible} hideDialog={closeDelete} deleteCategory={deleteCategory}/>
            <CreateCategoryDialog visible={createVisible} hideDialog={closeCreate} createCategory={createCategory} errorStates={errorStates}/>
        </>
    )
}