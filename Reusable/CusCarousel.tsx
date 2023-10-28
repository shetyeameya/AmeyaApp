import React, { useState } from "react";
import {
  View,
  FlatList,
  ScrollView,
  Dimensions,
  StyleSheet,
  Pressable,
} from "react-native";
import CustomText from "../components/StyledText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../constants/Colors";
import { useThemeColor } from "../components/Themed";
import { useRouter } from "expo-router";

interface Props {
  data: any;
}

const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2.16;

const CusCarousel: React.FC<Props> = ({ data }) => {
  const color = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const router = useRouter();
  const tintcolor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  return (
    <View style={styles.container}>
      <FlatList
        style={{
          width: "100%",
          display: "flex",
          paddingTop: 40,
        }}
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <Pressable
            key={item.title}
            style={styles.card}
            onPress={() => {
              router.push(item.link);
            }}
          >
            <View
              style={[
                styles.iconView,
                { borderColor: color, backgroundColor: color },
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={60}
                color={tintcolor}
              />
            </View>
            <CustomText
              style={{
                textAlign: "center",
                width: "100%",
              }}
              lightColor={tintcolor}
              fontFamily="TiltNeon"
              size={23}
            >
              {item.title}
            </CustomText>
            <View
              style={[
                styles.shadowCircle,
                {
                  backgroundColor: tintcolor,
                },
              ]}
            />
          </Pressable>
        )}
        keyExtractor={(item) => item.title}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  card: {
    width: cardWidth,
    minHeight: 200,
    backgroundColor: "#333",
    marginLeft: (screenWidth - cardWidth) / 80,
    marginRight: (screenWidth - cardWidth) / 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: "100%",
    padding: "5%",
    position: "relative",
  },
  iconView: {
    position: "absolute",
    borderWidth: 2,
    top: -30,
    height: 80,
    width: 80,
    borderRadius: 40,
    zIndex: 99,
    elevation: 99,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  shadowCircle: {
    position: "absolute",
    bottom: -25,
    width: 100,
    height: 50,
    borderRadius: 50,
    zIndex: 100,
  },
});

export default CusCarousel;
