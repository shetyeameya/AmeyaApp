import { StyleSheet, Text, Image, Dimensions } from "react-native";
import { useThemeColor, View } from "../Themed";
import React, { useState, useEffect } from "react";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../../constants/Colors";
import CustomText from "../StyledText";
import CustomCarousel from "../../Reusable/ImageCaro";
import LoadingComponent from "../../Reusable/Loading";
import { getImages } from "../../Reusable/CommonFunctions";
import { ScrollView } from "react-native-gesture-handler";
const RomeoInfo = () => {
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );

  const staticImage = require("../../assets/imagesAssets/Romeo.png");
  const [loading, setloading] = useState<boolean>(false);
  const [data, setData] = useState<string[] | null>(null);
  useEffect(() => {
    const getImagesList = async () => {
      const response = await getImages("romeo");
      if (response !== null) {
        setData(response);
      } else {
        setData(null);
      }
    };

    getImagesList();
  }, []);
  return (
    <ScrollView style={{ flex: 1 }}>
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
            <Image source={staticImage} style={[styles.boyImage]} />
          </View>
          {/* Text Alert View */}
          <View style={[styles.alertBox, { backgroundColor: tintColor }]}>
            <CustomText size={18} style={styles.alertTitle}>
              Romeo Shetye
            </CustomText>
            <CustomText size={16} style={styles.alertTitle}>
              Charmer - May 23 2017
            </CustomText>
          </View>
        </View>
        <View>
          <CustomText size={18} style={styles.alertTitle}>
            Summary:
          </CustomText>
          <CustomText size={13} style={styles.alertTitle}>
            Romeo, my son, is an embodiment of pure emotion and joy in my life.
            More than just a pet, he feels like a child to me, offering
            unconditional love, support, and solace during my most challenging
            times. He's a charmer, mischievously naughty yet irresistibly
            endearing. His mood swings are akin to a dramatic play, ranging from
            cheeky to intensely affectionate. His playful antics, like refusing
            to dust off outside and instead choosing the indoors, never fail to
            bring a smile to my face. A gourmet at heart, Romeo wouldn't dare
            touch his meal unless it contains a hint of meat. His understanding
            of my emotions is profound. On gloomy days, his warm hugs and
            jubilant runs towards me act as a balm to my soul. The sheer joy he
            exhibits, even for something as mundane as my return from a shower,
            speaks volumes about his deep attachment. His magnetic personality
            ensures he's the star wherever he goes, getting invites to parties,
            often granting me the privilege of accompanying him. Reflecting on
            our journey, I recall the days when I was a student, stressed and
            anxious about the future. Yet, within a week of Romeo entering my
            life, I landed a job. There's no denying that he is the lucky charm
            that has brought immense happiness and prosperity into my life.
          </CustomText>
        </View>
        <LoadingComponent loading={loading}>
          {!loading && data !== null && (
            <CustomCarousel images={data} uri={true} />
          )}
        </LoadingComponent>
      </View>
    </ScrollView>
  );
};

export default RomeoInfo;

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
    top: -130,
    width: "100%",
    height: 240,
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
