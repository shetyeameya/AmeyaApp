import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import ResumeInfo from "../../../components/Home/ResumeInfo";
import { View } from "../../../components/Themed";
const Resume = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: "2%",
        }}
      >
        <ResumeInfo />
      </View>
    </ScrollView>
  );
};

export default Resume;

const styles = StyleSheet.create({});
