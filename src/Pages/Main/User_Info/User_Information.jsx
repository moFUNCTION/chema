import { Flex, Stack, Image, Heading, Button } from "@chakra-ui/react";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import ImageBackground from "../../../assets/Background/3610946 (1).jpg";
export default function User_Information() {
  const User = UseUserData();
  return (
    <Stack p="15px">
      <Heading
        textAlign="center"
        pos="relative"
        transition="0.3s"
        w="fit-content"
        as="h3"
        m="0 auto"
        _after={{
          content: `""`,
          pos: "absolute",
          h: "2px",
          w: "100%",
          bottom: "-10px",
          left: "50%",
          translate: "-50% 0%",
          bgColor: "gray.300",
        }}
        _before={{
          content: `""`,
          pos: "absolute",
          h: "2px",
          w: "100%",
          top: "-5px",
          left: "50%",
          translate: "-50% 0%",
          bgColor: "gray.300",
        }}
        color="gray.500"
        size="xl"
        mb="20px"
      >
        user information
      </Heading>
      <Flex
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
        gap="10px"
      >
        <Button>Code generation</Button>
        <Button>Videos</Button>
        <Button>quizes</Button>
        <Button>Chat</Button>
        <Button>AI chat</Button>
        <Button>Home</Button>
        <Button>update profile</Button>
        <Button>Live</Button>
      </Flex>
      <Flex
        border="2px"
        borderColor="gray.300"
        bg
        p="15px"
        justifyContent="center"
        alignItems="center"
        borderRadius="lg"
        gap="20px"
        flexWrap="wrap"
        pos="relative"
      >
        <Image
          src={ImageBackground}
          w="100%"
          h="100%"
          objectFit="cover"
          pos="absolute"
          inset="0px"
          borderRadius="lg"
          zIndex="-1"
          opacity="0.05"
        />
        <Image
          src={User.user?.data?.photoURL}
          borderRadius="50%"
          w="200px"
          h="200px"
          objectFit="cover"
        />
        <Stack>
          <Heading as="h3" size="md">
            username
            <Button ml="10px" colorScheme="blue" variant="link">
              {User.user?.data?.displayName}
            </Button>
          </Heading>
          <Heading as="h3" size="md">
            email
            <Button ml="10px" colorScheme="blue" variant="link">
              {User.user?.data?.email}
            </Button>
          </Heading>
          <Heading as="h3" size="md">
            grade
            <Button ml="10px" colorScheme="blue" variant="link">
              {User.user?.data?.grade}
            </Button>
          </Heading>
          <Heading as="h3" size="md">
            Points
            <Button ml="10px" minW="100px">
              {User.user?.data?.points}
            </Button>
          </Heading>
          <Heading as="h3" size="md">
            phone number
            <Button ml="10px" colorScheme="blue" variant="link">
              {User.user?.data?.phoneNumber}
            </Button>
          </Heading>
          <Heading as="h3" size="md">
            parent phone number
            <Button ml="10px" colorScheme="blue" variant="link">
              {User.user?.data?.parentPhoneNumber}
            </Button>
          </Heading>
        </Stack>
      </Flex>
      <Flex
        gap="10px"
        justifyContent="center"
        p="10px"
        bgColor="gray.200"
        borderRadius="lg"
      >
        <Button colorScheme="blue">
          Videos Purchased
          <span style={{ marginLeft: "10px" }}>
            {User.user.data?.VideosPurchased.length}
          </span>
        </Button>
        <Button colorScheme="blue">
          Quizes Done {User?.user?.data?.QuizesDone.length}
        </Button>
      </Flex>
      <Stack display="flex" alignItems="center">
        <Button colorScheme="green" minW="200px">
          Update Profile data
        </Button>
        <Button colorScheme="red" minW="200px">
          Logout
        </Button>
      </Stack>
    </Stack>
  );
}
