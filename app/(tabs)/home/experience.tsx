import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "../../../components/Themed";
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
  console.log("wk::", workExperience);
  return (
    <ScrollView style={styles.container}>
      <View>
        {skillsList && (
          <View>
            <CustomText size={18}>Skills List : </CustomText>
            <CusAccordian data={null} list={skillsList} />
          </View>
        )}
      </View>
      <View>
        {workExperience && (
          <View>
            <CustomText size={18}>Work Experience : </CustomText>
            <CusAccordian data={workExperience} list={null} />
          </View>
        )}
      </View>
      <View>
        {certificationsList && (
          <View>
            <CustomText size={18}>Certifications List : </CustomText>
            <CusAccordian data={null} list={certificationsList} />
          </View>
        )}
      </View>
      <View style={{ marginBottom: "2%" }}>
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
});
