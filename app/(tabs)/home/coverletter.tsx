import { StyleSheet, ScrollView } from "react-native";
import React from "react";
import CoverLetterInfo from "../../../components/Home/CoverLetterInfo";
import { View } from "../../../components/Themed";
const CoverLetter = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: "2%",
        }}
      >
        <CoverLetterInfo />
      </View>
    </ScrollView>
  );
};

export default CoverLetter;

const styles = StyleSheet.create({});
