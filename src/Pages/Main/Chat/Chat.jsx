import React from "react";
import { Stack, Image } from "@chakra-ui/react";
import { ChatInput } from "./Parts/ChatInput/ChatInput";
import { ChatMessages } from "./Parts/ChatMessages/ChatMessages";
export default function Chat() {
  return (
    <Stack
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="calc(100vh - 72px)"
      bgGradient="linear(to-r, #4e54c8, #4e54c8)"
      p="10px"
      pos="relative"
    >
      <Stack
        borderRadius="lg"
        p="10px"
        className="chat"
        w="100%"
        maxW="700px"
        bgColor="white"
      >
        <ChatMessages />
        <ChatInput />
      </Stack>
    </Stack>
  );
}
