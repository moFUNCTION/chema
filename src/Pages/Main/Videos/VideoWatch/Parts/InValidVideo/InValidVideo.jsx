import React from "react";
import AnimationData from "../../../../../../assets/Animation/Main/InValidVideo/Animation - 1706282303148.json";
import { Button, Stack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
export const InValidVideo = ({ err }) => {
  return (
    <Stack alignItems="center" flexDir="column" gap="10px">
      <Lottie
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
        animationData={AnimationData}
      />
      <Button>{err}</Button>
      <Button variant="link">
        <Link to="/main/videos">Return to lessons Home</Link>
      </Button>
    </Stack>
  );
};
