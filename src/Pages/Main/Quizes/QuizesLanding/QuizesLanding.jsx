import {
  Box,
  Flex,
  Heading,
  Stack,
  Image,
  CircularProgress,
} from "@chakra-ui/react";
import { QuizCard } from "./Components/QuizCard";
import { useQuizes } from "../../../../Firebase/Hooks/Quizes/useQuizes/useQuizes";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import NoDataImage from "../../../../assets/noData/sapiens.png";
import { useEffect } from "react";
import { useCollectionCount } from "./../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";
const QuizHeader = () => {
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
      Quizes
    </Heading>
  );
};
export default function QuizesLanding() {
  const User = UseUserData();
  const { data, loading, error, HandleGetNext } = useQuizes({
    grade: User.user.data.grade,
    size: 6,
  });
  const {
    count,
    loading: countLoading,
    error: countError,
  } = useCollectionCount({
    collectionName: "quizes",
    GetQuery: `grade == ${User.user.data?.grade}`,
  });
  useEffect(() => {
    const HandleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 30 >=
          document.body.offsetHeight &&
        count !== data.length
      ) {
        HandleGetNext();
      }
    };
    window.addEventListener("scroll", HandleScroll);
    return () => {
      window.removeEventListener("scroll", HandleScroll);
    };
  }, [HandleGetNext]);
  return (
    <Stack p="15px" alignItems="center" gap="30px">
      <QuizHeader />
      <Flex
        p="10px"
        border="2px"
        borderColor="gray.100"
        borderRadius="md"
        w="100%"
        bgColor="gray.50"
        flexWrap="wrap"
        gap="10px"
        justifyContent="center"
      >
        {data?.map((quiz) => {
          return (
            <QuizCard
              key={quiz.id}
              description={quiz.description}
              img={quiz.image}
              title={quiz.title}
              quistionsLength={quiz.quistions.length}
              time={quiz.time}
              createdAt={quiz.createdAt}
              id={quiz.id}
              IsPreformedQuiz={User.user.data.QuizesDone.find((item) => {
                return item.id === quiz.id;
              })}
            />
          );
        })}
      </Flex>
      {data.length === 0 && !loading && (
        <Box w="100%" display="flex" alignItems="center" flexDir="column">
          <Image w="100%" maxW="350px" src={NoDataImage} />
          <Heading as="h3" size="md">
            no quizes found for this grade
          </Heading>
        </Box>
      )}
      {loading && count !== data.length && (
        <CircularProgress m="20px auto" isIndeterminate />
      )}
    </Stack>
  );
}
