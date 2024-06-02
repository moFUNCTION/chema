import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Box, Button, Flex, IconButton, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

export const Carousel = ({ children, step }) => {
  const Carousel = useRef();
  let ScrollValue = 0;
  const ScrollToLeft = () => {
    const width = Carousel.current.scrollWidth - Carousel.current.clientWidth;
    if (ScrollValue > 0) {
      ScrollValue -= step;
    } else {
      ScrollValue = width;
    }
    Carousel.current.scrollTo(ScrollValue, 0);
  };
  const ScrollToRight = () => {
    const width = Carousel.current.scrollWidth - Carousel.current.clientWidth;
    if (width > ScrollValue) {
      ScrollValue += step;
    } else {
      ScrollValue = 0;
    }
    Carousel.current.scrollTo(ScrollValue, 0);
  };
  return (
    <>
      <Stack display="flex" alignItems="center" flexDir="column">
        <Flex
          w="100%"
          className="carousel"
          p="10px"
          mt="20px"
          overflowX="auto"
          gap="10px"
          ref={Carousel}
          scrollBehavior="smooth"
          scrollSnapType="x mandatory"
        >
          {children}
        </Flex>
        <Flex gap="10px">
          <IconButton
            onClick={ScrollToLeft}
            colorScheme="gray"
            borderRadius="50%"
          >
            <LeftOutlined />
          </IconButton>
          <IconButton
            onClick={ScrollToRight}
            colorScheme="gray"
            borderRadius="50%"
          >
            <RightOutlined />
          </IconButton>
        </Flex>
      </Stack>
    </>
  );
};
