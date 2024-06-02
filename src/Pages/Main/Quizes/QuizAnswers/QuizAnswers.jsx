import React from "react";
import { useQuiz } from "../../../../Firebase/Hooks/Quizes/useQuiz[id]/useQuiz";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Heading,
  Skeleton,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";
import { CheckCircleFilled, RightCircleFilled } from "@ant-design/icons";
import AnimationData from "../../../../assets/Animation/Error/Animation - 1707156954178.json";
import Lottie from "lottie-react";
export default function QuizAnswers() {
  const { id } = useParams();
  const Quiz = useQuiz({
    id: id,
  });
  return (
    <Skeleton
      minH="calc(100vh - 74px)"
      isLoaded={!Quiz.loading}
      fadeDuration="2"
      alignItems="center"
      p="10px"
      gap="10px"
    >
      {Quiz.error && (
        <Stack w="100%" alignItems="center" gap="10px">
          <Lottie
            style={{ width: "100%", maxWidth: "400px" }}
            animationData={AnimationData}
          />
          <Heading as="h3" size="lg" color="gray.800">
            {Quiz.error}
          </Heading>
        </Stack>
      )}
      {Quiz.data?.quistions.map((quistion) => {
        return (
          <Box
            bgColor="gray.100"
            borderRadius="md"
            p="10px"
            w="100%"
            key={quistion.id}
          >
            <Heading
              as="h3"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgColor="gray.200"
              p="10px"
              borderRadius="md"
              size="md"
              gap="10px"
            >
              {quistion.question}
              <Button colorScheme="red">Report</Button>
            </Heading>
            <Heading
              as="h3"
              bgColor="green.100"
              p="10px"
              borderRadius="md"
              mt="10px"
              size="md"
            >
              <CheckCircleFilled
                style={{ color: "green", marginRight: "10px" }}
              />
              {quistion.correctAnswer}
            </Heading>
          </Box>
        );
      })}
    </Skeleton>
  );
}
