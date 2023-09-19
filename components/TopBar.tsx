import { SetStateAction } from 'react';
import { Appbar } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

interface TopBarProps {
    setShowNav: (value: SetStateAction<boolean>) => void,
    options: any
}

export default function TopBar({setShowNav, options}: TopBarProps) {
    const title = options.title

    return (
        <Appbar.Header>
            <Appbar.Content title={title} />
        <Appbar.Action icon="menu" onPress={() => setShowNav((curVal) => {return !curVal})} />
        </Appbar.Header>
    )
}