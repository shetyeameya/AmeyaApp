import { Pressable, StyleSheet, Text, View, Share } from "react-native";
import React from "react";
import CustomText from "../StyledText";
// import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { useToastDispatch } from "../../Context/ToastContext";

const localpdf = require("../../assets/imagesAssets/CoverLetter.pdf");

const CoverLetterInfo = () => {
  const toastDispatch = useToastDispatch();

  const onSharePress = async () => {
    try {
      const result = await Share.share({
        message: "Check out my resume!",
        url: localpdf,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(`Share failed with error: ${error.message}`);
    }
  };

  const onDownloadPress = async () => {
    const asset = Asset.fromModule(
      require("../../assets/imagesAssets/ResumeAmeya.pdf")
    );

    // Download
    const fileUri = FileSystem.cacheDirectory + "ResumeAmeya.pdf";
    await FileSystem.downloadAsync(asset.uri, fileUri)
      .then(({ uri }) => {
        toastDispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `"File saved to", ${uri}`,
            type: "success",
            duration: 2000,
          },
        });
      })
      .catch((error) => {
        toastDispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `"Error downloading file", ${error}`,
            type: "error",
            duration: 2000,
          },
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={onSharePress}>
          <CustomText>Share</CustomText>
        </Pressable>
        <Pressable onPress={onDownloadPress}>
          <CustomText>Download</CustomText>
        </Pressable>
      </View>
    </View>
  );
};

export default CoverLetterInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 20,
  },
  pdf: {
    width: "100%",
    height: 500,
  },
});
