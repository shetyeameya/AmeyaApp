import { StyleSheet, Dimensions } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
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

type MoveLearnMethod = {
  name: string;
  url: string;
};

type VersionGroupDetails = {
  level_learned_at: number;
  move_learn_method: MoveLearnMethod;
  version_group: {
    name: string;
    url: string;
  };
};

type Move = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: VersionGroupDetails[];
};

type MoveDetailProps = {
  moveData: Move;
};

const MoveDetail: React.FC<MoveDetailProps> = ({ moveData }) => {
  const bgColor = useThemeColor(
    { light: lightbackgroundColor, dark: datkbackgroundColor },
    "background"
  );
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );

  if (!moveData || moveData.version_group_details.length === 0) return null;

  const firstDetail = moveData.version_group_details[0];
  return (
    <View style={styles.card}>
      <View style={styles.cardfirst}>
        <Entypo name="shield" size={24} color={tintColor} />
        <CustomText
          size={13}
          style={{
            textTransform: "capitalize",
            color: ContrastWhite,
          }}
        >
          {" "}
          {moveData.move.name}
        </CustomText>
      </View>
      <View style={{ backgroundColor: blackcontrast }}>
        <CustomText size={11} style={{ color: ContrastWhite }}>
          Level: {firstDetail.level_learned_at}
        </CustomText>
        <CustomText
          size={11}
          style={{ color: ContrastWhite, textTransform: "capitalize" }}
        >
          Method: {firstDetail.move_learn_method.name}
        </CustomText>
      </View>
    </View>
  );
};

const MovesPokemon: React.FC<{ moves: Move[] | [] | null | undefined }> = ({
  moves,
}) => {
  if (!moves || moves.length === 0) return <Empty />;

  const renderRows = () => {
    let rows = [];
    for (let i = 0; i < moves.length; i += 2) {
      rows.push(
        <View key={i} style={styles.row}>
          <MoveDetail moveData={moves[i]} />
          {moves[i + 1] && <MoveDetail moveData={moves[i + 1]} />}
        </View>
      );
    }
    return rows;
  };

  return <View>{renderRows()}</View>;
};

export default MovesPokemon;

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
