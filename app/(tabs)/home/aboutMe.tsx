import { ScrollView, StyleSheet, Text, Image, Dimensions } from "react-native";
import {
  datkbackgroundColor,
  lightbackgroundColor,
  tintColorDark,
  tintColorLight,
  yellowColor,
} from "../../../constants/Colors";
import { useThemeColor, View } from "../../../components/Themed";
import React, { useEffect, useState } from "react";
import CustomText from "../../../components/StyledText";
import CustomCarousel from "../../../Reusable/ImageCaro";
import LoadingComponent from "../../../Reusable/Loading";
import { EXPO_PUBLIC_IMAGES_URL, EXPO_PUBLIC_SECRET_KEY } from "@env";
import { getImages } from "../../../Reusable/CommonFunctions";
const staticImage = require("../../../assets/imagesAssets/family.png");
const About = () => {
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );

  const [loading, setloading] = useState<boolean>(false);
  const [data, setData] = useState<string[] | null>(null);
  useEffect(() => {
    const getImagesList = async () => {
      const response = await getImages("family");
      if (response !== null) {
        setData(response);
      } else {
        setData(null);
      }
    };

    getImagesList();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          padding: "2%",
          flexDirection: "column",
        }}
      >
        <View style={[styles.container, { backgroundColor: tintColor }]}>
          {/* Image of the boy */}
          <View
            style={{
              flex: 1,
              backgroundColor: tintColor,
            }}
          >
            <Image source={staticImage} style={styles.boyImage} />
          </View>
        </View>
        <CustomText size={12}>
          Albert Einstein’s famous words ring true every time I feel a bit
          deflated or when I do not live up to my own expectations; I have
          learnt that moving on and addressing the issues at stake, is the
          superlative solution to virtually all problems This has made me
          believe in setting short-term goals for myself and then committing
          myself totally to achieving them. Truly, it has been rightly said that
          well-planned and well thought of actions however small, give a
          concrete shape to the vision in which they were contemplated.
          Excellence endures and sustains. It goes beyond motivation into the
          realms of inspiration and can be as strong a uniting force as concrete
          vision. It does not happen in a vacuum but it needs a collective
          obsession, despite hurdles and failures to continue to move ahead, to
          remain determined; it is an unending journey, To follow my passion I
          steered towards subjects that in some way were related to the amazing
          world of Electronics and Computers. That which started in high school
          at St Marys took me to the Ruia Junior Engineering College and then I
          enrolled for an undergraduate education in Electronics from KC College
          of Engineering. Which led me to Southern Methodist University for my
          masters.My journey of learning had just begun! After graduating and
          receiving my degree I joined Webspun LLC. and learnt a lot. I build an
          iOS application from scratch which helped investors get all the
          necessary information on stocks publicly listed. After a year I joined
          RumbleOn and it has been an exhilarating experience. I joined as Jr
          Developer for iOS mobile development. The entire code was in
          objective-C. At first it was a bit difficult as I had worked with swit
          and had a fair knowledge in objective-C. This helped me gain much more
          experience than I could ever gain. We then moved onto React. This was
          totally new to me. I have now over the years, learned and worked on
          React. While learning React I was also promoted to the position of
          Project manager. Here I dealt with 24 developers offshore. Working
          strange hours and coping with stress has prepared me for any situation
          that may arise. My role as a project manager dealt with handling Jira,
          getting the right content for developing, managing assets, handling
          issues and changes that were presented during the course all along
          while coding. I also learned that only hard work helps you achieve the
          targets. Now I am working as ReactJS and Native developer and back to
          coding, my passion.
        </CustomText>
        <LoadingComponent loading={loading}>
          {!loading && data !== null && (
            <CustomCarousel images={data} uri={true} />
          )}
        </LoadingComponent>
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
    maxHeight: 240,
    minHeight: 230,
    marginTop: 0,
    marginBottom: 20,
  },
  boyImage: {
    width: "100%",
    height: 240,
    resizeMode: "stretch",
  },
  alertBox: {
    flex: 0.6,
    borderRadius: 10,
    padding: 20,
  },
  alertTitle: {
    fontWeight: "bold",
  },
  alertDescription: {
    marginTop: 10,
  },
});
