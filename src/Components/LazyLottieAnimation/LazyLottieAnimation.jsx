import React, { Suspense, useEffect, useState } from "react";
import Lottie from "lottie-react";
import { Skeleton } from "@chakra-ui/react";

export const LazyLottieAnimation = ({ ...rest }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const HandleLoad = () => {
    setIsLoaded(true);
  };
  return (
    <Skeleton {...rest.style} fadeDuration={2} isLoaded={isLoaded}>
      <Lottie onEnterFrame={HandleLoad} {...rest} />
    </Skeleton>
  );
};
