import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SignupForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { useNavigation } from "@react-navigation/native";

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
    <View style={styles.container}>
      <Header title="Habit Tracker!" />
      <Text>Create an Account!</Text>
      <SignupForm
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
      />
      <Text>Sign In!</Text>
      <SignInForm
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
