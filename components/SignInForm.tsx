import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { hashPassword } from "../utils/hashPassword";
import { postSignIn } from "../requests/Requests";

interface SignInFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
}

function SignInForm({ setIsLoggedIn, setCurrentUser }: SignInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      postSignIn(username, await hashPassword(password));
      setIsLoggedIn(true);
      setCurrentUser(username);
    } catch (error) {
      console.log(error);
    }
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
