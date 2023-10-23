import { Text, TextProps, useThemeColor } from "./Themed";
import { Dimensions, PixelRatio, Platform, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;
type FontFamilyType = "SpaceMono" | "TiltNeon";
interface CustomTextProps extends TextProps {
  fontFamily?: FontFamilyType;
  size?: number;
  lightColor?: string;
  darkColor?: string;
  // Add other custom props as needed
}

function normalize(size: any) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const CustomText: React.FC<CustomTextProps> = ({
  fontFamily = "TiltNeon",
  style,
  lightColor,
  darkColor,
  children,
  ...props
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <Text
      style={[
        styles.defaultStyle,
        {
          color: color,
          fontFamily: fontFamily,
          fontSize: normalize(props.size ? props.size : 14),
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    // Add any default styles you want
  },
});

export default CustomText;

export function MonoText(props: any) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        {
          fontFamily: props.fontFamily,
          fontSize: normalize(props.size ? props.size : 14),
        },
      ]}
    />
  );
}
