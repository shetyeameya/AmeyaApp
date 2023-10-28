import { ScrollView, StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import React from "react";
import PokemonListView from "../../../components/PokemonGo/PokemonListView";
export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <PokemonListView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
