import React from "react";
import PersonalImage1 from "../../assets/PersonalPhotos/cover.jpg";
import PersonalImage2 from "../../assets/PersonalPhotos/424578794_240936435750034_2131422154780827845_n.jpg";
import {
  Stack,
  Image,
  Flex,
  Text,
  Box,
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import { AnimatedText } from "../../Components/AnimatedText/AnimatedText";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <Stack gap="0" bgColor="blue.900">
      <Image
        loading="lazy"
        decoding="async"
        src={PersonalImage1}
        objectFit="contain"
        backgroundRepeat="no-repeat"
        maxH="400px"
        bgColor="#0b77cf"
      />
      <Flex
        flexWrap="wrap-reverse"
        p="20px"
        justifyContent="center"
        gap="30px"
        alignItems="center"
        pos="relative"
        zIndex="2"
      >
        <div className="custom-shape-divider-top-1711771384">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            />
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            />
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              className="shape-fill"
            />
          </svg>
        </div>

        <Box w="100%" maxW="500px">
          <AnimatedText spacing="6px">
            <Text fontSize="md" fontWeight="700" color="white">
              Embark on a transformative journey into the world of chemistry
              with our distinguished educator, boasting over 15 years of
              invaluable experience. Unlock the secrets of the periodic table
              and delve into the mysteries of chemical reactions under the
              expert guidance of our seasoned chemistry teacher. With a passion
              for fostering a deep understanding of the subject, our instructor
              brings a wealth of knowledge, practical insights, and a proven
              track record of success. Whether you're a budding scientist or
              seeking to master the intricacies of chemical equations, our
              teacher's commitment to excellence ensures a dynamic and engaging
              learning environment. Join us on a captivating educational
              odyssey, where theory meets real-world application, and witness
              the magic of chemistry come to life. Your academic success awaits
              – enroll now for an unparalleled educational experience! 🔍🧪✨
            </Text>
          </AnimatedText>

          <Button as={Link} to="/login" mt="10px" colorScheme="whiteAlpha">
            Join us
          </Button>
        </Box>

        <Box
          borderRadius="lg"
          overflow="hidden"
          _hover={{
            img: {
              filter: "saturate(1.2)",
              transform: "scale(1.1)",
            },
          }}
          maxW="500px"
          w="100%"
          h="100%"
        >
          <Image
            src={PersonalImage2}
            w="100%"
            h="100%"
            loading="lazy"
            decoding="async"
            objectFit="cover"
            borderRadius="lg"
            transition="0.6s"
          />
        </Box>
      </Flex>
    </Stack>
  );
}
