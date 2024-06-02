import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Flex,
  Heading,
  IconButton,
  Progress,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Tooltip,
  useToast,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuiz } from "../../../../Firebase/Hooks/Quizes/useQuiz[id]/useQuiz";
import { ArrowBackIcon, ArrowForwardIcon, TimeIcon } from "@chakra-ui/icons";
import { useTimer } from "./Hooks/useTimer";
import { useEffect, useReducer } from "react";
import { INITIAL_STATE, QuizReducer } from "./Reducer/QuizReducer";
import { AddToQuizesDone } from "../../../../Firebase/Utils/Quizes/AddToQuizesDone/AddToQuizesDone";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import Lottie from "lottie-react";
import AnimationData from "../../../../assets/Animation/Error/Animation - 1707156954178.json";
const ImageZoomModal = ({ isOpen, onClose, image }) => {
  return (
    <Modal size="xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p="10px">
            <Image w="100%" h="100%" src={image} />
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default function QuizMain() {
  const User = UseUserData();
  const Navigate = useNavigate();
  const toast = useToast();
  const [QuizHandler, dispach] = useReducer(QuizReducer, INITIAL_STATE);
  const { id } = useParams();
  const QuizData = useQuiz({
    id: id,
  });
  const {
    isOpen: isOpenImageZoom,
    onOpen: onOpenImageZoom,
    onClose: onCloseImageZoom,
  } = useDisclosure();
  const HandleSubmit = async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const Quistions = QuizData.data.quistions;
      let correctAnswers = 0;
      for (let i = 0; i < Quistions.length; i++) {
        if (
          QuizHandler.answers[i]?.chosedAnswer === Quistions[i].correctAnswer
        ) {
          correctAnswers++;
        }
      }
      const result = {
        value: `${correctAnswers} / ${Quistions.length}`,
        percent: Math.floor((correctAnswers / Quistions.length) * 100),
        correctAnswers,
        WrongAnswers: Quistions.length - correctAnswers,
      };
      sessionStorage.setItem("TheLastQuizResult", JSON.stringify(result));
      const UpdateQuizesDone = await AddToQuizesDone({
        user: User.user.data,
        QuizId: id,
        result,
      });
      User.HandleRender();
      Navigate(`/main/quizes/${id}/result`);
    } catch (err) {
      dispach({
        type: "POST_ERROR",
      });
      toast({
        position: "top-right",
        title: err.message,
        status: "error",
        duration: "try again later",
        isClosable: true,
      });
      console.log(err);
    }
  };
  const { seconds, formattedTime } = useTimer({
    quizTime: +QuizData.data?.time,
    onTimeEnd: HandleSubmit,
  });
  const HandleMoveNext = () => {
    dispach({
      type: "HANDLE_MOVE_NEXT",
    });
  };
  const HandleMoveBack = () => {
    dispach({
      type: "HANDLE_MOVE_PREVIOUS",
    });
  };
  const HandleChooseAnswer = (value) => {
    dispach({
      type: "HANDLE_CHOOSE_ANSWER",
      payload: {
        id: QuizHandler.answers[QuizHandler.quistionNumber]?.id,
        chosedAnswer: value,
      },
    });
  };
  return (
    <>
      <ImageZoomModal
        image={QuizData.data?.quistions[QuizHandler.quistionNumber].image}
        isOpen={isOpenImageZoom}
        onClose={onCloseImageZoom}
      />
      <Stack {...StackContainerStyles}>
        {QuizData.loading && <CircularProgress isIndeterminate />}
        {QuizData.error && (
          <>
            <Lottie
              animationData={AnimationData}
              style={{ width: "100%", maxWidth: "400px" }}
            />
            <Heading as="h3" size="md">
              {QuizData.error}
            </Heading>
          </>
        )}
        {!QuizData.loading && !QuizData.error && (
          <Box {...QuizBoxStyles}>
            <Flex justifyContent="space-between" alignItems="center" mb="10px">
              <Text color="gray.500" fontWeight="700">
                quistion {QuizHandler.quistionNumber + 1} /
                {QuizData.data?.quistions?.length}
              </Text>
              <Badge
                colorScheme={
                  seconds > (QuizData.data?.time * 60) / 2
                    ? "green"
                    : seconds > 10
                    ? "yellow"
                    : "red"
                }
                {...TimerBadgeStyles}
              >
                {formattedTime}
                <TimeIcon />
              </Badge>
            </Flex>

            <Heading as="h3" size="md">
              {QuizData.data.quistions[QuizHandler.quistionNumber].question}
            </Heading>
            {QuizData.data.quistions[QuizHandler.quistionNumber].image && (
              <Image
                mt="10px"
                w="100%"
                h="200px"
                objectFit="contain"
                bgColor="gray.100"
                src={QuizData.data.quistions[QuizHandler.quistionNumber].image}
                borderRadius="lg"
                p="10px"
                onClick={onOpenImageZoom}
              />
            )}

            <RadioGroup
              value={
                QuizHandler.answers[QuizHandler.quistionNumber]?.chosedAnswer
              }
              onChange={HandleChooseAnswer}
            >
              <Stack w="100%" mt="20px" gap="15px">
                <Box {...AnswerBoxStyle}>
                  <Radio
                    w="100%"
                    value={
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer1
                    }
                    colorScheme="blue"
                  >
                    {
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer1
                    }
                  </Radio>
                </Box>
                <Box {...AnswerBoxStyle}>
                  <Radio
                    w="100%"
                    value={
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer2
                    }
                    colorScheme="blue"
                  >
                    {
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer2
                    }
                  </Radio>
                </Box>
                <Box {...AnswerBoxStyle}>
                  <Radio
                    w="100%"
                    value={
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer3
                    }
                    colorScheme="blue"
                  >
                    {
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer3
                    }
                  </Radio>
                </Box>
                <Box {...AnswerBoxStyle}>
                  <Radio
                    w="100%"
                    value={
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer4
                    }
                    colorScheme="blue"
                  >
                    {
                      QuizData.data.quistions[QuizHandler.quistionNumber]
                        .answer4
                    }
                  </Radio>
                </Box>
              </Stack>
            </RadioGroup>
            <Box pos="relative">
              <Progress
                border="2px"
                borderColor="gray.200"
                transition="0.3s"
                {...ProgressBardStyles}
                value={
                  (QuizHandler.answers.length /
                    QuizData.data?.quistions.length) *
                  100
                }
              />
              <Text
                pos="absolute"
                top="50%"
                left="50%"
                sx={{
                  translate: "-50% -50%",
                }}
                fontWeight="700"
                color={
                  QuizHandler.answers.length >=
                  QuizData.data?.quistions.length / 2
                    ? "white"
                    : "blue.500"
                }
              >
                {Math.ceil(
                  (QuizHandler.answers.length /
                    QuizData.data?.quistions.length) *
                    100
                )}
                %
              </Text>
            </Box>
            <ButtonGroup mt="10px" w="100%" justifyContent="center">
              <Button
                isDisabled={QuizHandler.quistionNumber === 0}
                onClick={HandleMoveBack}
                colorScheme="blue"
              >
                <ArrowBackIcon />
              </Button>
              {QuizHandler.quistionNumber + 1 ===
              QuizData.data?.quistions.length ? (
                <Tooltip
                  label={
                    QuizHandler.answers.length !==
                    QuizData.data?.quistions.length
                      ? "you have to complete all the quistions"
                      : "submit the quiz"
                  }
                >
                  <Button
                    isDisabled={
                      QuizHandler.answers.length !==
                      QuizData.data?.quistions.length
                    }
                    colorScheme="green"
                    isLoading={QuizHandler.post_req.loading}
                    onClick={HandleSubmit}
                  >
                    submit
                  </Button>
                </Tooltip>
              ) : (
                <Button onClick={HandleMoveNext} colorScheme="blue">
                  <ArrowForwardIcon />
                </Button>
              )}
            </ButtonGroup>
          </Box>
        )}
      </Stack>
    </>
  );
}
// styles
const StackContainerStyles = {
  p: "10px",
  minH: "calc(100vh - 72px)",
  alignItems: "center",
  justifyContent: "center",
  pos: "relative",
  overflow: "hidden",
  bgColor: "gray.100",
};
const QuizBoxStyles = {
  border: "2px",
  borderColor: "gray.200",
  p: "20px",
  w: "100%",
  maxW: "650px",
  borderRadius: "lg",
  bgColor: "white",
};
const TimerBadgeStyles = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  fontSize: "md",
  paddingBlock: "4px",
  paddingInline: "10px",
  borderRadius: "lg",
};
const AnswerBoxStyle = {
  borderRadius: "lg",
  p: "15px",
  w: "100%",
  bgColor: "gray.100",
  fontWeight: "600",
  transition: "0.2s",
  border: "1px",
  borderColor: "transparent",
  _hover: {
    bgColor: "gray.200",
    borderColor: "gray.400",
    transform: "scale(1.01)",
  },
};
const ProgressBardStyles = {
  mt: "10px",
  colorScheme: "blue",
  borderRadius: "lg",
  height: "32px",
};
