import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { useState, SetStateAction, Dispatch } from 'react';

interface CategoryPickerProps {
    selectValue: number,
    setSelectValue: Dispatch<SetStateAction<number>>
}

export default function CategoryPicker({selectValue, setSelectValue}: CategoryPickerProps) {
    const [selectOpen, setSelectOpen] = useState(false);
    
    const [categories, setCategories] = useState([
        {label: "Select a category", value: 0},
        {label: 'Category 1', value: 1},
        {label: 'Category 2', value: 2},
        {label: 'Category 3', value: 3},
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