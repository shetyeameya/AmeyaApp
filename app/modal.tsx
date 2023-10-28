import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Button, Pressable } from "react-native";
import { Text, View } from "../components/Themed";
import React from "react";
import CusCarousel from "../Reusable/CusCarousel";
import CustomText from "../components/StyledText";
import { ScrollView } from "react-native-gesture-handler";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { tintColorDark } from "../constants/Colors";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

export default function ModalScreen() {
  return (
    <ScrollView style={{ flex: 1, marginBottom: 50 }}>
      <View style={styles.container}>
        <CustomText size={15}>
          This project serves as a testament to my design capabilities,
          showcasing a rendition of Pokemon GO implemented with the aid of the
          remarkable
        </CustomText>
        <Pressable
          onPress={() => WebBrowser.openBrowserAsync("https://pokeapi.co/")}
          style={styles.button}
        >
          <CustomText size={18}>https://pokeapi.co/</CustomText>
        </Pressable>
        <CustomText size={15}>
          I extend my heartfelt gratitude to the creators of this API for their
          generosity in making it public, as well as for providing thorough and
          user-friendly documentation. While all credit for the data goes to
          them, this endeavor is purely a demonstration of my ability to
          manipulate various data structures, striving to bring coherence and
          aesthetic appeal to the information presented. The design of the
          Pokemon details page draws inspiration from the talented Nur Asmara,
          whose work I greatly admire.{" "}
          <CustomText size={18} style={{ color: tintColorDark }}>
            Nur Asmara’s{" "}
          </CustomText>{" "}
          designs can be explored further at
        </CustomText>
        <Pressable
          onPress={() =>
            WebBrowser.openBrowserAsync(
              "https://dribbble.com/shots/17332968-Pokédex-Apps-Design-Exploration/attachments/12450207?mode=media"
            )
          }
          style={styles.button}
        >
          <CustomText size={18}>https://dribbble.com</CustomText>
        </Pressable>

        <CustomText size={15}>
          I would like to emphasize that this project is solely a personal
          showcase and not a commercial venture. My intention is to illuminate
          my skill set for potential employers, not to derive profit. Should any
          part of this project be deemed objectionable, I am open to feedback
          and ready to make necessary amendments. I can be reached at
        </CustomText>
        <View
          style={{
            display: "flex",
            borderColor: tintColorDark,
            borderRadius: 20,
            borderWidth: 2,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "100%",
            marginVertical: 15,
          }}
        >
          <Pressable
            onPress={() =>
              Linking.openURL("mailto:shetye.ameya.7@gmail.com").catch(
                (error) => {
                  console.log(error);
                }
              )
            }
            style={[
              styles.button,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="email-fast"
              size={24}
              color={tintColorDark}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL("tel:+19173242450").catch((error) => {
                console.log(error);
              })
            }
            style={[
              styles.button,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="cellphone-basic"
              size={30}
              color={tintColorDark}
            />
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL("sms:+19173242450").catch((error) => {
                console.log(error);
              })
            }
            style={[
              styles.button,
              {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          >
            <FontAwesome5 name="sms" size={30} color={tintColorDark} />
          </Pressable>
        </View>

        <CustomText size={15}>
          I am thankful for the inspiration I have received from many quarters
          and am eager to continue learning and improving, welcoming any and all
          feedback.
        </CustomText>
        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "4%",
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
  button: {
    marginVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: tintColorDark,
  },
});
