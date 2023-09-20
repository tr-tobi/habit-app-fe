import { SetStateAction } from 'react';
import { Drawer, Portal, Modal, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface NavProps {
    options: any
    showNav: boolean,
    setShowNav: (value: SetStateAction<boolean>) => void
}

export default function NavDrawer({options, showNav, setShowNav}: NavProps) {
    const navigation:any = useNavigation()
    const title = options.title

    const styles = StyleSheet.create({
        drawerContent: {backgroundColor: "#ffffff", width: "66%", height: "100%", justifyContent: "flex-start"},
        drawerContainer: {justifyContent: "flex-end", alignItems: "flex-start"},
        drawerTitle: {fontSize: 22, marginLeft: 16, marginTop: 16},
        drawerItem: {width:"100%", marginRight:10}
    })

    function goToScreen(screen: string) {
        setShowNav(false)
        navigation.navigate(screen)
    }
    
    return (
        <Portal>
        <Modal visible={showNav} onDismiss={() => setShowNav(false)} contentContainerStyle={styles.drawerContent} style={styles.drawerContainer}>
        <Text style={styles.drawerTitle}>{title}</Text>
        {/* <Drawer.Item
            icon="home"
            label="TestScreenA"
            onTouchStart={() => {goToScreen("TestScreenA")}}
            style={styles.drawerItem}
        />
        <Drawer.Item
            icon="file"
            label="TestScreenB"
            onTouchStart={() => {goToScreen("TestScreenB")}}
            style={styles.drawerItem}
        /> */}
        {/*Pass screen name that was set in app.tsx to goToScreen to navigate there*/}
        </Modal>
      </Portal>
    )
}