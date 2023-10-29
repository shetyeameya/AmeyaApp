import React, { useRef, useState } from "react";
import {
  Dimensions,
  View,
  Image,
  Modal,
  TouchableOpacity,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import { tintColorDark } from "../constants/Colors";

const { width } = Dimensions.get("window");
const minusVal = (Dimensions.get("window").width * 4) / 100;
interface Props {
  images: any;
  uri?: boolean;
}

type imagesL = {
  id: number;
  imageURL: string;
};
const CustomCarousel: React.FC<Props> = ({ images, uri }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<imagesL | null>(null);
  const doubleTapRef = useRef();

  const handleDoubleTap = (event: any, image: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setSelectedImage(image);
      setModalVisible(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{
          width: "100%",
          height: 400,
          marginVertical: 20,
          overflow: "hidden",
        }}
      >
        {images.map((image: any, index: any) => {
          // console.log("ImageName::", image);
          return (
            <TapGestureHandler
              key={index}
              numberOfTaps={2}
              onHandlerStateChange={(event) => handleDoubleTap(event, image)}
            >
              {uri ? (
                <Image
                  key={index}
                  source={{ uri: image.imageURL }}
                  style={{
                    width: width - minusVal,
                    height: 400,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: tintColorDark,
                    overflow: "hidden",
                  }}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  key={index}
                  source={image}
                  style={{
                    width: width - minusVal,
                    height: 400,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: tintColorDark,
                    overflow: "hidden",
                  }}
                  resizeMode="cover"
                />
              )}
            </TapGestureHandler>
          );
        })}
      </ScrollView>

      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isModalVisible}
        >
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            pinchGestureEnabled
            maximumZoomScale={2}
            minimumZoomScale={1}
          >
            {uri ? (
              <Image
                source={{
                  uri:
                    selectedImage !== null ? selectedImage.imageURL : undefined,
                }}
                style={{ width, height: 400, alignSelf: "center" }}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={
                  selectedImage !== null
                    ? selectedImage
                    : require("../assets/imagesAssets/ameyachristmas.jpg")
                }
                style={{ width, height: 400, alignSelf: "center" }}
                resizeMode="contain"
              />
            )}
          </ScrollView>

          <TouchableOpacity
            style={{ position: "absolute", top: 50, right: 20 }}
            onPress={() => setModalVisible(false)}
          >
            {/* Add a close icon here if you have one */}
            <Text>Close</Text>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default CustomCarousel;
