import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import SignupForm from "./components/SignUpForm";
import SignInForm from "./components/SignInForm";

export default function App() {
  const handleSignup = (username: string, email: string, password: string) => {
    console.log("Signing up with:", username, email, password);
  };

  const handleSignIn = (username: string) => {
    console.log("Signing in with:", username);
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
      <SignInForm onSignIn={handleSignIn} />
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
