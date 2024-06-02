import React, { useState } from "react";
import {
  CardBody,
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Badge,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { QuestionIcon, TimeIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { UseUserData } from "../../../../../Context/UserDataProvider/UserDataProvider";
const ResultModal = ({ isOpen, onClose, id }) => {
  const User = UseUserData();
  const QuizResult = User.user?.data?.QuizesDone.find((quiz) => {
    return quiz.id === id;
  });
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent alignItems="center">
        <ModalHeader>Quiz Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex alignItems="center" flexWrap="wrap" gap="10px">
            <CircularProgress
              color={QuizResult?.result?.percent > 50 ? "green.500" : "red.500"}
              value={QuizResult?.result?.percent}
              size="120px"
            >
              <CircularProgressLabel>
                {QuizResult?.result?.percent}%
              </CircularProgressLabel>
            </CircularProgress>
            <Box>
              <Text>you got in this exam {QuizResult?.result?.value}</Text>
              <Text>
                correct Answres : {QuizResult?.result?.correctAnswers}
              </Text>
              <Text>wrong Answres : {QuizResult?.result?.WrongAnswers}</Text>
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Close
          </Button>
          <Button variant="ghost" isDisabled>
            Check the answers
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export const QuizCard = ({
  title,
  description,
  time,
  img,
  quistionsLength,
  createdAt,
  id,
  IsPreformedQuiz,
}) => {
  const PuplishedDate = new Date(
    createdAt.seconds * 1000 + createdAt.nanoseconds / 1000000
  ).toLocaleString();
  // Result model
  const [isOpenedResultModel, setIsOpenedResultModel] = useState(false);
  const HandleCloseResultMode = () => {
    setIsOpenedResultModel(false);
  };
  const HandleOpenResultModel = () => {
    setIsOpenedResultModel(true);
  };
  return (
    <>
      <ResultModal
        isOpen={isOpenedResultModel}
        onClose={HandleCloseResultMode}
        id={id}
      />
      <Card
        maxW="400px"
        w="100%"
        pos="relative"
        _hover={{
          ".quistion-number": {
            transform: "scaleY(1)",
          },
          ".quiz-image": {
            filter: "saturate(1.5)",
            transform: "scale(1.1)",
          },
        }}
        border="1px"
        borderColor="gray.200"
      >
        <Badge
          size="md"
          w="fit-content"
          pos="absolute"
          colorScheme="teal"
          top="10px"
          left="10px"
          p="7px"
          fontSize="sm"
          display="flex"
          alignItems="center"
          gap="5px"
          zIndex="10"
        >
          {time} minute
          <TimeIcon />
        </Badge>
        <CardBody>
          <Box
            w="100%"
            h="260px"
            pos="relative"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image
              w="100%"
              h="100%"
              objectFit="cover"
              src={img}
              alt="quiz image"
              className="quiz-image"
              transition="0.3s"
            />
            {IsPreformedQuiz ? (
              <Badge
                w="100%"
                fontSize="md"
                p="7px"
                colorScheme="green"
                pos="absolute"
                bottom="0px"
                transition="0.3s"
                transformOrigin="bottom"
                display="flex"
                alignItems="center"
                gap="5px"
              >
                You have Preformed this Quiz
              </Badge>
            ) : (
              <Badge
                w="100%"
                fontSize="md"
                p="7px"
                colorScheme="teal"
                pos="absolute"
                bottom="0px"
                transition="0.3s"
                transformOrigin="bottom"
                display="flex"
                alignItems="center"
                gap="5px"
                className="quistion-number"
                transform="scaleY(0)"
              >
                {quistionsLength} quistions <QuestionIcon />
              </Badge>
            )}
          </Box>

          <Stack alignItems="start" mt="6" spacing="3">
            <Badge p="5px" colorScheme="blue">
              puplished at {PuplishedDate}
            </Badge>
            <Heading size="md">{title}</Heading>
            <Text>{description}</Text>
          </Stack>
        </CardBody>
        <Divider color="gray.300" />
        <CardFooter>
          <ButtonGroup w="100%" spacing="2">
            {IsPreformedQuiz ? (
              <Button
                onClick={HandleOpenResultModel}
                colorScheme="blue"
                w="100%"
              >
                Your Result in this Quiz
              </Button>
            ) : (
              <>
                <Button variant="solid" colorScheme="blue">
                  <Link to={id}>Preform the Quiz</Link>
                </Button>
                <Button>Details</Button>
              </>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
};
