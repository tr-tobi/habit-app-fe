import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { postSignIn } from "../requests/Requests";

interface SignInFormProps {
  onSignIn: (username: string) => void;
}

function SignInForm({ onSignIn }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    postSignIn(username, password)
      .then((response) => {
        if (response.data.success) {
          onSignIn(username);
        } else {
          Alert.alert(
            "Invalid credentials",
            "Please check your username and password."
          );
        }
      })
      .catch((error) => {
        console.error("Error signing in:", error);
      });
  };

  return (
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

      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default SignInForm;
