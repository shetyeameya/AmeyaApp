import { StyleSheet, Dimensions, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View, useThemeColor } from "../../components/Themed";
import CustomText from "../../components/StyledText";
import { useToastDispatch, useToastState } from "../../Context/ToastContext";
import {
  lightbackgroundColor,
  datkbackgroundColor,
  tintColorLight,
  tintColorDark,
  blackcontrast,
  ContrastWhite,
} from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";
import Empty from "../../Reusable/Empty";
import LoadingComponent from "../../Reusable/Loading";
import { renderValue, na } from "../../constants/CommonFunctions";
const screenWidth = Dimensions.get("window").width;

interface Props {
  data: any;
}

const AboutPokemon: React.FC<Props> = ({ data }) => {
  const { flavor_text_entries }: any = data.about;
  const filteredEntries = flavor_text_entries.filter(
    (entry: any) => entry.language.name === "en"
  );
  const uniqueTexts = new Set();
  const deduplicatedEntries = filteredEntries.filter((entry: any) => {
    const normalizedText = entry.flavor_text.replace(/\n/g, " ");
    if (uniqueTexts.has(normalizedText)) {
      return false;
    }
    uniqueTexts.add(normalizedText);
    return true;
  });

  // Combine texts
  const combinedText = deduplicatedEntries
    .map((entry: any) => entry.flavor_text.replace(/\n|\f/g, " ").trim())
    .join(" ")
    .replace(/\s+/g, " ");
  // console.log(
  //   "Filtered entries:::",
  //   JSON.stringify(filteredEntries, null, 2),
  //   combinedText
  // );
  const bgColor = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          width: Dimensions.get("screen").width,
          padding: "2%",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20%",
        }}
      >
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "3%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "2%",
              borderRadius: 15,
              backgroundColor: blackcontrast,
            }}
          >
            <MaterialIcons
              name="format-list-numbered"
              size={24}
              color={tintColor}
            />
            <CustomText style={{ color: ContrastWhite }} size={22}>
              {" "}
              - {data.id}
            </CustomText>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              padding: "2%",
              borderRadius: 15,
              backgroundColor: blackcontrast,
            }}
          >
            <SimpleLineIcons name="energy" size={24} color={tintColor} />
            <CustomText size={22} style={{ color: ContrastWhite }}>
              {" "}
              - {data.base_experience}
            </CustomText>
          </View>
        </View>

        {/* weight and height */}
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            backgroundColor: blackcontrast,
            borderRadius: 20,
            minHeight: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 0.495,
              backgroundColor: blackcontrast,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                backgroundColor: blackcontrast,
              }}
            >
              <FontAwesome5 name="weight-hanging" size={35} color={tintColor} />
              <CustomText size={22} style={{ color: ContrastWhite }}>
                {(data.weight * 0.1).toFixed(2)} KG
              </CustomText>
            </View>
            <CustomText size={13} style={{ color: ContrastWhite }}>
              Weight
            </CustomText>
          </View>
          <View
            style={{ flex: 0.01, backgroundColor: tintColor, height: "70%" }}
          ></View>
          <View
            style={{
              flex: 0.495,
              backgroundColor: blackcontrast,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "100%",
                backgroundColor: blackcontrast,
              }}
            >
              <FontAwesome5 name="ruler-vertical" size={35} color={tintColor} />
              <CustomText size={22} style={{ color: ContrastWhite }}>
                {(data.height * 0.1).toFixed(2)} M
              </CustomText>
            </View>
            <CustomText size={13} style={{ color: ContrastWhite }}>
              Height
            </CustomText>
          </View>
        </View>
        {/* intro  */}
        <View style={{ marginTop: "3%" }}>
          <CustomText size={12}>{combinedText}</CustomText>
        </View>
      </View>
    </View>
  );
};

export default AboutPokemon;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
  },
});
