import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Headerprop {
  title: string;
}

function Header({ title }: Headerprop) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.slogan}>Where habits are conquered</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontColor: "#393E41",
    width: "100%",
    padding: 85,
    paddingBottom: 110,
    paddingTop: 120,
  },
  title: {
    textAlign: "center",
    color: "#393E41",
    fontSize: 55,
    fontWeight: "bold",
  },
  slogan: {
    textAlign: "center",
    color: "#393E41",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Header;
