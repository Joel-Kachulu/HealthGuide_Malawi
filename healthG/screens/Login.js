import React, { useCallback, useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES, images } from "../constants";
import { validateInput } from "../utils/actions/formActions";
import { reducer } from "../utils/reducers/formReducers";
import Input from "../components/Input";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? "example@gmail.com" : "",
    password: isTestMode ? "**********" : "",
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const Login = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formState, dispatchFormState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ inputId, validationResult: result, inputValue });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    try {
      setIsLoading(true);
      // Send login credentials to Flask server
      const response = await fetch('http://192.168.42.104:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.inputValues.email,
          password: formState.inputValues.password
        }),
      });
      
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
      
      // Handle successful login
      setIsLoading(false);
      Alert.alert("Login successful", "Successfully signed");
      navigation.navigate('Home');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred", error);
    }
  }, [error]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: COLORS.background, padding: 16 }}
      >
        <Image
          source={images.logo}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            marginLeft: -22,
            marginBottom: 6,
            borderRadius: 20,
          }}
        />
        <Text style={{ ...FONTS.h2, color: COLORS.white }}>Login</Text>
        <Text style={{ ...FONTS.body2, color: COLORS.gray }}>
          Login now to get timely notifications concerning your health.
        </Text>
        <View style={{ marginVertical: 22 }}>
          <Input
            id="email"
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["email"]}
            placeholder="Email Address"
            placeholderTextColor={COLORS.gray}
            keyboardType="email-address"
          />
          <Input
            onInputChanged={inputChangedHandler}
            errorText={formState.inputValidities["password"]}
            autoCapitalize="none"
            id="password"
            placeholder="Password"
            placeholderTextColor={COLORS.gray}
            secureTextEntry={true}
          />
          <Button
            title="LOGIN"
            onPress={authHandler}
            isLoading={isLoading}
            style={{
              width: SIZES.width - 32,
              marginVertical: 8,
            }}
          />
          <View
            style={styles.bottomContainer}>
            <Text style={{ ...FONTS.body3, color: COLORS.white }}>
              Don't have an account ? {" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ ...FONTS.h3, color: COLORS.white }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Image source={images.cover} resizeMode="contain" style={styles.cover} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2,
  },
  cover: {
    width: SIZES.width,
    position: "absolute",
    bottom: 0,
  },
});

export default Login;
