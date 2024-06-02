import { Heading, Stack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import AnimationData from "../../../assets/Animation/Error/Animation - 1707156954178.json";
export const RefactoringPage = () => {
  return (
    <Stack
      minH="calc(100vh - 80px)"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie
        style={{
          width: "100%",
          maxWidth: "340px",
        }}
        animationData={AnimationData}
      />
      <Heading as="h3" size="md">
        The website is under maintenance
      </Heading>
      <Heading as="h3" size="md">
        الموقع تحت الصيانة الرجاء الانتظار لبعض الدقائق
      </Heading>
    </Stack>
  );
};
