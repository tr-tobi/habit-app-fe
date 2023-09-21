import DropDownPicker from 'react-native-dropdown-picker';
import { useState, SetStateAction, Dispatch } from 'react';

interface CategoryPickerProps {
    selectValue: string,
    setSelectValue: Dispatch<SetStateAction<string>>
}

export default function CategoryPicker({selectValue, setSelectValue}: CategoryPickerProps) {
    const [selectOpen, setSelectOpen] = useState(false);
    
    const [categories, setCategories] = useState([
        {label: "Select a category", value: ''},
        {label: 'Activity', value: 'Activity'},
        {label: 'Education', value: 'Education'},
        {label: 'Relaxation', value: 'Relaxation'},
    ]);

    return (
        <DropDownPicker 
                    open={selectOpen} setOpen={setSelectOpen} 
                    value={selectValue} setValue={setSelectValue} 
                    items={categories} setItems={setCategories}
                    style={{marginTop: 20, maxWidth: "80%", alignSelf: "center"}}
                />
    )
}