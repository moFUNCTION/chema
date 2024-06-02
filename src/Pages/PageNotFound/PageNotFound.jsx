import { Stack, Image, Heading, Button } from "@chakra-ui/react";
import React from "react";
import NotFoundImage from "../../assets/PageNotFound/3793096.jpg";
import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <Stack alignItems="center">
      <Image src={NotFoundImage} w="100%" maxW="400px" />
      <Heading color="blue.800">Page not Found</Heading>
      <Button
        _hover={{ transform: "scale(1.05)" }}
        mt="10px"
        colorScheme="blue"
      >
        <Link to="/main">Return Back to home</Link>
      </Button>
    </Stack>
  );
}
