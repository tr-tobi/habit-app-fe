// SignupForm.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

interface SignupFormProps {
  onSignup: (username: string, email: string, password: string) => void;
  checkUniqueUsername: (username: string) => boolean;
}

function SignupForm({ onSignup, checkUniqueUsername }: SignupFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    const isUnique = checkUniqueUsername(username);

    if (!isUnique) {
      Alert.alert("Username is not unique", "Please choose a different username.");
      return;
    }
    // Replace 'https://your-backend-url.com/signup' with backend URL
    axios
      .post("https://your-backend-url.com/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log("Signup successful:", response.data);
        onSignup(username, email, password); 
      })
      .catch((error) => {
        console.error("Error signing up:", error);
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

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button title="Sign Up" onPress={handleSignup} />
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

export default SignupForm;
