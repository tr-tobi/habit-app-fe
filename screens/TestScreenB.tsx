import { SetStateAction } from 'react';
import { View, Text, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function TestScreenB() {
    const navigation:any = useNavigation()

    function goToScreen(screen: string) {
        navigation.navigate(screen)
    }

    return (
        <View>
            <Text>This is Test Screen B</Text>
            <Text>This is for demonstration purposes</Text>
            <Text>Delete when no longer required</Text>
            <Button title="TestScreenC" onPress={() => {goToScreen("TestScreenC")}}/>
        </View>
    )
}