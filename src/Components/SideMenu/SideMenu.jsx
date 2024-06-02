import { CloseOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { UseUserData } from "../../Context/UserDataProvider/UserDataProvider";
import { AnimatedText } from "../../Components/AnimatedText/AnimatedText";
export const SideMenu = ({ isOpen, onClose }) => {
  const User = UseUserData();
  return (
    <Stack
      pos="fixed"
      zIndex="100000"
      top="0px"
      right="0px"
      bgColor="blue.900"
      w="100%"
      maxW="500px"
      h="100%"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      color="white"
      sx={{
        translate: isOpen ? "0%" : "100% 0%",
      }}
      transition="0.3s"
      p={10}
      gap={6}
    >
      <Box w="100%" pb="10px" borderBottom="1px" borderBottomColor="gray.200">
        <Heading size="xs" color="gray.100">
          Navigation
        </Heading>
      </Box>
      <Stack alignItems="start" w="100%" gap={8}>
        {links.map((link, index) => {
          return (
            <AnimatedText key={index} spacing="10px">
              <Heading
                onClick={onClose}
                animatedwordheight="35px"
                color="white"
                as={Link}
                to={link.href}
                pos="relative"
                w="100%"
                size="2xl"
                _before={{
                  content: `""`,
                  pos: "absolute",
                  left: "0px",
                  bottom: "-10px",
                  w: "0%",
                  h: "2px",
                  bgColor: "gray.200",
                  transition: "0.3s",
                  pointerEvents: "none",
                }}
                _after={{
                  content: `""`,
                  pos: "absolute",
                  left: "0px",
                  bottom: "-10px",
                  w: "100%",
                  h: "2px",
                  bgColor: "rgba(220, 220, 220, 0.201)",
                  transition: "0.3s",
                  pointerEvents: "none",
                }}
                _hover={{
                  _before: {
                    w: "100%",
                  },
                }}
              >
                {link.title}
              </Heading>
            </AnimatedText>
          );
        })}
      </Stack>

      <Stack
        display="flex"
        flexDirection="row"
        pos="absolute"
        bottom="10px"
        right="10px"
        alignItems="center"
        gap="10px"
      >
        {User.user.data ? (
          <Button>
            <Link to="/main/">Go to the main site</Link>
          </Button>
        ) : (
          <Stack>
            <Button
              onClick={onClose}
              colorScheme="blue"
              variant="outline"
              size="sm"
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button onClick={onClose} size="sm" colorScheme="blue">
              Regsiter
            </Button>
          </Stack>
        )}
      </Stack>
      <IconButton
        colorScheme="whiteAlpha"
        borderRadius="50%"
        pos="absolute"
        top="10px"
        right="10px"
        size="lg"
        onClick={onClose}
      >
        <CloseOutlined />
      </IconButton>
    </Stack>
  );
};
const links = [
  { href: "/", title: "Home" },
  { title: "About", href: "/about" },
  {
    title: "Our Location",
    href: "/location",
  },
  {
    title: "Courses",
    href: "/courses",
  },
];
