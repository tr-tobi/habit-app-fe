import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import SignupForm from "./components/SignUpForm";

export default function App() {
  const handleSignup = (username: string, email: string, password: string) => {
    console.log("Signing up with:", username, email, password);
  };

  const checkUniqueUsername = (username: string) => {
    return true;
  };
  return (
    <View style={styles.container}>
      <Header title="Habit Tracker!" />
      <SignupForm
        onSignup={handleSignup}
        checkUniqueUsername={checkUniqueUsername}
      />
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
