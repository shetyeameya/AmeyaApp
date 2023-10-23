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

const { width } = Dimensions.get("window");
const minusVal = (Dimensions.get("window").width * 2) / 100;
interface Props {
  images: any;
}
const CustomCarousel: React.FC<Props> = ({ images }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const doubleTapRef = useRef();

  const handleDoubleTap = (event: any, image: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setSelectedImage(image);
      setModalVisible(true);
    }
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        style={{ width: "100%", height: 400 }}
      >
        {images.map((image: any, index: any) => (
          <TapGestureHandler
            key={index}
            numberOfTaps={2}
            onHandlerStateChange={(event) => handleDoubleTap(event, image)}
          >
            <Image
              key={index}
              source={{ uri: image }}
              style={{ width: width - minusVal, height: 400 }}
              resizeMode="cover"
            />
          </TapGestureHandler>
        ))}
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
            <Image
              source={{
                uri: selectedImage !== null && selectedImage,
              }}
              style={{ width, height: 400, alignSelf: "center" }}
              resizeMode="contain"
            />
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
