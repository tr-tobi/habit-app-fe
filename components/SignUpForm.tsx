import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { User, postSignUp } from "../requests/Requests";
import { hashPassword } from "../utils/hashPassword";
import { Button } from "react-native-paper";

interface SignUpFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
}

function SignupForm({ setIsLoggedIn, setCurrentUser }: SignUpFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setEmailValid] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailValid(true);
  };

  const handleSignup = async () => {
    setError(null);

    if (username.length < 6) {
      setError("Must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(username)) {
      setError("Must contain at least one capital letter.");
      return;
    }

    if (!/\d/.test(username)) {
      setError("Must contain at least one number.");
      return;
    }

    if (!isValidEmail(email)) {
      setEmailValid(false);
      return;
    }

    postSignUp(username, email, await hashPassword(password))
      .then(() => {
        setIsLoggedIn(true);
        setCurrentUser(username);
      })
      .catch((error: any) => {
        console.log(error);
        setIsLoggedIn(false);
        setError(error.message);
      });
  };

  return (
    <View style={styles.SUcontainer}>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Enter your username"
      />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleEmailChange}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {!isEmailValid && (
        <Text style={{ color: "red" }}>
          Please enter a valid email address.
        </Text>
      )}

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Button style={styles.button} mode="contained" onPress={handleSignup}>
        <Text style={{ color: "white" }}>Sign Up!</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  SUcontainer: {
    padding: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 2,
    color: "Black",
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
  },
});

export default SignupForm;
