import { Skeleton, Image } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

export const LazyImage = ({ src, fade, SkeletonProps, ImageProps }) => {
  const [loaded, setLoaded] = useState(false);
  const HandleLoad = () => {
    setLoaded(true);
  };
  return (
    <Skeleton isLoaded={loaded} {...SkeletonProps} fadeDuration={fade}>
      <Image
        transition="0.3s"
        src={src}
        onLoad={HandleLoad}
        w="100%"
        h="100%"
        {...ImageProps}
        loading="lazy"
        decoding="async"
      />
    </Skeleton>
  );
};
