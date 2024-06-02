import React, { useState } from "react";
import { useCourse } from "./../../../../Firebase/Hooks/Courses/useCourse[id]/useCourse";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  Image,
  Flex,
  Box,
  Heading,
  Text,
  Skeleton,
  Tag,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useCollectionCount } from "../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  VideoCameraOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { PurchaseCourse } from "../../../../Firebase/Utils/Courses/PurchaseCourse/PurchaseCourse";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import { useCoursePurchaseExistValidation } from "../../../../Firebase/Hooks/Courses/useCourseExistValidation/useCoursePurchaseExistValidation";
import { StyledLoader } from "../../../../Components/StyledLoader/StyledLoader";
export default function CoursePurchase() {
  const toast = useToast({
    position: "top-right",
    duration: 3000,
    isClosable: true,
  });
  const Navigate = useNavigate();
  const { courseId } = useParams();
  const { user, HandleRender } = UseUserData();
  const { data, loading, error } = useCourse({
    id: courseId,
  });
  const {
    count: lectuesCount,
    loading: LecturesCountLoading,
    error: LecturesCountError,
  } = useCollectionCount({
    collectionName: `courses/${courseId}/lessons`,
  });
  const {
    count: quizesCount,
    loading: QuizesCountLoading,
    error: QuizesCountError,
  } = useCollectionCount({
    collectionName: `courses/${courseId}/quizes`,
  });
  const { status: checkIfPurchasedStatus, isPurchased } =
    useCoursePurchaseExistValidation({
      courseId,
      userId: user.data.uid,
    });
  const [purchaseLoadingEvent, setPurchaseLoadingEvent] = useState(false);
  const HandlePurchase = async () => {
    try {
      setPurchaseLoadingEvent(true);
      await PurchaseCourse({
        CourseId: courseId,
        userId: user.data?.uid,
      });
      setPurchaseLoadingEvent(false);
      toast({
        title: "purchased successfully",
        description: "the course is un locked",
        status: "success",
      });
      HandleRender();
      Navigate("/main/user/coursesPurchased");
    } catch (err) {
      setPurchaseLoadingEvent(false);
      toast({
        title: "Error",
        description: err.message,
        status: "error",
      });
    }
  };

  if (checkIfPurchasedStatus === "loading" || loading) {
    return <StyledLoader />;
  }

  return (
    <Skeleton
      as={Flex}
      fadeDuration={3}
      isLoaded={checkIfPurchasedStatus === "idle" && !loading}
      gap="5"
      p="6"
      alignContent="center"
      justifyContent="center"
      pos="relative"
      flexWrap="wrap"
      minH="calc(100vh - 70px)"
    >
      <Box
        bgColor="blue.800"
        w="100%"
        h="100%"
        pos="absolute"
        top="0px"
        zIndex="-1"
        overflow="hidden"
        _before={{
          content: `""`,
          pos: "absolute",
          w: "100%",
          h: "100%",
          boxShadow: "0px 0px 50px 30px black",
          bottom: "-100%",
        }}
      >
        <Image
          w="100%"
          h="100%"
          opacity="0.25"
          transition="0.3s"
          src={data?.image}
          objectFit="cover"
          loading="lazy"
          decoding="async"
        />
      </Box>
      <Box
        bgColor="gray.200"
        overflow="hidden"
        borderRadius="lg"
        w="100%"
        maxW="600px"
        _hover={{
          img: {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={data?.image}
          decoding="async"
          h="100%"
          w="100%"
          loading="lazy"
          objectFit="cover"
          transition="0.3s"
        />
      </Box>

      <Stack w="100%" maxW="300px" color="white">
        <Heading size="md">{data?.title}</Heading>
        <Text>{data?.description}</Text>
        <Text>Includes</Text>
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
        <Button gap="10px" alignItems="center" size="sm" colorScheme="red">
          Watch promo video <VideoCameraOutlined />
        </Button>
        {isPurchased ? (
          <>
            <Text
              fontWeight="600"
              borderRadius="md"
              bgColor="green.500"
              p="10px"
            >
              You have Purchased this Course Before
            </Text>
            <Button as={Link} to={`user/coursesPurchased/${courseId}`} gap="3">
              Go to Course
              <ArrowRightOutlined />
            </Button>
          </>
        ) : (
          <>
            <Button colorScheme="teal">Price : {data?.points}EG</Button>
            <Button
              onClick={HandlePurchase}
              isLoading={purchaseLoadingEvent}
              colorScheme="orange"
              gap="10px"
            >
              <ArrowRightOutlined />
              Purchase For {data?.points} points
              <ArrowLeftOutlined />
            </Button>
            <Button
              as={Link}
              to="https://wa.me/+201015577851"
              target="_blank"
              gap="10px"
              colorScheme="green"
            >
              Get Points <WhatsAppOutlined />
            </Button>
          </>
        )}
      </Stack>
    </Skeleton>
  );
}
