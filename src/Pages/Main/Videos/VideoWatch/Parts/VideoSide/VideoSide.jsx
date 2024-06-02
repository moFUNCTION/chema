import { AspectRatio, Box, CircularProgress, Skeleton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import VideoPlayer from "./Player/VideoPlayer";

export const VideoSide = ({ VideoSrc, ImageSrc, isLoading, withIframe }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      bgColor="gray.200"
      p="10px"
      w="100%"
      borderRadius="md"
      pos="relative"
    >
      {withIframe ? (
        <>
          <AspectRatio
            borderRadius="md"
            pos="relative"
            zIndex="2"
            maxW="800px"
            ratio={16 / 9}
            w="100%"
          >
            <iframe
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowFullScreen={true}
              loading="lazy"
              src={VideoSrc}
            />
          </AspectRatio>
          <CircularProgress
            isIndeterminate
            pos="absolute"
            zIndex="1"
            left="50%"
            top="50%"
            sx={{
              translate: "-50% -50%",
            }}
          />
        </>
      ) : (
        <Skeleton
          isLoaded={!isLoading}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          w="100%"
          maxW="800px"
          borderRadius="md"
          overflow="hidden"
          fadeDuration="2"
        >
          <VideoPlayer image={ImageSrc} source={VideoSrc} />
        </Skeleton>
      )}
    </Box>
  );
};
