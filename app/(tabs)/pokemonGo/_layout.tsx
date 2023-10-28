import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
const PokemonLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Pokemon Go ",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="pokeModal"
        options={{
          presentation: "fullScreenModal",
        }}
      />
    </Stack>
  );
};

export default PokemonLayout;

const styles = StyleSheet.create({});
