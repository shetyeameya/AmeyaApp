import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useThemeColor, View } from "../components/Themed";
import {
  blackcontrast,
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../constants/Colors";
import React, { useState } from "react";
import {
  workExperience,
  skillsList,
  educationList,
  certificationsList,
} from "../fakeData/ExperienceData";
import CustomText from "../components/StyledText";
import { AntDesign } from "@expo/vector-icons";
import { PokTypeList } from "../types/types";
interface Props {
  data: any;
}

const TypeDefine: React.FC<Props> = ({ data }) => {
  const color = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const bgColor = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  const getColorByType = (typeName: any) => {
    const typeObj = PokTypeList.find(
      (pokType: any) => pokType.type === typeName
    );
    return typeObj ? typeObj.color : null;
  };
  const result = data.length === 1 ? data : data.slice(0, 2);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: result.length === 1 ? "center" : "space-evenly",
        alignItems: "center",
        width: "100%",
        padding: "4%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}
    >
      {result &&
        result.map((val: any) => {
          return (
            <View
              key={val.type.name}
              style={{
                minWidth: 150,
                borderRadius: 20,
                borderWidth: 4,
                borderColor: getColorByType(val.type.name),
                backgroundColor: blackcontrast,
                //   "rgba(255, 255, 255, 0.5)",
                padding: "4%",
              }}
            >
              <CustomText
                size={12}
                style={{
                  textAlign: "center",
                  textTransform: "uppercase",
                  color: getColorByType(val.type.name),
                }}
              >
                {val.type.name}
              </CustomText>
            </View>
          );
        })}
    </View>
  );
};

export default TypeDefine;

const styles = StyleSheet.create({});
