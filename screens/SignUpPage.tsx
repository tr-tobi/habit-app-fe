import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";
import SignupForm from "../components/SignUpForm";
import SignInForm from "../components/SignInForm";
import { useNavigate } from 'react-router-native'

export default function SignUpPage() {
  const navigate = useNavigate()

  const handleSignup = (username: string) => {
    console.log("Signing up with:", username);
  };

  const handleSignIn = (username: string) => {
    console.log("Signing in with:", username);
  };

  const checkUniqueUsername = (username: string) => {
    return true;
  };
  return (
    <View style={styles.container}>
      <Header title="Habit Tracker!" />
      <Text>Create an Account!</Text>
      <SignupForm
        onSignup={handleSignup}
        checkUniqueUsername={checkUniqueUsername}
      />
      <Text>Sign In!</Text>
      <SignInForm onSignIn={handleSignIn} />
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
