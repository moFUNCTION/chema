import { Heading, Stack } from "@chakra-ui/react";
import React from "react";
import AnimationData from "../../../../assets/Animation/Error/Animation - 1707156954178.json";
import Lottie from "lottie-react";
export const CourseUnPurchased = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      overflow="auto"
      w="100%"
      bgColor="gray.100"
    >
      <Lottie
        w="100%"
        style={{
          maxWidth: "450px",
        }}
        animationData={AnimationData}
      />
      <Heading size="md">You haven't purchased this course</Heading>
    </Stack>
  );
};
