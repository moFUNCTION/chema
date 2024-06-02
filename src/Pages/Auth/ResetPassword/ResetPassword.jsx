import AnimationData from "../../../assets/Animation/ResetPassword/Animation - 1711352246573.json";
import { Stack, Input, Button, useToast } from "@chakra-ui/react";
import Lottie from "lottie-react";
import React, { useState } from "react";
import { ResetPassword_req } from "../../../Firebase/Utils/Auth/ResetPassword/ResetPassword";
import { EmailIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const HandleSendEmail = async () => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
      toast({
        status: "error",
        position: "top-right",
        title: "please enter valid email",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    try {
      setLoading(true);
      const req = await ResetPassword_req({ email });
      setLoading(false);
      toast({
        status: "success",
        position: "top-right",
        title: "password sent successfully Check your gmail",
        duration: 3000,
        isClosable: true,
      });
      setEmail("");
    } catch (err) {
      toast({
        status: "error",
        position: "top-right",
        title: err,
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const HandleEmailChange = (e) => setEmail(e.target.value);
  return (
    <Stack
      minH="calc(100vh - 73px)"
      alignItems="center"
      justifyContent="center"
      bgColor="gray.50"
      p="10px"
      gap="10px"
    >
      <Lottie
        style={{ width: "100%", maxWidth: "300px" }}
        animationData={AnimationData}
      />
      <Input
        bgColor="white"
        border="1px"
        borderColor="gray.500"
        placeholder="please enter your email"
        w="100%"
        maxW="450px"
        onChange={HandleEmailChange}
        value={email}
      />
      <Button
        onClick={HandleSendEmail}
        w="100%"
        maxW="450px"
        colorScheme="blue"
        isLoading={loading}
      >
        Send Email To Update Password
      </Button>
      <Button
        as={Link}
        to="https://mail.google.com/"
        target="_blank"
        w="100%"
        maxW="450px"
        colorScheme="teal"
        isLoading={loading}
      >
        Your Email Messages <EmailIcon style={{ marginLeft: "10px" }} />
      </Button>
    </Stack>
  );
}
