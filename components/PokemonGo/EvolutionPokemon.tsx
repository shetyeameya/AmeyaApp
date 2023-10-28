import { StyleSheet, Dimensions, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View, useThemeColor } from "../../components/Themed";
import CustomText from "../../components/StyledText";
import Empty from "../../Reusable/Empty";
import LoadingComponent from "../../Reusable/Loading";
import { renderValue, na } from "../../constants/CommonFunctions";
import { Entypo } from "@expo/vector-icons";
import {
  lightbackgroundColor,
  datkbackgroundColor,
  tintColorLight,
  tintColorDark,
  blackcontrast,
  ContrastWhite,
} from "../../constants/Colors";
type Trigger = {
  name: string;
  url: string;
};

type EvolutionDetailsProps = {
  gender: null | string;
  held_item: null | string;
  item: null | string;
  known_move: null | string;
  known_move_type: null | string;
  location: null | string;
  min_affection: null | number;
  min_beauty: null | number;
  min_happiness: null | number;
  min_level: null | number;
  needs_overworld_rain: boolean;
  party_species: null | string;
  party_type: null | string;
  relative_physical_stats: null | number;
  time_of_day: string;
  trade_species: null | string;
  trigger: Trigger;
  turn_upside_down: boolean;
};

type Species = {
  name: string;
  url: string;
  image?: string | null;
  evolution_details?: EvolutionDetailsProps;
};

type EvolutionDetails = {
  evolves_to: EvolutionDetails[];
  species: Species;
  evolution_details: EvolutionDetailsProps[];
};

type Evolution = {
  id: number;
  chain: EvolutionDetails;
  baby_trigger_item: any;
};

interface Props {
  evolutiondata: Evolution | null | undefined;
}
const { width } = Dimensions.get("window");
const minusVal = (Dimensions.get("window").width * 2) / 100;

const EvolutionPokemon: React.FC<Props> = ({ evolutiondata }) => {
  //   console.log("data:::", minusVal);
  const [flattenedChain, setFlattenedChain] = useState<Species[]>([]);
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  const fetchSpeciesImage = async (url: string): Promise<string | null> => {
    try {
      const response = await fetch(url);
      const pokedata = await response.json();
      return (
        pokedata.sprites.other.home.front_default ||
        pokedata.sprites.back_default ||
        null
      );
    } catch (error) {
      console.error("Error fetching species image:", error);
      return null;
    }
  };

  const flattenEvolutionChain = async (
    chainLink: EvolutionDetails
  ): Promise<Species[]> => {
    const speciesImage = await fetchSpeciesImage(
      `https://pokeapi.co/api/v2/pokemon/${chainLink.species.name}`
    );
    const current: Species = {
      ...chainLink.species,
      image: speciesImage,
      evolution_details: chainLink.evolution_details[0],
    };
    let evolvesToArray: Species[] = [];
    for (const nextChainLink of chainLink.evolves_to) {
      const nextData = await flattenEvolutionChain(nextChainLink);
      evolvesToArray = evolvesToArray.concat(nextData);
    }
    return [current].concat(evolvesToArray);
  };

  useEffect(() => {
    const processEvolutionData = async () => {
      if (evolutiondata) {
        const data = await flattenEvolutionChain(evolutiondata.chain);
        setFlattenedChain(data);
      }
    };
    processEvolutionData();
  }, [evolutiondata]);

  return (
    <View style={styles.container}>
      {flattenedChain.map((species: Species, index: any) => {
        // console.log("datata:--", species);
        return (
          <View style={{ flex: 1 }} key={index}>
            <PokeCard species={species} />
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                marginVertical: 10,
              }}
            >
              {index !== flattenedChain.length - 1 && (
                <FontAwesome5
                  name="angle-double-down"
                  size={35}
                  color={tintColor}
                />
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default EvolutionPokemon;

const PokeCard: React.FC<{ species: Species }> = ({ species }) => {
  console.log("species::", species);

  return (
    <View style={styles.speciesContainer}>
      <View
        style={[
          styles.backgroundCom,
          {
            flex: 0.5,
            height: "100%",
          },
        ]}
      >
        {species.image ? (
          <Image source={{ uri: species.image }} style={styles.speciesImage} />
        ) : (
          <Image
            source={require("../../assets/imagesAssets/pokeball.png")}
            style={styles.speciesImage}
          />
        )}
      </View>
      <View
        style={[
          styles.backgroundCom,
          {
            flex: 0.5,
            display: "flex",
          },
        ]}
      >
        <View
          style={[
            styles.backgroundCom,
            {
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            },
          ]}
        >
          <CustomText
            style={{ color: ContrastWhite, textTransform: "uppercase" }}
          >
            {species.name}
          </CustomText>
          {species.evolution_details?.min_level &&
            species.evolution_details?.min_level !== undefined && (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  padding: "2%",
                  borderRadius: 15,
                  backgroundColor: ContrastWhite,
                }}
              >
                <MaterialCommunityIcons
                  name="trophy-award"
                  size={24}
                  color="black"
                />
                <CustomText style={{ color: "black" }} size={22}>
                  {species.evolution_details?.min_level}
                </CustomText>
              </View>
            )}
        </View>

        <CustomText
          style={{
            color: ContrastWhite,
            textTransform: "uppercase",
            marginTop: 15,
          }}
        >
          Triggered By: {species.evolution_details?.trigger.name || "na"}
        </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width,
    padding: "2%",
    height: "100%",
  },
  speciesContainer: {
    backgroundColor: blackcontrast,
    width: width - minusVal,
    height: "100%",
    borderRadius: 20,
    borderWidth: 4,
    paddingHorizontal: 10,
    paddingVertical: "3%",
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },

  backgroundCom: {
    backgroundColor: blackcontrast,
    borderRadius: 20,
    borderWidth: 0,
  },
  speciesImage: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
  },
});
