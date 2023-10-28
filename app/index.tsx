import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Link } from "expo-router";
import LoginPage from "../components/Login/Login";
import { Redirect } from "expo-router";
import { useAuthPopupState } from "../Context/loginSingContext";

const Login = () => {
  const { isLoggedIn } = useAuthPopupState();

  console.log("isLog", isLoggedIn);
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isLoggedIn ? <LoginPage /> : <Redirect href="/(tabs)/home" />}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
