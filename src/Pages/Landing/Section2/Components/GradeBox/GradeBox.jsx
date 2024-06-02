import {
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { LazyImage } from "../../../../../Components/LazyImage/LazyImage";
import { useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { AnimatedText } from "../../../../../Components/AnimatedText/AnimatedText";

export const GradeBox = ({ image, Title, Description }) => {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <Card
      maxW="sm"
      variant="outline"
      ref={ref}
      opacity={inView ? 1 : 0}
      sx={{
        translate: `0px ${inView ? "0" : "50"}px`,
      }}
      transition="0.3s"
      _hover={{
        ".card-image": {
          _after: {
            transform: "scaleY(100%)",
          },
          img: {
            filter: "saturate(1.3)",
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <CardBody className="card-body">
        <Box
          pos="relative"
          _after={{
            content: `""`,
            pos: "absolute",
            w: "100%",
            h: "100%",
            transform: "scaleY(0%)",
            transformOrigin: "bottom",
            inset: "0px",
            bgColor: "gray.200",
            opacity: "0.2",
            transition: "0.3s",
          }}
          h="320px"
          className="card-image"
          overflow="hidden"
        >
          <LazyImage
            SkeletonProps={{
              w: "100%",
              minH: "300px",
            }}
            ImageProps={{
              alt: Title,
            }}
            src={image}
            fade={2}
          />
        </Box>

        <Stack mt="6" spacing="3">
          <Heading as="h3" size="lg">
            {Title}
          </Heading>
          <AnimatedText spacing="4px">
            <Text>{Description}</Text>
          </AnimatedText>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button as={Link} to="/login" variant="solid" colorScheme="blue">
            Join Us
          </Button>
          <Button variant="outline" colorScheme="blue">
            More Information
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
