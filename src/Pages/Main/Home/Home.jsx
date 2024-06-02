import { Badge, Divider, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import SwiperSlider from "./swiper/SwiperSlider";
// animation svg =>{
import AnimationData from "../../../assets/Animation/Main/Home/animation_ll0t1jqg.lottie";
import AnimationData2 from "../../../assets/Animation/Main/Home/animation_ll0u7dhh.lottie";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
// }
export default function Home() {
  const User = UseUserData();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Stack>
      <SwiperSlider />
      <Flex
        justifyContent="center"
        alignItems="center"
        gap="10px"
        flexWrap="wrap"
        mt="10px"
        mb="8px"
      >
        <DotLottiePlayer
          src={AnimationData}
          style={{ width: "100%", maxWidth: "400px" }}
          className="animation"
        />
        <Stack className="text" w="100%" maxW="400px">
          <Heading as="h3" color="green.800" mb="10px" mt="5px" size="md">
            how can i gain the most benifit by our platform ?
          </Heading>
          <Divider />
          <Text color="green.900" fontWeight="600" fontSize="md">
            first do all the quizes that provided for each lesson second watch
            the videos again and if you got lost in a something dont hesitate
            and contact with us Whatsapp or in our chat box and you can ask your
            friends in our chat app and also you have AI chat bot you can also
            ask him
          </Text>
        </Stack>
      </Flex>
      <Divider maxW="400px" m="0 auto" />
      <Flex
        justifyContent="center"
        alignItems="center"
        gap="10px"
        flexWrap="wrap"
        mt="10px"
        mb="8px"
      >
        <Stack className="text" w="100%" maxW="400px">
          <Heading
            as="h3"
            color="blue.800"
            mb="10px"
            mt="5px"
            size="md"
            className="mb-3 mt-1"
          >
            is the payment in our site is safe ?
          </Heading>
          <Text color="blue.900" fontWeight="600" fontSize="md">
            all payment methods in our site is safe but you should avoid many
            things like dont save your email and passwrod in any site else cuz
            the most of site save the user information in local storage and this
            lead to crack your account
          </Text>
        </Stack>
        <DotLottiePlayer
          src={AnimationData2}
          style={{ width: "100%", maxWidth: "400px" }}
          className="animation"
        />
      </Flex>
    </Stack>
  );
}
