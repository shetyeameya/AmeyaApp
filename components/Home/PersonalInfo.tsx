import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { useThemeColor, View } from "../Themed";
import React from "react";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../../constants/Colors";
import CustomText from "../StyledText";
const PersonalInfo = () => {
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );

  const staticImage = require("../../assets/imagesAssets/ameyachristmas2.png");
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View style={[styles.container, { backgroundColor: tintColor }]}>
        {/* Image of the boy */}
        <View
          style={{
            flex: 0.4,
            backgroundColor: tintColor,
          }}
        >
          <Image source={staticImage} style={styles.boyImage} />
        </View>
        {/* Text Alert View */}
        <View style={[styles.alertBox, { backgroundColor: tintColor }]}>
          <CustomText size={18} style={styles.alertTitle}>
            Ameya Ravindra Shetye
          </CustomText>
          <CustomText size={16} style={styles.alertTitle}>
            Application Developer
          </CustomText>
        </View>
      </View>
      <View>
        <CustomText size={18} style={styles.alertTitle}>
          Summary:
        </CustomText>
        <CustomText size={13} style={styles.alertTitle}>
          Driven Engineer holding a Master's degree with 8 years of development
          experience, with in-depth expertise in React, React Native, and
          MongoDB, PostgreSQL. I have a proven track record in building
          performant, scalable, and maintainable web and mobile applications. I
          possess a strong foundation in the Software Development Life Cycle,
          with specialized skills in state management, server-side rendering,
          component lifecycle, hooks, virtual DOM, and integration with MongoDB.
          Adapts quickly in Agile and SCRUM environments. Renowned for strong
          problem-solving, organizational, communication, and planning
          capabilities, complemented by a collaborative team spirit.
        </CustomText>
      </View>
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
    maxHeight: 180,
    minHeight: 130,
    marginTop: 60,
    marginBottom: 20,
  },
  boyImage: {
    position: "absolute",
    left: 0,
    top: -120,
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  alertBox: {
    flex: 0.6,
    borderRadius: 10,
    padding: 20,
  },
  alertTitle: {
    fontWeight: "bold",
  },
  alertDescription: {
    marginTop: 10,
  },
});
