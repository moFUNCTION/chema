import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import AnimationData from "../../../assets/Animation/Main/UserNotFound/Animation - 1698607404913.json";
import React from "react";
import { Link } from "react-router-dom";

export const NoUserFound = () => {
  return (
    <Stack alignItems="center" p="10px">
      <Lottie
        animationData={AnimationData}
        style={{ width: "100%", maxWidth: "300px" }}
      />
      <Heading as="h3" color="blue.800" mt="10px">
        User Not Found
      </Heading>
      <Heading as="h3" size="md" color="blue.800" mt="10px">
        Access Denied
      </Heading>
      <Flex gap="20px" mt="10px">
        <Button variant="link" colorScheme="blue">
          <Link to="/login">Login</Link>
        </Button>
        <Button variant="link" colorScheme="blue">
          <Link to="/register">Register</Link>
        </Button>
      </Flex>
    </Stack>
  );
};
