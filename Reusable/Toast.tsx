import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { ToastType } from "../types/types";
import { useToastDispatch, useToastState } from "../Context/ToastContext";
import CustomText from "../components/StyledText";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Toast: React.FC = () => {
  const dispatch = useToastDispatch();
  const state = useToastState();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // for testing only
  // const fadeAnim = useRef(new Animated.Value(1)).current; // Set initial value to 1 for full visibility
  useEffect(() => {
    if (state && state.toast && state.toast.message) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        dispatch({ type: "HIDE_TOAST" });
      }, state.toast.duration || 3000);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [state]);

  // Hardcoded values for testing remove for actual use
  // const toastType: ToastType = "info";
  // const toastMessage = "This is a test toast message!";

  const getBackgroundColor = (type: ToastType) => {
    switch (type) {
      case "error":
        return { color: "#FFB6B6", border: "#D00E0E" };
      case "success":
        return { color: "#B7F6C4", border: "#16AD24" };
      case "warning":
        return { color: "#FBE7C6", border: "#EB8602" };
      case "info":
      default:
        return { color: "#B2E6F5", border: "#0F66D0" };
    }
  };
  const getIcon = (type: ToastType) => {
    switch (type) {
      case "error":
        return (
          <MaterialIcons
            name="error"
            size={30}
            color={getBackgroundColor(type).border}
          />
        );
      case "success":
        return (
          <MaterialIcons
            name="celebration"
            size={30}
            color={getBackgroundColor(type).border}
          />
        );
      case "warning":
        return (
          <MaterialCommunityIcons
            name="bullhorn"
            size={30}
            color={getBackgroundColor(type).border}
          />
        );
      case "info":
      default:
        return (
          <MaterialCommunityIcons
            name="information"
            size={30}
            color={getBackgroundColor(type).border}
          />
        );
    }
  };

  // add back after return
  //  state && state.toast && state.toast.message ?
  return state && state.toast && state.toast.message ? (
    <Animated.View
      style={{
        opacity: fadeAnim,
        position: "absolute",
        top: 80,
        left: 20,
        right: 20,
        paddingHorizontal: 5,
        paddingVertical: 15,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderRightWidth: 10,
        borderBottomWidth: 5,
        borderTopColor: getBackgroundColor(state.toast.type).border,
        borderBottomColor: getBackgroundColor(state.toast.type).border,
        borderRightColor: getBackgroundColor(state.toast.type).border,
        backgroundColor: getBackgroundColor(state.toast.type).color,
        //getBackgroundColor(toastType).color
        // getBackgroundColor(state.toast.type),
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flex: 0.1 }}>{getIcon(state.toast.type)}</View>
      <View style={{ flex: 0.9 }}>
        <CustomText size={13} style={{ color: "black" }}>
          {state.toast.message}
          {/* {toastMessage} */}
        </CustomText>
      </View>
    </Animated.View>
  ) : null;
};

export default Toast;
