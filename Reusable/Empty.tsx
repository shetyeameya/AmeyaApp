import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import CustomText from "../components/StyledText";
import { View } from "../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColor } from "../components/Themed";
import { tintColorLight, tintColorDark } from "../constants/Colors";

const Empty = () => {
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  return (
    <View
      style={{
        flex: 1,
        minHeight: Dimensions.get("screen").height / 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AntDesign name="exception1" size={84} color={tintColor} />
      <CustomText>Did not match any record!</CustomText>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({});
