import { StyleSheet, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { View } from "../components/Themed";
import CustomText from "../components/StyledText";
import { useThemeColor } from "../components/Themed";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  tintColorLight,
  tintColorDark,
  lightbackgroundColor,
  datkbackgroundColor,
} from "../constants/Colors";
import { PokTypeList } from "../types/types";
import { Link } from "expo-router";

interface Props {
  data: any;
}

const staticImage = require("../assets/imagesAssets/family.png");

const PokeCard: React.FC<Props> = ({ data }) => {
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

  return (
    <Link
      href={{
        pathname: "/(tabs)/pokemonGo/pokeModal",
        params: data,
      }}
      asChild
    >
      <Pressable style={{ width: "100%" }}>
        <View
          style={[
            styles.container,
            {
              borderColor: getColorByType(data.type),
            },
          ]}
        >
          {/* Image sec*/}
          <View
            style={{
              flex: 0.4,
            }}
          >
            <Image
              source={
                data.image !== null && data.image !== undefined
                  ? { uri: data.image }
                  : staticImage
              }
              style={styles.pokeImage}
            />
          </View>
          <View
            style={{
              flex: 0.6,
              paddingHorizontal: "2%",
              paddingVertical: "1%",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <View style={{ flex: 0.7 }}>
                <CustomText style={{ textTransform: "capitalize" }}>
                  {data.name}
                </CustomText>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flex: 0.3,
                }}
              >
                <FontAwesome5
                  name="weight-hanging"
                  size={24}
                  color={getColorByType(data.type)}
                />
                <CustomText style={{ paddingLeft: 3 }}>
                  : {data.weight}
                </CustomText>
              </View>
            </View>
            <CustomText style={{ textTransform: "capitalize" }}>
              Type: {data.type}
            </CustomText>
            <CustomText style={{ textTransform: "capitalize" }}>
              Ability: {data.abilitiy}
            </CustomText>
            <CustomText style={{ textTransform: "capitalize" }}>
              Move: {data.move}
            </CustomText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderWidth: 3,
    borderRightWidth: 10,
    padding: "1%",
    marginVertical: "6%",
  },
  pokeImage: {
    width: "100%",
    height: 170,
    resizeMode: "cover",
    position: "absolute",
    bottom: -10,
    left: 0,
    right: 0,
  },
});
