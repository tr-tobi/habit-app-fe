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
    height: 60,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
  },
});

export default Header;
