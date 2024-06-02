import { Button, Heading, Input, Stack } from "@chakra-ui/react";
import { Carousel } from "../../../Components/Carousel/Carousel";
import { ArrowRightOutlined } from "@ant-design/icons";
import Comments from "./Data.json";
import { UserComment } from "./Components/UserComment";
import { AnimatedText } from "../../../Components/AnimatedText/AnimatedText";
export const Section3 = () => {
  return (
    <Stack p="15px" bgColor="blue.800" className="section3">
      <AnimatedText spacing="4px">
        <Heading
          as="h3"
          animatedwordheight="70px"
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
            bottom: "-10px",
            left: "50%",
            translate: "-50% 0%",
            bgColor: "gray.100",
          }}
          _before={{
            content: `""`,
            pos: "absolute",
            h: "2px",
            w: "100%",
            top: "0px",
            left: "50%",
            translate: "-50% 0%",
            bgColor: "gray.100",
          }}
          fontSize="6xl"
          color="gray.100"
        >
          Comments
        </Heading>
      </AnimatedText>

      <Carousel step={400}>
        {Comments.map((comment, index) => {
          return (
            <UserComment
              key={index}
              UserImage={comment.userphoto}
              Username={comment.username}
              comment={comment.comment}
            />
          );
        })}
      </Carousel>

      <Stack
        justifyContent="center"
        display="flex"
        flexDir="row"
        alignItems="center"
        mt="20px"
      >
        <Input
          w="100%"
          maxW="500px"
          variant="solid"
          colorScheme="gray"
          placeholder="write something about our service"
        />
        <Button>
          send
          <ArrowRightOutlined style={{ marginLeft: "7px" }} />
        </Button>
      </Stack>
    </Stack>
  );
};
