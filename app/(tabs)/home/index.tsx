import { StyleSheet, ScrollView } from "react-native";
import { Text, View } from "../../../components/Themed";
import Home from "../../../components/Home/Home";
import { useThemeColor } from "../../../components/Themed";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../../../constants/Colors";
import CustomText, { MonoText } from "../../../components/StyledText";
import {
  useAuthPopupDispatch,
  useAuthPopupState,
} from "../../../Context/loginSingContext";
import React from "react";
export default function TabOneScreen() {
  const { Email, FirstName } = useAuthPopupState();
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  return (
    <ScrollView>
      <View style={styles.container}>
        <CustomText
          fontFamily={"TiltNeon"}
          size={15}
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          Hello {FirstName}, this is just an demo app for my resume. Please let
          me know if there could be any improvement made here.
        </CustomText>

        <Home />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "2%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
