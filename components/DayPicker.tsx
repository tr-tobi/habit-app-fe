import { SetStateAction } from 'react';
import { View, StyleSheet } from "react-native";
import { SegmentedButtons } from 'react-native-paper'

const styles = StyleSheet.create({
    dayButton: {
        alignItems: 'center', minWidth: "25%", paddingHorizontal: 0, borderRadius: 0
    },
    margin: {
        marginTop: 20
    }
});

interface DayPickerProps {
    daysValue: string[],
    setDaysValue: (value: SetStateAction<string[]>) => void
}

export default function DayPicker({daysValue, setDaysValue}: DayPickerProps) {
    return (
        <View style={{alignItems: 'center', maxWidth: "80%"}}>
            <SegmentedButtons
                multiSelect
                value={daysValue}
                onValueChange={setDaysValue}
                buttons={[
                    { value: 'Monday', label: 'M', style: styles.dayButton},
                    { value: 'Tuesday', label: 'T', style: styles.dayButton},
                    { value: 'Wednesday', label: 'W', style: styles.dayButton},
                    { value: 'Thursday', label: 'T', style: styles.dayButton},
                ]}
                style={styles.margin}
            />
            <SegmentedButtons
                multiSelect
                value={daysValue}
                onValueChange={setDaysValue}
                buttons={[
                    { value: 'Friday', label: 'F', style: styles.dayButton},
                    { value: 'Saturday', label: 'S', style: styles.dayButton},
                    { value: 'Sunday', label: 'S', style: styles.dayButton}
                ]}
            />
        </View>
    )
}