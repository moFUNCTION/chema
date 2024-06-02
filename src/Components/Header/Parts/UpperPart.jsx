import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React from "react";
import {
  FieldTimeOutlined,
  VideoCameraAddOutlined,
  BookOutlined,
} from "@ant-design/icons";
export const UpperPart = () => {
  const UnderLine = {
    content: `""`,
    pos: "absolute",
    bottom: "-5px",
    left: "50%",
    translate: "-50% 0%",
    w: "0%",
    h: "2px",
    bgColor: "gray.500",
    transition: "0.3s",
  };
  return (
    <Stack
      display="flex"
      alignItems="center"
      flexDir="row"
      justifyContent="space-evenly"
      flexWrap="wrap"
      p="5px"
      bgColor="gray.300"
      gap="10px"
      pos="relative"
    >
      <Box
        pos="relative"
        _after={UnderLine}
        _hover={{
          _after: {
            w: "100%",
          },
        }}
        display="flex"
        alignItems="center"
        gap="10px"
        fontSize="sm"
      >
        <FieldTimeOutlined />
        <Text>dont waste your time</Text>
      </Box>
      <Box
        pos="relative"
        _after={UnderLine}
        _hover={{
          _after: {
            w: "100%",
          },
        }}
        display="flex"
        alignItems="center"
        gap="10px"
        fontSize="sm"
      >
        <VideoCameraAddOutlined />
        <Text>wacth the lessons many times</Text>
      </Box>
      <Box
        pos="relative"
        _after={UnderLine}
        _hover={{
          _after: {
            w: "100%",
          },
        }}
        display="flex"
        alignItems="center"
        gap="10px"
        fontSize="sm"
      >
        <BookOutlined />
        <Text>there is quizes in the platform</Text>
      </Box>
    </Stack>
  );
};
