// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./Swiper.css";
// mui components =>{
import {
  Alert,
  AlertIcon,
  Button,
  CircularProgress,
  AlertDescription,
  AlertTitle,
  Flex,
  Heading,
} from "@chakra-ui/react";

// }
// lottie integration =>{
import QuizAnaimation from "../../../../assets/Animation/Main/Home/animation_lkzul8c7.lottie";
import ChatAnimation from "../../../../assets/Animation//Main/Home/animation_lkzv36fx.lottie";
import LessonsAnimation from "../../../../assets/Animation/Main/Home/animation_lkzveas4.lottie";
import LiveAnimation from "../../../../assets/Animation/Main/Home/animation_llfehwqx (1).lottie";
import HomeworkAnimation from "../../../../assets/Animation/Main/Home/Animation - 1712801053024.lottie";
import CoursesAnimation from "../../../../assets/Animation/Main/Home/Animation - 1712801919185 (1).json";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
// }
// swiper =>{
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect } from "react";
// }
// custom hooks =>{
import { useLive } from "../../../../Firebase/Hooks/Live/useLive/useLive";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
// }
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";
export default function SwiperSlider() {
  const User = UseUserData();
  const live = useLive({
    grade: User.user.data.grade,
  });
  return (
    <>
      <Heading
        as={Flex}
        gap="10px"
        alignItems="center"
        m="0 auto"
        p="10px"
        size="md"
        color="gray.500"
        borderBottom="2px"
        borderBottomColor="gray.400"
      >
        <CaretLeftOutlined /> swap left and right <CaretRightOutlined />
      </Heading>
      <Swiper
        slidesPerView={1}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          400: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          700: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1204: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <DotLottiePlayer
            style={{
              width: "100%",
              height: "calc(100% - 50px)",
            }}
            autoplay
            loop
            src={QuizAnaimation}
          />
          <Button colorScheme="red">
            <Link to="/main/quizes">Quizes</Link>
          </Button>
        </SwiperSlide>
        <SwiperSlide>
          <DotLottiePlayer
            style={{
              width: "100%",
              height: "calc(100% - 50px)",
            }}
            autoplay
            loop
            src={ChatAnimation}
          />
          <Button colorScheme="blue">
            <Link
              to="/main/chat"
              style={{ color: "white", textDecoration: "none" }}
            >
              Chat
            </Link>
          </Button>
        </SwiperSlide>
        <SwiperSlide>
          <DotLottiePlayer
            style={{
              width: "100%",
              height: "calc(100% - 50px)",
              marginBottom: "auto",
              marginTop: "auto",
            }}
            autoplay
            loop
            src={CoursesAnimation}
          />
          <Button colorScheme="teal">
            <Link
              to="/main/courses"
              style={{ color: "white", textDecoration: "none" }}
            >
              Courses
            </Link>
          </Button>
        </SwiperSlide>
        <SwiperSlide>
          <DotLottiePlayer
            style={{
              width: "100%",
              height: "calc(100% - 50px)",
            }}
            autoplay
            loop
            src={LessonsAnimation}
          />
          <Button colorScheme="yellow">
            <Link
              to="/main/videos"
              style={{ color: "white", textDecoration: "none" }}
            >
              Lessons
            </Link>
          </Button>
        </SwiperSlide>
        <SwiperSlide>
          <DotLottiePlayer
            style={{
              width: "100%",
              height: "calc(100% - 50px)",
            }}
            autoplay
            loop
            src={HomeworkAnimation}
          />
          <Button colorScheme="purple">
            <Link
              to="/main/homework"
              style={{ color: "white", textDecoration: "none" }}
            >
              Homework Videos
            </Link>
          </Button>
        </SwiperSlide>
        <SwiperSlide>
          <DotLottiePlayer
            style={{
              width: "100%",
              height: "calc(100% - 50px)",
            }}
            autoplay
            loop
            src={LiveAnimation}
          />
          <Button colorScheme="red">
            {live.loading && <CircularProgress size="20px" isIndeterminate />}
            {!live.loading && (
              <>
                {live.data ? (
                  <Link
                    to={"/main/live"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    go to the live
                  </Link>
                ) : (
                  "there is no live available now"
                )}
              </>
            )}
          </Button>
        </SwiperSlide>
        {live.data && (
          <Alert
            pos="fixed"
            bottom="10px"
            w="100%"
            maxW="500px"
            left="10px"
            status="error"
            gap="10px"
            justifyContent="space-between"
          >
            <Flex>
              <AlertIcon />
              <AlertTitle>there is Live hosted</AlertTitle>
            </Flex>
            <AlertDescription>
              <Button colorScheme="red">
                <Link to="/main/live">Join it Now</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </Swiper>
    </>
  );
}
