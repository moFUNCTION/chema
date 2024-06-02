import { Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { GradeBox } from "./Components/GradeBox/GradeBox";
import FirstGradePhoto from "../../../assets/CousresPhotos/5366119.jpg";
import SecrondGradePhoto from "../../../assets/CousresPhotos/3497819.jpg";
import ThirdGradePhoto from "../../../assets/CousresPhotos/2888950.jpg";
export const Section2 = () => {
  return (
    <Stack
      overflow="hidden"
      className="section2"
      overflowX="hidden"
      pos="relative"
      p="10px"
      borderTop="2px"
      borderTopColor="gray.100"
    >
      <Heading
        textAlign="center"
        w="fit-content"
        pos="relative"
        m="0 auto"
        transition="0.3s"
        _after={{
          content: `""`,
          pos: "absolute",
          h: "2px",
          w: "100%",
          bottom: "0px",
          left: "50%",
          translate: "-50% 0%",
          bgColor: "gray.300",
        }}
        _before={{
          content: `""`,
          pos: "absolute",
          h: "2px",
          w: "100%",
          top: "10px",
          left: "50%",
          translate: "-50% 0%",
          bgColor: "gray.300",
        }}
        fontSize="7xl"
        color="gray.500"
      >
        Grades
      </Heading>
      <Flex flexWrap="wrap" justifyContent="center" mt="10px" gap="10px">
        <GradeBox
          Title="First secondary"
          Description="First Secondary students, embrace the adventure of learning! Let curiosity guide your path and determination be your compass"
          image={FirstGradePhoto}
        />
        <GradeBox
          Title="second secondary"
          Description="Second-year secondary students, fuel your passion for learning! Embrace challenges as stepping stones to success and let each lesson illuminate your academic journey"
          image={SecrondGradePhoto}
        />
        <GradeBox
          Description="Third-year secondary students, soar higher in your academic journey! Embrace challenges with resilience, as each lesson shapes the wings of your educational flight"
          Title="third secondary"
          image={ThirdGradePhoto}
        />
      </Flex>
    </Stack>
  );
};
