import { Avatar, Badge, Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { AnimatedText } from "../../../../Components/AnimatedText/AnimatedText";

export const UserComment = ({ UserImage, Username, comment }) => {
  return (
    <Box
      minH="200px"
      w="100%"
      maxW="400px"
      bgColor="gray.200"
      borderRadius="lg"
      flexShrink="0"
      scrollSnapAlign="center"
      p="10px"
    >
      <Flex alignItems="center" gap="15px">
        <Avatar src={UserImage} />
        <Box>
          <Heading as="h6" size="sm" color="gray.700">
            {Username}
          </Heading>
          <Badge colorScheme="blue">Student</Badge>
        </Box>
      </Flex>
      <Text mt="10px" fontWeight="600">
        {comment}
      </Text>
    </Box>
  );
};
