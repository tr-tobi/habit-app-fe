import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Header, SignupForm, SignInForm } from "../components";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button as PaperButton } from "react-native-paper";
import { useUserContext } from "../contexts/UserContext";

export default function SignUpPage() {
  const { isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser } =
    useUserContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Signing in with:", currentUser);
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    }
  }, [isLoggedIn, currentUser]);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.SUFcontainer}
      onKeyboardWillShow={(frames: Object) => {
        console.log("Keyboard event", frames);
      }}
    >
      <Header />
      <View style={styles.SUFcontainer}>
        {!showSignUp ? (
          <>
            <SignInForm
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
            <PaperButton
              mode="elevated"
              onPress={toggleSignUp}
              style={styles.buttons}
            >
              <Text style={{ color: "white" }}>Create an account!</Text>
            </PaperButton>
          </>
        ) : (
          <>
            <SignupForm
              setIsLoggedIn={setIsLoggedIn}
              setCurrentUser={setCurrentUser}
            />
            <PaperButton
              mode="elevated"
              onPress={toggleSignUp}
              style={styles.buttons}
            >
              <Text style={{ color: "white" }}>Go back to Sign In</Text>
            </PaperButton>
          </>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  SUFcontainer: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    padding: 12,
  },
  text: {
    color: "black",
    fontSize: 20,
    padding: 0.5,
  },
  buttons: {
    backgroundColor: "black",
  },
});
