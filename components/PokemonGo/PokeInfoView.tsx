import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import PokeCard from "../../Reusable/PokeCard";
import { View } from "../../components/Themed";
import CustomText from "../../components/StyledText";
import { PokTypeList, pokemonNames } from "../../types/types";
import { useThemeColor } from "../../components/Themed";
import { useToastDispatch, useToastState } from "../../Context/ToastContext";
import {
  tintColorLight,
  tintColorDark,
  lightbackgroundColor,
  datkbackgroundColor,
} from "../../constants/Colors";
import Empty from "../../Reusable/Empty";
import LoadingComponent from "../../Reusable/Loading";
import { ScrollView } from "react-native-gesture-handler";
import AboutPokemon from "./AboutPokemon";
import StatsPokemon from "./StatsPokemon";
import MovesPokemon from "./MovesPokemon";
import AblitiesPokemon from "./AblitiesPokemon";
import EvolutionPokemon from "./EvolutionPokemon";

interface Props {
  data: any;
}
const PokeInfoView: React.FC<Props> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(1);
  const translateX = useRef(new Animated.Value(0)).current;
  const [loading, setloading] = useState<boolean>(false);
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

  const handleTabChange = (newTab: any) => {
    const oldTabIndex = selectedTab;
    const newTabIndex = newTab;

    Animated.timing(translateX, {
      toValue: oldTabIndex < newTabIndex ? -300 : 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      translateX.setValue(0);
      setSelectedTab(newTab);
    });
  };

  const {
    abilities,
    base_experience,
    forms,
    game_indices,
    height,
    held_items,
    id,
    is_default,
    moves,
    name,
    order,
    past_abilities,
    past_types,
    sprites,
    species,
    stats,
    types,
    weight,
    about,
    evolution,
  }: any = data;
  const aboutInfo: any = {
    weight,
    height,
    base_experience,
    id,
    name,
    about,
  };
  return (
    <>
      <LoadingComponent loading={loading}>
        <View style={styles.container}>
          <ScrollView
            style={{}}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.tabsContainer}>
              <TouchableOpacity
                onPress={() => handleTabChange(1)}
                style={[styles.tab, selectedTab === 1 && styles.selectedTab]}
              >
                <CustomText style={styles.tabText}>About</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange(2)}
                style={[styles.tab, selectedTab === 2 && styles.selectedTab]}
              >
                <CustomText style={styles.tabText}>Stats</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange(3)}
                style={[styles.tab, selectedTab === 3 && styles.selectedTab]}
              >
                <CustomText style={styles.tabText}>Moves</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange(4)}
                style={[styles.tab, selectedTab === 4 && styles.selectedTab]}
              >
                <CustomText style={styles.tabText}>Abilities</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTabChange(5)}
                style={[styles.tab, selectedTab === 5 && styles.selectedTab]}
              >
                <CustomText style={styles.tabText}>Evolutions</CustomText>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              flex: 1,
              height: "100%",
            }}
          >
            {selectedTab === 1 && <AboutPokemon data={aboutInfo} />}
            {selectedTab === 2 && <StatsPokemon stats={stats} />}
            {selectedTab === 3 && <MovesPokemon moves={moves} />}
            {selectedTab === 4 && <AblitiesPokemon list={abilities} />}
            {selectedTab === 5 && (
              <EvolutionPokemon evolutiondata={evolution} />
            )}
          </View>
        </View>
      </LoadingComponent>
    </>
  );
};

export default PokeInfoView;
function Tab1Content() {
  return <CustomText>Tab 1 Content</CustomText>;
}

function Tab2Content() {
  return <CustomText>Tab 2 Content</CustomText>;
}

function Tab3Content() {
  return <CustomText>Tab 3 Content</CustomText>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  selectedTab: {
    borderBottomWidth: 5,
    borderBottomColor: tintColorDark,
  },
  tabText: {
    fontSize: 16,
    textAlign: "center",
  },
});
