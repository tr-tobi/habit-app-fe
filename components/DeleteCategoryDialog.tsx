import { Button, Dialog, Portal } from 'react-native-paper';

interface DeleteCategoryProps {
    visible: boolean
    hideDialog: () => void
    deleteCategory: () => void
}

export default function DeleteCategoryDialog({visible, hideDialog, deleteCategory}: DeleteCategoryProps) {
    function handleDelete() {
        deleteCategory()
        hideDialog()
    }
    
    return (
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Delete Category</Dialog.Title>
            <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={handleDelete}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    )
}