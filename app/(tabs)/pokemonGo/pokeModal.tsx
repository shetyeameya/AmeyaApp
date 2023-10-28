import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, Pressable, Image } from "react-native";
import { Text, View, useThemeColor } from "../../../components/Themed";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState, useEffect } from "react";
import { Stack, Link } from "expo-router";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors, {
  lightbackgroundColor,
  datkbackgroundColor,
  tintColorLight,
  tintColorDark,
} from "../../../constants/Colors";
import { PokTypeList } from "../../../types/types";
import CustomText from "../../../components/StyledText";
import { Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import TypeDefine from "../../../Reusable/TypeDefine";
import PokeInfoView from "../../../components/PokemonGo/PokeInfoView";
import LoadingComponent from "../../../Reusable/Loading";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const pokeModal = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const name: string = params.name as string;
  const width = Dimensions.get("screen").width / 1.2;
  const height = 250;
  const type: any = params.type;
  const rest: any = params.rest;
  let restData: any = JSON.parse(rest);

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
  const getColorByType = (typeName: any) => {
    const typeObj = PokTypeList.find(
      (pokType: any) => pokType.type === typeName
    );
    return typeObj ? typeObj.color : null;
  };

  const [loading, setloading] = useState<boolean>(true);
  const [data, setData] = useState<any>({ ...restData });
  let pokeInfo: any = null;
  const getPkoemonData = async (id: any) => {
    setloading(true);
    console.log("number:::::id", id);
    try {
      const url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;
      const response = await fetch(url);
      if (!response.ok) {
        setData({
          ...restData,
          about: null,
          evolution: null,
        });
        // console.log("entere1");
        return;
      }
      const pokedata = await response.json();
      if (pokedata !== null) {
        let evolution: any = null;
        if (pokedata.evolution_chain && pokedata.evolution_chain.url) {
          const evolutionResponse = await fetch(pokedata.evolution_chain.url);
          if (!evolutionResponse.ok) {
            console.error(
              "Error fetching evolution data:",
              evolutionResponse.status,
              evolutionResponse.statusText
            );
          } else {
            const evolutionData = await evolutionResponse.json();
            evolution = evolutionData; //adding the vales
          }
        }
        setData({
          ...restData,
          about: pokedata,
          evolution: evolution,
        });
        // console.log("entere22221", data);
      }
    } catch (error: any) {
      //   console.log("entere444441");
      console.log("error:::", error);
      setData({
        ...restData,
        about: null,
        evolution: null,
      });
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    const datafetch = async () => {
      const val = await getPkoemonData(params.id);
    };
    datafetch();
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: getColorByType(type) }]}>
      <Stack.Screen
        options={{
          headerTitle: name.toUpperCase(),
          headerStyle: {
            backgroundColor: getColorByType(type),
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerLeft: () => (
            <Pressable
              onPress={() => {
                console.log("pressed");
                navigation.canGoBack() ? navigation.goBack() : router.back();
              }}
            >
              <AntDesign
                name="caretleft"
                size={35}
                color={"white"}
                style={{
                  marginRight: 15,
                }}
              />
            </Pressable>
          ),
        }}
      />
      <LoadingComponent loading={loading}>
        <View style={{ flex: 1, backgroundColor: getColorByType(type) }}>
          <View
            style={{
              flex: 1,
              width: Dimensions.get("screen").width,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: getColorByType(type),
            }}
          >
            <View
              style={{
                width: width,
                height: height,
                borderRadius: (width + height) / 2,
                borderWidth: 2,
                borderColor: getColorByType(type),
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                marginTop: 50,
              }}
            >
              <Image
                source={{ uri: params.image as string }}
                style={{
                  width: width,
                  height: 300,
                  resizeMode: "contain",
                  position: "absolute",
                  zIndex: 99,
                  bottom: 0,
                  left: 0,
                  right: 0,
                }}
              />
            </View>
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: bgColor,
                marginTop: 10,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            >
              {data !== null && (
                <View>
                  <TypeDefine data={restData.types} />
                  <PokeInfoView data={data} />
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </LoadingComponent>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default pokeModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
