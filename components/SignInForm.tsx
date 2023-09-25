import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { hashPassword } from "../utils/hashPassword";
import { postSignIn } from "../requests/Requests";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface SignInFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
}

function SignInForm({ setIsLoggedIn, setCurrentUser }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    postSignIn(username, await hashPassword(password))
      .then(() => {
        setIsLoggedIn(true);
        setCurrentUser(username);
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  };

  return (
    // <KeyboardAwareScrollView
    //   style={{ flex: 1 }}
    //   contentContainerStyle={styles.container}
    //   onKeyboardWillShow={(frames: Object) => {
    //     console.log("Keyboard event", frames);
    // //   }}
    // >
      <View style={styles.container}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter your username"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />

        <Button
          mode="contained"
          onPress={handleSignIn}
          buttonColor="#90a955"
          textColor="white"
        >
          Sign In
        </Button>
      </View>
    // </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "#E5DCC5",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
  },
});

export default SignInForm;
