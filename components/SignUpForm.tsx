import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { User, postSignUp } from "../requests/Requests";
import { hashPassword } from "../utils/hashPassword";

interface SignUpFormProps {
  setIsLoggedIn: (value: boolean) => void;
  setCurrentUser: (value: string) => void;
}

function SignupForm({ setIsLoggedIn, setCurrentUser }: SignUpFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>();
  const isDuplicateUserName = users?.some((user) => user.username === username);
  const isDuplicateEmail = users?.some((user) => user.email === email);

  const handleSignup = async () => {
    setIsLoggedIn(true);
    setCurrentUser(username)
    // postSignUp(username, email, await hashPassword(password))
    //   .then(() => {
    //     setIsLoggedIn(true);
    //     setCurrentUser(username);
    //   })
    //   .catch((error: any) => {
    //     console.log(error);
    //     setIsLoggedIn(false);
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
      {isDuplicateUserName && (
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

      {isDuplicateEmail && (
        <Text style={{ color: "red" }}>
          The email you've entered already exists
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
