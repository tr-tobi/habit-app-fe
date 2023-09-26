import React from "react";
import { View, StyleSheet, Image } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Image
        source={require('../habitual__2_-removebg-preview.png')}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
    padding: 100,
    paddingBottom:1,
  },
  image: {
    width: 300, 
    height: 300,
  },
});

export default Header;
