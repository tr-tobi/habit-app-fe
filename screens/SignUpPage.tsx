import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SignupForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUpPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const navigation: any = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Signing in with:", currentUser);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLoggedIn, currentUser]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      onKeyboardWillShow={(frames: Object) => {
        console.log("Keyboard event", frames);
      }}
    >
      <View style={styles.container}>
        <Header title="Habitual!" />
        <Text style={styles.text}>Create an Account!</Text>
        <SignupForm
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
        <Text style={styles.text}>Sign In!</Text>
        <SignInForm
          setIsLoggedIn={setIsLoggedIn}
          setCurrentUser={setCurrentUser}
        />
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A7DA0",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#E5DCC5",
    fontSize: 20,
    padding: 0.5,
  },
});
