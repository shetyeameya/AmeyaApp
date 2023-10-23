import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomText from "../../../components/StyledText";

const About = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          display: "flex",
          padding: "2%",
        }}
      >
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
      </View>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({});
