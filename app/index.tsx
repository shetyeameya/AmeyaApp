import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import LoginPage from "../components/Login/Login";
const Login = () => {
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Link href={"/(tabs)/home"} replace>
        Login
      </Link> */}
      <LoginPage />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
