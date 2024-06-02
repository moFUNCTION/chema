import React from "react";
// Chakra components
import {
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  List,
  Button,
} from "@chakra-ui/react";
// lottie inteagrtion
import Lottie from "lottie-react";
import AnimationData from "../../../assets/Animation/Landing/Animation - 1703263538702.json";
export const Section4 = () => {
  return (
    <Stack
      flexWrap="wrap-reverse"
      p="10px"
      display="flex"
      justifyContent="center"
      gap="20px"
      flexDir="row"
      alignItems="center"
      bgColor="#fbfbfb"
    >
      <Accordion w="100%" maxW="500px">
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                What do we Provide in our platform
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            We provide in out plaform
            <List mt="10px">
              <li>
                <Button variant="link">lessons</Button>
              </li>
              <li>
                <Button variant="link">quizes for free</Button>
              </li>
              <li>
                <Button variant="link">chat for students</Button>
              </li>
              <li>
                <Button variant="link">ai chat</Button>
              </li>
            </List>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                what is the purchase method
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            if you want to wath leesons points is required and you get this
            points from code redeem , first you will call the assistant in the
            whatsapp then ask him for points he will give you code , type this
            code in the code redeem box and you will get the points that is
            relative to the money you have paid
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                What is the expire date for the videos
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            you have the ability to watch the videos forever but you cant share
            it or even make your friend watch it
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <Lottie
        style={{ width: "100%", maxWidth: "500px" }}
        animationData={AnimationData}
      />
    </Stack>
  );
};
