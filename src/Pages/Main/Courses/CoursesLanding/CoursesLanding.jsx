import React, { useEffect } from "react";
import { useCourses } from "./../../../../Firebase/Hooks/Courses/useCourses/useCourses";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import {
  Stack,
  Heading,
  CircularProgress,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import { CourseCard } from "./Components/CourseCard/CourseCard";
import { useCollectionCount } from "../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
import { useCoursesPurchased } from "../../../../Firebase/Hooks/Courses/useCoursesPurchased/useCoursesPurchased";
const CourseHeader = () => {
  return (
    <Heading
      color="gray.600"
      pos="relative"
      size="2xl"
      cursor="pointer"
      _before={{
        content: `""`,
        w: "calc(100% + 10px)",
        h: "2px",
        background: "gray.400",
        pos: "absolute",
        left: "50%",
        top: "-4px",
        translate: "-50% 0%",
        transition: "0.3s",
        transformOrigin: "left",
      }}
      _after={{
        content: `""`,
        w: "calc(100% + 10px)",
        h: "2px",
        background: "gray.400",
        pos: "absolute",
        left: "50%",
        bottom: "-10px",
        translate: "-50% 0%",
        transition: "0.3s",
        transformOrigin: "right",
      }}
      transition="0.3s"
      _hover={{
        _before: {
          transform: "scaleX(0)",
        },
        _after: {
          transform: "scaleX(0)",
        },
        transform: "scale(1.1)",
        color: "gray.500",
      }}
    >
      Courses
    </Heading>
  );
};
export default function CoursesLanding() {
  const User = UseUserData();
  const {
    data,
    loading,
    error,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page,
  } = useCourses({
    grade: User?.user?.data?.grade,
    size: 6,
  });
  const {
    count,
    loading: countLoading,
    error: countError,
  } = useCollectionCount({
    collectionName: `courses`,
    GetQuery: `grade == ${User.user.data?.grade}`,
  });
  const pagesNumber = Math.ceil(count / 6);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  const coursesPurchased = useCoursesPurchased({
    userID: User.user?.data?.uid,
  });

  return (
    <Stack gap="7" alignItems="center" p="10px">
      {loading && <CircularProgress isIndeterminate />}
      <CourseHeader />
      <Flex
        borderRadius="lg"
        justifyContent="center"
        gap="2"
        p="10px"
        flexWrap="wrap"
        bgColor="gray.100"
        w="100%"
      >
        {data?.map((course) => {
          return (
            <CourseCard
              isPurchased={
                coursesPurchased.data.find((doc) => {
                  return doc.id === course.id;
                })
                  ? true
                  : false
              }
              key={course.id}
              {...course}
            />
          );
        })}
      </Flex>
      <Flex
        gap="10px"
        alignItems="center"
        p="10px"
        w="100%"
        justifyContent="center"
      >
        <Button
          isLoading={loading}
          isDisabled={page === 0}
          onClick={HandleGetPreviousPage}
          colorScheme="blue"
        >
          Prev
        </Button>
        <Text>
          page {page + 1} of {pagesNumber}
        </Text>
        <Button
          isDisabled={page + 1 >= pagesNumber}
          isLoading={loading}
          onClick={HandleGetNextPage}
          colorScheme="blue"
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
}
