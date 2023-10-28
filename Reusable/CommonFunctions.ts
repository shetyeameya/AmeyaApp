import { EXPO_PUBLIC_IMAGES_URL, EXPO_PUBLIC_SECRET_KEY } from "@env";

type Bucket = "family" | "romeo" | "food" | "sports";

export const getImages = async (bucket: Bucket) => {
  try {
    const url = process.env.EXPO_PUBLIC_IMAGES_URL;
    const response = await fetch(`${EXPO_PUBLIC_IMAGES_URL}/${bucket}`, {
      method: "GET",
      headers: {
        Authorization: EXPO_PUBLIC_SECRET_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      //   console.log("entere1", response);
      return null;
    }

    const imageList = await response.json();
    if (imageList && imageList.length > 0) {
      //   console.log("entere22221", imageList);
      return imageList;
    }
  } catch (error: any) {
    console.log("error entered");
    // console.error("error:::", error);
    // setData(null);
    return null;
  }
};
