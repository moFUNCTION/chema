import React from "react";
import { useLive } from "../../../Firebase/Hooks/Live/useLive/useLive";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import {
  AspectRatio,
  Box,
  CircularProgress,
  Heading,
  Stack,
} from "@chakra-ui/react";
import AnimationData from "../../../assets/Animation/Error/Animation - 1707156954178.json";
import Lottie from "lottie-react";
export default function Live() {
  const User = UseUserData();
  const LiveData = useLive({ grade: User.user.data.grade });
  return (
    <Stack
      w="100%"
      alignItems="center"
      justifyContent="center"
      bgColor="gray.100"
      h="calc(100vh - 72px)"
      flexDir="column"
      pos="relative"
    >
      <CircularProgress
        isIndeterminate
        pos="absolute"
        top="50%"
        left="50%"
        sx={{
          translate: "-50% -50%",
        }}
      />
      {LiveData.data && (
        <AspectRatio overflow="hidden" w="100%" h="100%" ratio={1}>
          <iframe
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
            title="naruto"
            src={LiveData.data?.link}
            allowFullScreen
          />
        </AspectRatio>
      )}
      {LiveData.error && (
        <>
          <Lottie
            animationData={AnimationData}
            style={{ width: "100%", maxWidth: "400px" }}
          />
          <Heading as="h3" size="md">
            {LiveData.error}
          </Heading>
        </>
      )}
    </Stack>
  );
}
