import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import RomeoInfo from "../../../components/Home/RomeoInfo";
import { View } from "../../../components/Themed";

const Romeo = () => {
  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: "2%",
        }}
      >
        <RomeoInfo />
      </View>
    </ScrollView>
  );
};

export default Romeo;

const styles = StyleSheet.create({});
