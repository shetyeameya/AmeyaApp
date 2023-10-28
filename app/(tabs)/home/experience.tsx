import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { useThemeColor, View } from "../../../components/Themed";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../../../constants/Colors";
import React, { useState } from "react";
import {
  workExperience,
  skillsList,
  educationList,
  certificationsList,
} from "../../../fakeData/ExperienceData";
import CustomText from "../../../components/StyledText";
import CusAccordian from "../../../Reusable/CusAccordian";

const staticImage = require("../../../assets/imagesAssets/cartoongrad.png");
const Experience = () => {
  const color = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.container}
    >
      <View>
        <View style={[styles.containerimg, { backgroundColor: tintColor }]}>
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
            <CustomText size={14} style={styles.alertTitle}>
              Southern Methodist University | M.S. Electrical Engineering,
              Dallas, Texas
            </CustomText>
            <CustomText size={13} style={styles.alertTitle}>
              | May 2016"
            </CustomText>
          </View>
        </View>
        {skillsList && (
          <View style={{ flex: 1 }}>
            <CustomText size={18}>Skills List : </CustomText>
            <CusAccordian key={"skillsList"} data={null} list={skillsList} />
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {workExperience && (
          <View>
            <CustomText size={18}>Work Experience : </CustomText>
            <CusAccordian
              key={"workExperience"}
              data={workExperience}
              list={null}
            />
          </View>
        )}
      </View>
      <View style={{ flex: 1 }}>
        {certificationsList && (
          <View>
            <CustomText size={18}>Certifications List : </CustomText>
            <CusAccordian
              key={"certificationsList"}
              data={null}
              list={certificationsList}
            />
          </View>
        )}
      </View>
      <View style={{ marginBottom: "2%", flex: 1 }}>
        <CustomText size={18}>Education: </CustomText>
        {educationList &&
          educationList.map((val: any) => {
            return (
              <CustomText
                key={val.name}
                size={16}
                style={{ color: tintColor, padding: "2%" }}
              >
                {val.name} {val.year}
              </CustomText>
            );
          })}
      </View>
    </ScrollView>
  );
};

export default Experience;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  job: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
  descriptionContainer: {
    marginTop: 10,
  },
  descItem: {
    marginBottom: 15,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginLeft: 10,
  },
  containerimg: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
    maxHeight: 180,
    minHeight: 130,
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: "2%",
  },
  boyImage: {
    position: "absolute",
    left: 0,
    top: -125,
    width: "100%",
    height: 190,
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
