import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { User, getUsers } from "../requests/Requests";
import { hashPassword } from "../utils/hashPassword";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>();
  const isDuplicateUserName = users?.some((user) => user.username === username);
  const isDuplicateEmail = users?.some((user) => user.email === email);

  useEffect(() => {
    const res = getUsers();
    setUsers(res);
  }, []);

  const handleSignup = async () => {
    console.log({ username, email, password: await hashPassword(password) });
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
