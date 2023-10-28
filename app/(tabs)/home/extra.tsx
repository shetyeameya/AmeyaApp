import { ScrollView, StyleSheet, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useThemeColor, View } from "../../../components/Themed";
import CustomText from "../../../components/StyledText";
import CustomCarousel from "../../../Reusable/ImageCaro";
import List from "../../../fakeData/List.json";
import { tintColorDark, tintColorLight } from "../../../constants/Colors";
import { getImages } from "../../../Reusable/CommonFunctions";
import LoadingComponent from "../../../Reusable/Loading";
const staticImage = require("../../../assets/imagesAssets/ameyaTrophy.png");

type Bucket = "family" | "romeo" | "food" | "sports";
const Extra = () => {
  const tintColor = useThemeColor(
    { light: tintColorLight, dark: tintColorDark },
    "tint"
  );
  const [sportsdata, setsportsdata] = useState<string[] | null>(null);
  const [fooddata, setfooddata] = useState<string[] | null>(null);
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const getImagesList = async (bucket: Bucket) => {
      const response = await getImages(bucket);
      if (bucket === "sports") {
        if (response !== null) {
          setsportsdata(response);
        } else {
          setsportsdata(null);
        }
      } else {
        if (response !== null) {
          setfooddata(response);
        } else {
          setfooddata(null);
        }
      }
    };

    getImagesList("food");
    getImagesList("sports");
  }, []);
  console.log("hello");
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          padding: "2%",
        }}
      >
        <View style={[styles.container, { backgroundColor: tintColor }]}>
          {/* Image of the boy */}
          <View
            style={{
              flex: 0.4,
              backgroundColor: tintColor,
            }}
          >
            <Image source={staticImage} style={[styles.boyImage]} />
          </View>
          {/* Text Alert View */}
          <View style={[styles.alertBox, { backgroundColor: tintColor }]}>
            <CustomText size={18} style={styles.alertTitle}>
              "Passion overcomes odds."
            </CustomText>
            <CustomText size={16} style={styles.alertTitle}>
              It's not over till its over.
            </CustomText>
          </View>
        </View>
        {/* Education */}
        <CustomText size={12}>
          Today, as I look back, I feel I have come a long way from being an
          inquisitive little child.What is more, today, apart from academic
          excellence the requirement for an all round personality of a
          professional is a must and of course an added advantage. Sure footed
          and focused as a student I have been captain of senior school, winning
          the All Round Student award multiple times. Passionate about sports I
          have been an avid player of football and cricket winning several
          awards and certificates. I have also had the fine privilege of being
          the General Coordinator of the technical and cultural festival of my
          college. As the Cultural General Coordinator, I worked diligently to
          prove my mettle and earn accolades for myself. All these activities
          have indicated my diverse choices for work. I look upon all these
          experiences as opportunities where I could gauge my own plusses and
          areas where I needed to enhance my output. This apart, participation
          in many co-curricular activities has added a positive note to my
          character.
        </CustomText>
        {/* Cooking */}
        <LoadingComponent loading={loading}>
          {!loading && fooddata !== null && (
            <CustomCarousel images={fooddata} uri={true} />
          )}
        </LoadingComponent>
        <CustomText size={12}>
          Cooking has always been my passion, and I owe much of this fervor to
          my mother. She never really pushed me towards the culinary arts;
          instead, it was the mouthwatering dishes she prepared that piqued my
          curiosity. Every meal she made was nothing short of spectacular,
          igniting an inquisitiveness in me about the magic she worked in the
          kitchen. Gradually, I found myself observing her more closely,
          absorbing her expertise, and taking mental notes of her unique cooking
          tricks. Every weekend became an opportunity for me to experiment with
          new dishes and indulge in tasting menus at different restaurants.
        </CustomText>
        <CustomText size={12}>
          Over the years, my skills in the kitchen have sharpened, especially in
          the realm of Maharashtrian cuisine. The dish I'm most proud of is the
          "Kombadi Wade," a tantalizing testament to Malvani flavors from the
          coastal region of Maharashtra. Comprising succulent chicken rassa,
          aromatic pandhara rassa, and fluffy wade, this dish is a delightful
          medley of flavors and textures. For those unfamiliar, Malvani cuisine,
          native to Maharashtra, is renowned for its rich and spicy gravies,
          enhanced with the distinct flavors of coastal ingredients.
        </CustomText>
        <CustomText size={12}>
          To quote the renowned chef Julia Child, "The measure of achievement is
          not winning awards. It's doing something that you appreciate,
          something you believe is worthwhile." Just like her, I believe in the
          transformative power of food. Another famous chef, Gordon Ramsay, once
          said, "Cooking is about passion, so it may look slightly
          temperamental." Drawing inspiration from these culinary stalwarts, I
          continue my gastronomic journey, always eager to learn and savor every
          moment in the kitchen.
        </CustomText>
        {/* Cricket */}
        <LoadingComponent loading={loading}>
          {!loading && sportsdata !== null && (
            <CustomCarousel images={sportsdata} uri={true} />
          )}
        </LoadingComponent>
        <CustomText size={12}>
          From a young age, my heart has been ensnared by two sports: cricket
          and football. My prowess in both games was recognized early on, as
          evidenced by my selection for the prestigious Shivaji Park Gymkhana,
          where I emerged as a chosen talent among a staggering 650 students.
          Representing both my school and college in these sports wasn't just an
          honor but also a testament to my dedication and skills. Over the
          years, my shelves became adorned with numerous medals, each one
          symbolizing perseverance, hard work, and passion. But it's not just
          about playing; I'm an ardent supporter of Manchester United, a love
          affair that began in childhood. Their iconic "never give up" ethos
          deeply resonates with me. Both cricket and football have instilled in
          me the unwavering belief that it's not over until the final whistle or
          the last ball. In the face of challenges, on and off the field,
          surrendering was never an option; it was these sports that fortified
          this resilience in my character.
        </CustomText>
      </View>
    </ScrollView>
  );
};

export default Extra;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    height: "100%",
    maxHeight: 180,
    minHeight: 130,
    marginTop: 50,
    marginBottom: 20,
  },
  boyImage: {
    position: "absolute",
    left: 0,
    top: -145,
    width: "100%",
    height: 210,
    resizeMode: "cover",
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
