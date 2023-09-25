import React from "react";
import { View, Text, StyleSheet } from "react-native";


interface Headerprop {
  title: string;
}

function Header({ title }: Headerprop) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontColor: "#E5DCC5",
    width: "100%",
    padding: 15,
    backgroundColor: "#90a955",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default Header;
