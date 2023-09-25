import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { User, postSignUp } from "../requests/Requests";
import { hashPassword } from "../utils/hashPassword";
import { Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface SignUpFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
}

function SignupForm({ setIsLoggedIn, setCurrentUser }: SignUpFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSignup = async () => {
    setIsLoggedIn(true);
    setCurrentUser(username);
    // postSignUp(username, email, await hashPassword(password))
    //   .then(() => {
    //     setIsLoggedIn(true);
    //     setCurrentUser(username);
    //     setError(false);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     setIsLoggedIn(false);
    //     setError(true);
    //   });
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

      {error && (
        <Text style={{ color: "red" }}>
          The username you've entered already exists
        </Text>
      )}

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

      <Button
        mode="contained"
        onPress={handleSignup}
        buttonColor="#90a955"
        textColor="white"
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 2,
    color: "#E5DCC5",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
    padding: 15,
    marginBottom: 8,
    backgroundColor: "#D9D9D9",
  },
});

export default SignupForm;
