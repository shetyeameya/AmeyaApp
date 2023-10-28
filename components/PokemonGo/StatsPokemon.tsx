import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { View, useThemeColor } from "../../components/Themed";
import CustomText from "../../components/StyledText";
import { useToastDispatch, useToastState } from "../../Context/ToastContext";
import {
  lightbackgroundColor,
  datkbackgroundColor,
  tintColorLight,
  tintColorDark,
  blackcontrast,
} from "../../constants/Colors";
import { FontAwesome5 } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type StatsProps = {
  stats: Stat[];
};

const StatBar: React.FC<Stat> = ({ base_stat, stat }) => {
  const displayName = stat.name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const minusVal = (Dimensions.get("window").width * 65) / 100;
  const filledWidth = (minusVal - 60) * (base_stat / 100);

  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  return (
    <View style={styles.statContainer}>
      <CustomText size={11} style={styles.statText}>
        {displayName}
      </CustomText>
      <CustomText style={styles.statValue}>{base_stat}</CustomText>
      <View style={styles.statBar}>
        <View
          style={[
            styles.filledBar,
            { width: filledWidth, backgroundColor: tintColor },
          ]}
        ></View>
      </View>
    </View>
  );
};

const StatsPokemon: React.FC<StatsProps> = ({ stats }) => {
  return (
    <View style={styles.container}>
      {stats.map((item, index) => (
        <StatBar key={index} {...item} />
      ))}
    </View>
  );
};

export default StatsPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statContainer: {
    paddingHorizontal: "5%",
    paddingVertical: "1%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    flex: 1,
    width: "100%",
  },
  statText: {
    width: "35%",
  },
  statValue: {
    width: "10%",
    textAlign: "center",
  },
  statBar: {
    width: "55%",
    height: 15,
    backgroundColor: "#444",
    marginLeft: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  filledBar: {
    height: "100%",
    borderRadius: 10,
  },
});
