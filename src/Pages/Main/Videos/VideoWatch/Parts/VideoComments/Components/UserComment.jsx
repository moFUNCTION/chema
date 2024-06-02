import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { LanguageDetect } from "../../../../../../../Utils/LanguageDetect/LanguageDetect";
export const UserComment = ({ comment, user }) => {
  const lg = LanguageDetect(comment);
  return (
    <Flex
      mb="10px"
      bgColor={user.isAdmin ? "blue.100" : "gray.200"}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      w="100%"
      p="10px"
      maxW="500px"
      alignItems="center"
      gap="10px"
      dir={lg === "Arabic" ? "rtl" : "ltr"}
      ml={lg != "English" && "auto"}
      pos="relative"
    >
      <Avatar src={user.photoURL} size="md" name={user.email} />
      <Box>
        <Heading
          display="flex"
          alignItems="center"
          gap="5px"
          size="xs"
          color="gray.800"
          flexWrap="wrap"
        >
          {user.email}
          {user.isAdmin && (
            <Badge colorScheme="orange" p="3px">
              admin 👨‍🎓
            </Badge>
          )}
        </Heading>
        <Text>{comment}</Text>
      </Box>
    </Flex>
  );
};
