import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Flex,
  IconButton,
  Tooltip,
  CircularProgress,
  Badge,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
export const VideoCard = ({
  title,
  Description,
  image,
  points,
  isPurchased,
  isFree,
  id,
  isLoading,
  createdAt,
}) => {
  const PuplishedDate = new Date(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  return (
    <Card maxW="400px" border="1px" pos="relative" borderColor="gray.400">
      <CardBody>
        <ButtonGroup zIndex="10" pos="absolute" top="10px" right="10px">
          <Tooltip label="Add to favourite">
            <IconButton colorScheme="red">
              <HeartFilled />
            </IconButton>
          </Tooltip>
          {isFree && (
            <Tooltip label="the video is for free">
              <Button colorScheme="green">Free</Button>
            </Tooltip>
          )}
        </ButtonGroup>

        <Box
          _hover={{
            img: {
              filter: "saturate(1.5)",
              transform: "scale(1.1)",
            },
          }}
          overflow="hidden"
          borderRadius="md"
          pos="relative"
          border="2px"
          borderColor="gray.300"
        >
          <Image
            src={image}
            alt="image"
            h="230px"
            w="100%"
            transition="0.3s"
            objectFit="cover"
          />
          {isPurchased && (
            <Badge
              pos="absolute"
              top="0px"
              w="100%"
              p="10px"
              colorScheme="green"
            >
              you have purchased this lesson
            </Badge>
          )}
        </Box>
        <Stack mt="6" spacing="3">
          <Text>
            puplished at
            <Badge ml="10px" p="4px" colorScheme="blue">
              {PuplishedDate}
            </Badge>
          </Text>

          <Heading size="md">{title} </Heading>
          <Text>{Description}</Text>
          {!isFree && (
            <Text color="blue.600" fontSize="xl">
              Requerd Points : {points}
            </Text>
          )}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Flex justifyContent="center" w="100%" gap="10px">
          {(!isLoading && isPurchased) || isFree ? (
            <>
              <Button colorScheme="green">
                <Link to={id}>Watch Video</Link>
              </Button>
              <Button colorScheme="blue">Visit Quizes</Button>
            </>
          ) : (
            <>
              <Button variant="solid" colorScheme="blue">
                <Link to={`purchase/${id}`}>Buy now</Link>
              </Button>
              <Button variant="ghost" colorScheme="blue">
                <Link to={`purchase/${id}`}>Details</Link>
              </Button>
            </>
          )}
        </Flex>
      </CardFooter>
    </Card>
  );
};
