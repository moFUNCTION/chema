import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import { CloseOutlined } from "@ant-design/icons";
const LessonsHeader = () => {
  return (
    <Heading
      color="gray.600"
      pos="relative"
      size="2xl"
      cursor="pointer"
      _before={{
        content: `""`,
        w: "calc(100% + 10px)",
        h: "2px",
        background: "gray.400",
        pos: "absolute",
        left: "50%",
        top: "-4px",
        translate: "-50% 0%",
        transition: "0.3s",
        transformOrigin: "left",
      }}
      _after={{
        content: `""`,
        w: "calc(100% + 10px)",
        h: "2px",
        background: "gray.400",
        pos: "absolute",
        left: "50%",
        bottom: "-10px",
        translate: "-50% 0%",
        transition: "0.3s",
        transformOrigin: "right",
      }}
      transition="0.3s"
      _hover={{
        _before: {
          transform: "scaleX(0)",
        },
        _after: {
          transform: "scaleX(0)",
        },
        transform: "scale(1.1)",
        color: "gray.500",
      }}
    >
      Lessons
    </Heading>
  );
};
export default function CourseLessons() {
  const { user } = UseUserData();
  return (
    <Stack
      alignItems="center"
      gap="5"
      p="3"
      w="100%"
      h="100%"
      bgColor="gray.100"
    >
      <LessonsHeader />
    </Stack>
  );
}
