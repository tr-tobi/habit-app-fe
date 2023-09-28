import { Button, Dialog, Portal, Text } from 'react-native-paper';

interface DeleteHabitProps {
    visible: boolean
    hideDialog: () => void
    deleteHabit: () => void
}

export default function DeleteHabitDialog({visible, hideDialog, deleteHabit}: DeleteHabitProps) {
    function handleDelete() {
      hideDialog()
      deleteHabit()
    }
    
    
    return (
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Delete Habit</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">All data about this habit will be lost</Text>
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleDelete}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    )
}