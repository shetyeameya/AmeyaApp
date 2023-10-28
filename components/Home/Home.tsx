import { StyleSheet, Dimensions, ScrollView } from "react-native";
import { Text, View } from "../../components/Themed";
import React from "react";
import { yellowColor, blueColor } from "../../constants/Colors";
import CustomText from "../StyledText";
import CusCarousel from "../../Reusable/CusCarousel";
import PersonalInfo from "./PersonalInfo";

const Home = () => {
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;
  const optionsList: any = [
    {
      title: "About Me",
      link: "/(tabs)/home/aboutMe",
      icon: "account-cowboy-hat",
    },
    {
      title: "Experience",
      link: "/(tabs)/home/experience",
      icon: "bag-personal",
    },
    {
      title: "Extra",
      link: "/(tabs)/home/extra",
      icon: "cricket",
    },
    {
      title: "Romeo",
      link: "/(tabs)/home/romeo",
      icon: "dog",
    },
    {
      title: "Resume",
      link: "/(tabs)/home/resume",
      icon: "file-document",
    },
    {
      title: "Cover-Letter",
      link: "/(tabs)/home/coverletter",
      icon: "file-document-multiple",
    },
  ];
  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <View>
        <PersonalInfo />
        <CusCarousel data={optionsList} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
