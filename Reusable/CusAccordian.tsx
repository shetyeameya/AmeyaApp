import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useThemeColor } from "../components/Themed";
import {
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

interface Props {
  data: any;
  list: any;
}

const CusAccordian: React.FC<Props> = ({ data, list }) => {
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
      {data !== null &&
        data.map((job: any, index: any) => (
          <View key={index} style={[styles.job, { borderColor: tintColor }]}>
            <TouchableOpacity
              style={[styles.accView]}
              onPress={() => toggleAccordion(index)}
            >
              <CustomText size={15} style={styles.title}>
                {job.title}
              </CustomText>
              <AntDesign
                name={activeIndex === index ? "caretup" : "caretdown"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
            {activeIndex === index && (
              <View style={styles.descriptionContainer}>
                {job.description.map((desc: any, descIndex: any) => (
                  <View key={descIndex} style={styles.descItem}>
                    <CustomText
                      size={14}
                      style={[
                        styles.header,
                        { textDecorationColor: tintColor },
                      ]}
                    >
                      {desc.header}
                    </CustomText>
                    <CustomText size={13} style={styles.description}>
                      {desc.experience}
                    </CustomText>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}
      {list !== null &&
        list.map((job: any, index: any) => (
          <View key={index} style={[styles.job, { borderColor: tintColor }]}>
            <TouchableOpacity
              style={[styles.accView]}
              onPress={() => toggleAccordion(index)}
            >
              <CustomText size={15} style={styles.title}>
                {job.title}
              </CustomText>
              <AntDesign
                name={activeIndex === index ? "caretup" : "caretdown"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
            {activeIndex === index && (
              <View style={styles.descriptionContainer}>
                <View style={styles.descItem}>
                  <CustomText size={13} style={styles.description}>
                    {job.description}
                  </CustomText>
                </View>
              </View>
            )}
          </View>
        ))}
    </ScrollView>
  );
};

export default CusAccordian;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: "2%",
  },
  accView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
  },
  job: {
    borderRadius: 10,
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    flex: 0.8,
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
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
  },
  description: {
    marginLeft: 10,
  },
});
