import { TextInput, TextInputProps, useThemeColor } from "../components/Themed";
import { Dimensions, PixelRatio, Platform, StyleSheet } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const scale = SCREEN_WIDTH / 320;
type FontFamilyType = "SpaceMono" | "TiltNeon";
interface CustomInputTextProps extends TextInputProps {
  fontFamily?: FontFamilyType;
  size?: number;
  lightColor?: string;
  darkColor?: string;
  lightbackgroundColor?: string;
  datkbackgroundColor?: string;

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

const CustomInputText: React.FC<CustomInputTextProps> = ({
  fontFamily = "TiltNeon",
  style,
  lightColor,
  darkColor,
  children,
  datkbackgroundColor,
  lightbackgroundColor,
  ...props
}) => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <TextInput
      style={[
        styles.defaultStyle,
        {
          fontFamily: fontFamily,
          fontSize: normalize(props.size ? props.size : 14),
          color: color,
          borderColor: color,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </TextInput>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    padding: 10,
    height: 60,
    width: "100%",
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    // Add any default styles you want
  },
});

export default CustomInputText;
