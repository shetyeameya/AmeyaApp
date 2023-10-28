import {
  StyleSheet,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  RefreshControl,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import PokeCard from "../../Reusable/PokeCard";
import { View } from "../../components/Themed";
import CustomText from "../../components/StyledText";
import { PokTypeList, pokemonNames } from "../../types/types";
import { useToastDispatch, useToastState } from "../../Context/ToastContext";
import { tintColorDark, tintColorLight } from "../../constants/Colors";
import Empty from "../../Reusable/Empty";
import LoadingComponent from "../../Reusable/Loading";
const screenWidth = Dimensions.get("window").width;
const cardWidth = screenWidth / 2.16;

const PokemonListView = () => {
  const toastDispatch = useToastDispatch();
  const [loading, setloading] = useState<boolean>(true);
  const [data, setData] = useState<any>(undefined);
  const [search, setSearch] = useState<any>(pokemonNames);
  const [searchText, setsearchText] = useState<any>(undefined);
  const [refreshing, setRefreshing] = React.useState(false);

  const getPkoemonData = (pokeName?: any) => {
    setloading(true);
    let details: any = [];
    try {
      search !== null &&
        search !== undefined &&
        search.map(async (name: any) => {
          const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
          const response = await fetch(url);
          if (response.status === 404) {
            toastDispatch({
              type: "SHOW_TOAST",
              payload: {
                message: `Could not find the pokemon.Please try another one.`,
                type: "error",
                duration: 2000,
              },
            });
            setData(undefined);
            setloading(false);
            return;
          }
          const pokedata = await response.json();

          if (pokedata !== null) {
            details.push({
              rest: JSON.stringify(pokedata),
              name: pokedata.species.name,
              image:
                pokedata.sprites.other.home.front_default !== null
                  ? pokedata.sprites.other.home.front_default
                  : pokedata.sprites.back_default,
              type: pokedata.types[0].type.name,
              weight: pokedata.weight,
              abilitiy: pokedata.abilities[0].ability.name,
              id: pokedata.id,
              move: pokedata.moves[0].move.name,
            });
          }
          setData(details);
        });
      setloading(false);
    } catch (error: any) {
      setloading(false);
      console.log("error:::", error);
      setData(undefined);
      toastDispatch({
        type: "SHOW_TOAST",
        payload: {
          message: error,
          type: "error",
          duration: 2000,
        },
      });
    } finally {
    }
  };

  useEffect(() => {
    getPkoemonData();
  }, [search]);

  const onRefresh = React.useCallback(() => {
    setloading(true);
    setsearchText(undefined);
    getPkoemonData();
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  const handlechangeText = (val: any) => {
    if (val !== "" && val !== null && val !== undefined) {
      const cleanedText = val.replace(/[^a-zA-Z0-9]/g, "");
      setsearchText(cleanedText);
    } else {
      setsearchText(undefined);
    }
  };

  const handleSearch = () => {
    if (searchText != undefined) {
      setSearch([searchText]);
    } else setSearch(pokemonNames);
  };
  const handleReset = () => {
    setSearch(pokemonNames);
    setsearchText(undefined);
  };
  console.log("loading", loading);
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        padding: "2%",
      }}
    >
      <LoadingComponent loading={loading ? true : false}>
        <TextInput
          value={searchText}
          style={styles.input}
          placeholderTextColor={tintColorDark}
          placeholder="Search by pokemon name."
          onChangeText={handlechangeText}
          autoCapitalize="words"
        />
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Pressable style={styles.button} onPress={handleSearch}>
            <CustomText style={{ textAlign: "center" }}>Search</CustomText>
          </Pressable>
          <Pressable style={styles.button} onPress={handleReset}>
            <CustomText style={{ textAlign: "center" }}>Reset</CustomText>
          </Pressable>
        </View>

        <FlatList
          // style={{}}
          contentContainerStyle={{
            width: "100%",
            paddingTop: 20,
            marginBottom: 1100,
          }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={onRefresh}
              tintColor={tintColorDark} // Red color for iOS spinner
              colors={[tintColorDark]}
            />
          }
          ListEmptyComponent={<Empty />}
          data={data}
          decelerationRate="fast"
          renderItem={({ item }) => <PokeCard data={item} />}
          keyExtractor={(item) => item.name}
        />
      </LoadingComponent>
    </View>
  );
};

export default PokemonListView;

const styles = StyleSheet.create({
  input: {
    height: 65,
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderColor: tintColorDark,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightWidth: 10,
    fontSize: 16,
    fontFamily: "TiltNeon",
    backgroundColor: "white",
  },
  button: {
    padding: "4%",
    alignSelf: "center",
    borderColor: tintColorDark,
    borderWidth: 3,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderRightWidth: 10,
  },
});
