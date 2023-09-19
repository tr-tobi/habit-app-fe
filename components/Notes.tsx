import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native"
import {TextInput} from "react-native-paper"

interface Notesprop {
    body: any
}

function Notes ({body}: Notesprop) {
    const [notes, setNotes] = useState("")

    return (

            <TextInput
            style={styles.text}
            multiline={true}
            label={"Notes"}
            value={notes}
            onChangeText= {notes => setNotes(notes)}
            />
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: "justify",
        outerHeight: 12
    }
})

export default Notes;

