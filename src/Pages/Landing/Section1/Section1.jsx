import {
  Stack,
  Image,
  Heading,
  Text,
  Button,
  useMediaQuery,
  Flex,
  Box,
} from "@chakra-ui/react";
import React from "react";
import Background from "../../../assets/Background/patternpad (1).png";
import PersonalImage from "../../../assets/PersonalPhotos/png.png";
import ChemaIcon from "../../../assets/Logo/Chema (2).png";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AnimatedText } from "../../../Components/AnimatedText/AnimatedText";
const BackgroundImage = () => {
  return (
    <Image
      src={Background}
      w="100%"
      h="100%"
      pos="absolute"
      inset="0px"
      zIndex="-1"
      opacity="0.08"
      filter="saturate(0.3)"
      objectFit="cover"
    />
  );
};
export const Section1 = () => {
  const [PhoneQuery] = useMediaQuery("(max-width: 870px)", {
    ssr: true,
    fallback: false,
  });
  const User = UseUserData();
  return (
    <Stack
      className="section1"
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDir="row"
      flexWrap="wrap"
      p="10px"
      pos="relative"
      minH="calc(100vh - 101px)"
      gap="20px"
      overflow="hidden"
    >
      <BackgroundImage />

      <Box pos="relative" w="100%" maxW="380px">
        <Image
          w="100%"
          h="100%"
          src={PersonalImage}
          decoding="async"
          loading="lazy"
        />
      </Box>

      <Stack
        textAlign={PhoneQuery && "center"}
        w="100%"
        maxW="400px"
        className="text"
        p="10px"
      >
        <AnimatedText spacing="4px">
          <Heading
            mb="10px"
            sx={{ fontWeight: "1000" }}
            size="xl"
            color="blue.800"
            animatedwordheight="45px"
            as="h1"
          >
            Dr / eman mahmoud 👩‍🏫👋
          </Heading>
          <Text color="blue.900">
            A platform specialized in learning Chemsitry for secondary grades
          </Text>
        </AnimatedText>

        <Stack
          justifyContent={PhoneQuery && "center"}
          display="flex"
          mt="10px"
          flexDirection="row"
        >
          {User.user.data ? (
            <Flex
              alignItems={PhoneQuery && "center"}
              gap="15px"
              flexDir="column"
            >
              <Heading
                display="flex"
                alignItems="center"
                size="md"
                color="gray.700"
                gap="7px"
                bgColor="white"
                paddingBlock={3}
                paddingInline={5}
                borderRadius="full"
                border="1px"
                borderColor="gray.200"
              >
                Hi {User.user.data.displayName}
                <HeartOutlined />
              </Heading>
              <Button colorScheme="blue" size="lg" borderRadius="full">
                <Link to="/main/">Go To The Main Site</Link>
              </Button>
            </Flex>
          ) : (
            <>
              <Button colorScheme="blue" borderRadius="full" size="lg">
                <Link to="/login">Login</Link>
              </Button>

              <Button
                colorScheme="teal"
                variant="outline"
                borderRadius="full"
                size="lg"
              >
                <Link to="/register">Regsiter</Link>
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
