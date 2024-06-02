import {
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  AvatarGroup,
  Avatar,
  Text,
  Button,
  AvatarBadge,
  Stack,
} from "@chakra-ui/react";
import Logo from "../../assets/Logo/Chema__1_-removebg-preview.png";
import { GridSystem } from "../../Layouts/GridSystem/GridSystem";
import MohassanImage from "../../assets/PersonalPhotos/3ddeea5c-128e-4d10-9bfe-cf728468f85b.jpg";
import MrsEmainPhoto from "../../assets/PersonalPhotos/405802900_3571008029804928_5895105976262043392_n.jpg";
import AhmedWael from "../../assets/PersonalPhotos/420061590_3606815942890803_7173994549547719943_n.jpg";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
export const Footer = () => {
  const Members = [
    {
      name: "mrs-eman",
      url: MrsEmainPhoto,
    },
    {
      name: "mohassan",
      url: MohassanImage,
    },
    {
      name: "ahmed wael",
      url: AhmedWael,
    },
  ];
  return (
    <GridSystem
      phone="700px"
      ipad="1100px"
      sx={{
        bgColor: "gray.100",
        minH: "300px",
        p: "10px",
        gap: "10px",
        borderTop: "2px",
        borderTopColor: "gray.200",
      }}
    >
      <GridItem p="10px" bgColor="gray.50">
        <Image src={Logo} w="100px" />
        <Flex minH="40px" alignItems="center" gap="10px" mt="10px">
          <Heading color="blue.800" fontSize="xl">
            Devolped by mohamed hassan
          </Heading>
        </Flex>
        <Heading mt="10px" color="blue.800" fontSize="lg">
          @All Copy Rights Reserved @2023
        </Heading>
      </GridItem>
      <GridItem p="10px" bgColor="gray.50">
        <Flex alignItems="center" gap="15px" mt="15px">
          <Avatar src={Members[0].url}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontWeight="700" color="blue.800" fontSize="xl">
              Owned By Dr Eman
            </Text>
            <Text fontWeight="500" fontSize="sm" color="gray.600">
              experiance 15 + years in teaching chemistry for secondary grades
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" gap="15px" mt="15px">
          <Avatar src={Members[1].url}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontWeight="700" color="blue.800" fontSize="xl">
              Devolped by mohassan
            </Text>
            <Text fontWeight="500" fontSize="sm" color="gray.600">
              full stack devolper (mern stack)
            </Text>
            <a
              style={{ display: "block" }}
              href="https://mohassan.vercel.app/"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                fontWeight="500"
                fontSize="sm"
                color="gray.600"
                variant="link"
              >
                Click here to go to my portifilio
              </Button>
            </a>
            <a
              style={{ display: "block" }}
              href="https://www.facebook.com/profile.php?id=100089046975628"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                fontWeight="500"
                fontSize="sm"
                color="gray.600"
                variant="link"
              >
                Facebook
              </Button>
            </a>
          </Box>
        </Flex>
        {/* <Flex alignItems="center" gap="15px" mt="15px">
          <Avatar src={Members[2].url}>
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontWeight="700" color="blue.800" fontSize="xl">
              Graphic Designer
            </Text>
            <Text fontWeight="700" color="blue.800">
              🖌️{Members[2].name}
            </Text>
            <a
              style={{ display: "block" }}
              href="https://www.facebook.com/ahmed.wael.9822900"
              target="_blank"
              rel="noreferrer"
            >
              <Button
                fontWeight="500"
                fontSize="sm"
                color="gray.600"
                variant="link"
              >
                Facebook
              </Button>
            </a>
          </Box>
        </Flex> */}
      </GridItem>
      <GridItem
        gap="15px"
        alignItems="start"
        as={Stack}
        p="10px"
        bgColor="gray.50"
      >
        <Heading color="blue.800" size="md">
          website sections
        </Heading>
        {websiteSections.map((link, index) => {
          return (
            <Button as={Link} to={link.href} variant="link" key={index}>
              <ArrowRightIcon style={{ marginRight: "10px" }} /> {link.title}
            </Button>
          );
        })}
      </GridItem>
    </GridSystem>
  );
};
const websiteSections = [
  {
    title: "lessons",
    href: "/main/lessons",
  },
  {
    title: "quizes",
    href: "/main/quizes",
  },
  {
    title: "chat",
    href: "/main/chat",
  },
  {
    title: "about",
    href: "/about",
  },
];
