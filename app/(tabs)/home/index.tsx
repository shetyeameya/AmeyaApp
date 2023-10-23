import { StyleSheet } from "react-native";
import { Text, View } from "../../../components/Themed";
import Home from "../../../components/Home/Home";
import CustomText, { MonoText } from "../../../components/StyledText";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <CustomText
        fontFamily={"TiltNeon"}
        size={18}
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        “Life is like riding a bicycle. To keep balance you need to move on”.
      </CustomText>
      <View style={styles.separator} lightColor="#eee" darkColor="orange" />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: "2%",
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
});
