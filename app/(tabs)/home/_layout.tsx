import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="aboutMe"
        options={{
          headerTitle: "About Me",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="extra"
        options={{
          headerTitle: "Extracurricular activities",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="romeo"
        options={{
          headerTitle: "Romeo Information",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="coverletter"
        options={{
          headerTitle: "Cover-Letter",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="experience"
        options={{
          headerTitle: "Experience",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="resume"
        options={{
          headerTitle: "Resume",
          headerShown: true,
        }}
      />
    </Stack>
  );
};

export default HomeLayout;

const styles = StyleSheet.create({});
