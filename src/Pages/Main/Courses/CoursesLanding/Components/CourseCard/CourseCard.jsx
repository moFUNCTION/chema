import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Tag,
  Box,
  Flex,
  Skeleton,
  Badge,
} from "@chakra-ui/react";
import { useCollectionCount } from "../../../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
import { ArrowRightOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { PurchaseCourse } from "../../../../../../Firebase/Utils/Courses/PurchaseCourse/PurchaseCourse";

export const CourseCard = ({
  image,
  title,
  description,
  points,
  id,
  createdAt,
  isPurchased,
}) => {
  const PuplishedDate = new Date(
    createdAt?.seconds * 1000 + createdAt?.nanoseconds / 1000000
  ).toLocaleString();
  const {
    count: lectuesCount,
    loading: LecturesCountLoading,
    error: LecturesCountError,
  } = useCollectionCount({
    collectionName: `courses/${id}/lessons`,
  });
  const {
    count: quizesCount,
    loading: QuizesCountLoading,
    error: QuizesCountError,
  } = useCollectionCount({
    collectionName: `courses/${id}/quizes`,
  });

  return (
    <Card maxW="sm">
      <CardBody>
        <Box
          borderRadius="lg"
          w="100%"
          overflow="hidden"
          _hover={{
            img: {
              transform: "scale(1.1)",
            },
          }}
          h="200px"
          bgColor="gray.200"
        >
          <Image
            src={image}
            alt="image"
            w="100%"
            h="100%"
            objectFit="cover"
            borderRadius="lg"
            transition="0.3s"
          />
        </Box>
        <Stack mt="6" spacing="3">
          <Text>
            puplished at
            <Badge ml="10px" p="4px" colorScheme="blue">
              {PuplishedDate}
            </Badge>
          </Text>
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            price {points}EG
          </Text>
          <Text>includes : </Text>
          <Skeleton
            as={Flex}
            isLoaded={!QuizesCountLoading && !LecturesCountLoading}
            gap="10px"
            fadeDuration={1}
          >
            <Tag>{lectuesCount} lectures</Tag>
            <Tag>{quizesCount} quizes</Tag>
            <Tag>Chapter 3 book</Tag>
          </Skeleton>
          <Button
            gap="10px"
            alignItems="center"
            w="fit-content"
            size="sm"
            colorScheme="red"
          >
            Watch promo video <VideoCameraOutlined />
          </Button>
        </Stack>
      </CardBody>
      <Divider color="gray.200" />
      <CardFooter>
        {isPurchased ? (
          <ButtonGroup w="100%" justifyContent="center" spacing="2">
            <Button as={Link} to={id} gap="3" colorScheme="teal">
              Go To the Course
              <ArrowRightOutlined />
            </Button>
            <Button colorScheme="orange">Analytics</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup w="100%" justifyContent="center" spacing="2">
            <Button
              as={Link}
              to={`${id}/purchase`}
              variant="solid"
              colorScheme="blue"
            >
              Buy now
            </Button>
            <Button
              as={Link}
              to={`${id}/purchase`}
              variant="ghost"
              colorScheme="blue"
            >
              Details
            </Button>
          </ButtonGroup>
        )}
      </CardFooter>
    </Card>
  );
};
