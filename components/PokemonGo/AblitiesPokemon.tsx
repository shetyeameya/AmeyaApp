import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { View, useThemeColor } from "../../components/Themed";
import CustomText from "../../components/StyledText";
import Empty from "../../Reusable/Empty";
import LoadingComponent from "../../Reusable/Loading";
import { renderValue, na } from "../../constants/CommonFunctions";
import { AntDesign } from "@expo/vector-icons";
import {
  lightbackgroundColor,
  datkbackgroundColor,
  tintColorLight,
  tintColorDark,
  blackcontrast,
  ContrastWhite,
} from "../../constants/Colors";

type Abilitiesgroup = {
  name: string;
  url: string;
};

type Ablities = {
  ability: Abilitiesgroup;
  is_hidden: boolean;
  slot: number;
};

interface Props {
  abilityData: Ablities;
}

const MoveDetail: React.FC<Props> = ({ abilityData }) => {
  const bgColor = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );

  const firstDetail = abilityData.ability;
  console.log("khkgjkgfj:::::", abilityData);
  return (
    <View style={styles.card}>
      <View style={styles.cardfirst}>
        <AntDesign name="star" size={24} color={tintColor} />
        <CustomText
          size={18}
          style={{ textTransform: "capitalize", color: ContrastWhite }}
        >
          {" "}
          {abilityData.slot}
        </CustomText>
      </View>
      <View style={{ backgroundColor: blackcontrast }}>
        <CustomText
          style={{ color: ContrastWhite, textTransform: "capitalize" }}
        >
          Move: {firstDetail.name}
        </CustomText>
        {abilityData.is_hidden === true && (
          <CustomText size={12} style={{ color: "red" }}>
            Hidden Talent
          </CustomText>
        )}
      </View>
    </View>
  );
};

const AblitiesPokemon: React.FC<{
  list: Ablities[] | null | undefined | [];
}> = ({ list }) => {
  if (!list || list.length === 0) return <Empty />;

  const renderRows = () => {
    let rows = [];
    for (let i = 0; i < list.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          <MoveDetail abilityData={list[i]} />
          {list[i + 1] && <MoveDetail abilityData={list[i + 1]} />}
        </View>
      );
    }
    return rows;
  };

  return <View>{renderRows()}</View>;
};

export default AblitiesPokemon;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    display: "flex",
    paddingHorizontal: "3%",
    backgroundColor: blackcontrast,
    marginVertical: "2%",
    minWidth: "40%",
    width: "48%",
    borderRadius: 20,
    paddingVertical: "5%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  cardfirst: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: blackcontrast,
    marginVertical: "2%",
  },
});
