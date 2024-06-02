import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ImageProfile from "../../../../../../assets/PersonalPhotos/357728627_3273798242911760_6298718609730822500_n.jpg";
import {
  CommentOutlined,
  LikeFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { LanguageDetect } from "../../../../../../Utils/LanguageDetect/LanguageDetect";
export const VideoData = ({ title, description }) => {
  const HandleRedrectToComments = () => {
    window.scrollTo(0, 700);
  };
  const lg = LanguageDetect(title);
  return (
    <Box borderRadius="lg" bgColor="gray.300" w="100%" p="10px">
      <Flex
        border="1px"
        borderColor="gray.400"
        alignItems="center"
        justifyContent="space-between"
        p="10px"
        borderRadius="lg"
        flexWrap="wrap"
        gap="10px"
      >
        <Flex alignItems="center" gap="10px">
          <Avatar src={ImageProfile} />
          <Badge p="5px">mrs Eman Chemistry</Badge>
        </Flex>
        <ButtonGroup>
          <IconButton colorScheme="blue">
            <LikeFilled />
          </IconButton>
          <IconButton onClick={HandleRedrectToComments}>
            <CommentOutlined />
          </IconButton>
          <IconButton colorScheme="whatsapp">
            <WhatsAppOutlined />
          </IconButton>
        </ButtonGroup>
      </Flex>
      <Box p="5px" dir={lg === "Arabic" ? "rtl" : "ltr"}>
        <Heading size="lg">{title}</Heading>
        <Text>{description}</Text>
      </Box>
    </Box>
  );
};
