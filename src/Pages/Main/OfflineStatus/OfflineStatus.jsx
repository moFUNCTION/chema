import Lottie from "lottie-react";
import React from "react";
import AnimationData from "../../../assets/Animation/Error/Animation - 1707156954178.json";
import { Box, Heading, Stack } from "@chakra-ui/react";
export default function OfflineStatus() {
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
      <Heading as="h3">you are offline</Heading>
    </Stack>
  );
}
