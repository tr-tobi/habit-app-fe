import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { hashPassword } from "../utils/hashPassword";
import { postSignIn } from "../requests/Requests";
import { Button } from "react-native-paper";

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
    <View style={styles.SIcontainer}>
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

      <Button style={styles.button} mode="elevated" onPress={handleSignIn}>
        <Text style={{ color: "white" }}>Sign In!</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  SIcontainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    padding: 15,
    marginBottom: 8,
    backgroundColor: "#D9D9D9",
    width: 250,
  },
  button: {
    backgroundColor: "black",
    borderColor: "black",
  },
});

export default SignInForm;
