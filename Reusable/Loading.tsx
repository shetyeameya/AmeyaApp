import React from "react";
import { View, Animated, Easing, Dimensions } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomText from "../components/StyledText";

interface LoadingProps {
  loading: boolean;
  children?: React.ReactNode;
}

const LoadingComponent: React.FC<LoadingProps> = ({ loading, children }) => {
  const rotation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [loading]);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <MaterialCommunityIcons name="pokeball" size={54} color="red" />
        </Animated.View>
        <CustomText size={16}>....Loading</CustomText>
      </View>
    );
  }

  return <>{children}</>;
};

export default LoadingComponent;
