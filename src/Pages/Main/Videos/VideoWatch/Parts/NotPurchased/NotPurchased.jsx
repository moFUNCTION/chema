import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React from "react";
import AnimationData from "../../../../../../assets/Animation/Main/NotPurchased/Animation - 1706236709446.json";
export const NotPurchased = () => {
  return (
    <Stack
      p="10px"
      alignItems="center"
      justifyContent="center"
      borderRadius="md"
    >
      <Box
        maxH="400px"
        bgColor="gray.100"
        borderRadius="md"
        overflow="hidden"
        _hover={{
          ".lottie-animation": {
            transform: "scale(1.05)",
          },
        }}
      >
        <Lottie
          style={{
            width: "100%",
            maxWidth: "400px",
            transition: "0.3s",
          }}
          className="lottie-animation"
          animationData={AnimationData}
        />
      </Box>
      <Button mt="10px">you have not purchased this video</Button>
    </Stack>
  );
};
