import {
  Avatar,
  Box,
  Image,
  Flex,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";

export const UserMessage = ({
  fromMe,
  isAdmin,
  message,
  username,
  email,
  photoURL,
  image,
}) => {
  return (
    <Box
      bgColor="white"
      p="10px"
      display="flex"
      flexDir="column"
      alignItems="start"
      gap="10px"
      maxW="300px"
      w="100%"
      borderRadius="lg"
      pos="relative"
      marginLeft={fromMe && "auto"}
    >
      <Flex gap="5px">
        <Tag size="lg" colorScheme="blue" borderRadius="full">
          <Avatar
            src={photoURL}
            size="xs"
            name={username || email}
            ml={-1}
            mr={2}
          />
          <TagLabel>{username || email}</TagLabel>
        </Tag>
        {isAdmin && (
          <Tag size="lg" colorScheme="yellow" borderRadius="full">
            <TagLabel>
              Admin
              <UserOutlined style={{ marginLeft: "10px" }} />
            </TagLabel>
          </Tag>
        )}
      </Flex>

      <Text>{message}</Text>
      {image && (
        <>
          <Link target="_blank" to={image} style={{ width: "100%" }}>
            <Image
              filter="saturate(1.4)"
              h="150px"
              w="100%"
              objectFit="cover"
              src={image}
            />
          </Link>
        </>
      )}
    </Box>
  );
};
