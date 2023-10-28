import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Image,
  Platform,
  Keyboard,
  Button,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import CustomText from "../StyledText";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../../constants/Colors";
import { useThemeColor } from "../../components/Themed";
import CustomInputText from "../../Reusable/StyledInput";
import { useRouter } from "expo-router";
import {
  useAuthPopupDispatch,
  useAuthPopupState,
} from "../../Context/loginSingContext";

const staticImage = require("../../assets/imagesAssets/Ameya_logo_2.png");
const Login = () => {
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });
  const bgColor = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const bgreverseColor = useThemeColor(
    { light: datkbackgroundColor, dark: lightbackgroundColor },
    "background"
  );
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  const router = useRouter();
  const authDispatch = useAuthPopupDispatch();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: tintColor }]}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 0.5,
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              display: "flex",
              backgroundColor: tintColor,
              borderRadius: 20,
            }}
          >
            <Image source={staticImage} style={styles.ImageBackground} />
          </View>

          <View style={[styles.loginContainer]}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{ email: "", password: "", firstName: "" }}
              onSubmit={(values) => {
                authDispatch({
                  type: "POST_LOGIN_SUCCESS",
                  args: {
                    signupVisible: false,
                    loginVisible: false,
                    isLoggedIn: true,
                    jwtToken: `logedin+${values.email}`,
                    Email: values.email,
                    FirstName: values.firstName,
                  },
                });
                router.push("/(tabs)/home");
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
                  <CustomInputText
                    placeholder="First Name"
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                  />
                  {errors.email && (
                    <CustomText
                      size={12}
                      style={{ width: "100%", textAlign: "left", color: "red" }}
                    >
                      {errors.email}
                    </CustomText>
                  )}
                  <CustomInputText
                    // name="email"
                    placeholder="Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                  {errors.email && (
                    <CustomText
                      size={12}
                      style={{ width: "100%", textAlign: "left", color: "red" }}
                    >
                      {errors.email}
                    </CustomText>
                  )}
                  <CustomInputText
                    // name="password"
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {errors.password && (
                    <CustomText
                      size={12}
                      style={{ width: "100%", textAlign: "left", color: "red" }}
                    >
                      {errors.password}
                    </CustomText>
                  )}
                  <Pressable
                    style={{
                      padding: 10,
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      display: "flex",
                      marginTop: 30,
                      borderRadius: 10,
                      borderWidth: 4,
                      backgroundColor: tintColor,
                      zIndex: 9,
                      elevation: 9,
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    <CustomText>Login</CustomText>
                  </Pressable>
                </>
              )}
            </Formik>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flex: 1,
    width: "90%",
    alignItems: "center",
    padding: 20,
    elevation: 10,
    alignSelf: "center",
    borderRadius: 15,
  },
  ImageBackground: {
    resizeMode: "contain",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
