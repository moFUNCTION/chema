import {
  Button,
  ButtonGroup,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function QuizResult() {
  const { id } = useParams();
  const result = JSON.parse(sessionStorage.getItem("TheLastQuizResult"));
  return (
    <Stack
      p="10px"
      minH="calc(100vh - 72px)"
      alignItems="center"
      justifyContent="center"
      pos="relative"
      overflow="hidden"
      gap="10px"
    >
      <CircularProgress
        value={result.percent}
        size="200px"
        color={result.percent > 50 ? "green.500" : "red.500"}
      >
        <CircularProgressLabel>{result.percent}%</CircularProgressLabel>
      </CircularProgress>
      <Heading as="h3" color="gray.600" size="lg">
        You Got {result.value}
      </Heading>
      <ButtonGroup mt="10px">
        <Button colorScheme="green">
          Correct Answers {result.correctAnswers}
        </Button>
        <Button colorScheme="red">wrong Answers {result.WrongAnswers}</Button>
      </ButtonGroup>
      <Button colorScheme="teal">
        <Link to={`/main/quizes/${id}/answers`}>Check the correct answers</Link>
      </Button>
      <Button colorScheme="blue">
        <Link to="/main/">Return to Home page</Link>
      </Button>
    </Stack>
  );
}
