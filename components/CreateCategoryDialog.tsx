import { useState, Dispatch, SetStateAction } from 'react';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import ErrorBar from './ErrorBar';

interface CreateCategoryProps {
    visible: boolean
    hideDialog: () => void
    createCategory: (value: string) => boolean
    errorStates: {errorText: string, setErrorText: Dispatch<SetStateAction<string>>}
}

export default function CreateCategoryDialog({visible, hideDialog, createCategory, errorStates}: CreateCategoryProps) {
    const {errorText, setErrorText} = errorStates
    const [value, setValue] = useState("")
  
    function handleCreate() {
        if (createCategory(value)) {
          clearDialog()
        }
    }

    function clearDialog() {
      hideDialog()
      setValue("")
    }
    
    return (
        <Portal>
          <Dialog visible={visible} onDismiss={clearDialog}>
            <Dialog.Title>Create Category</Dialog.Title>
            <Dialog.Content>
              <TextInput label="category" value={value} onChangeText={text => setValue(text)}/>
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={clearDialog}>Cancel</Button>
              <Button onPress={handleCreate}>Create</Button>
            </Dialog.Actions>
          </Dialog>
          <ErrorBar errorText={errorText} setErrorText={setErrorText}/>
        </Portal>
    )
}