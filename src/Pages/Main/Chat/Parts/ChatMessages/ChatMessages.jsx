import {
  Skeleton,
  Stack,
  Image,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { UserMessage } from "../../Components/UserMessage/UserMessage";
import { useMessages } from "../../../../../Firebase/Hooks/Chat/useMessages/useMessages";
import { UseUserData } from "../../../../../Context/UserDataProvider/UserDataProvider";
import NoDataImage from "../../../../../assets/noData/sapiens.png";
export const ChatMessages = () => {
  const toast = useToast();
  // user data
  const User = UseUserData();
  // messages hook to get data
  const Messages = useMessages({
    grade: User?.user?.data?.grade,
  });
  const ButtomRef = useRef();
  useEffect(() => {
    ButtomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [Messages.data]);
  const AdminMessages = Messages.data?.filter((message) => {
    return message.isAdmin === true;
  });
  return (
    <>
      <Skeleton
        borderRadius="lg"
        isLoaded={!Messages.loading}
        h="400px"
        bgColor="gray.200"
        fadeDuration={1}
        p="10px"
        overflow="auto"
        display="flex"
        flexDir="column"
        gap="10px"
      >
        {Messages.data?.length === 0 && !Messages.loading && (
          <Box
            flexDir="column"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image w="100%" maxW="300px" src={NoDataImage} />
            <Heading as="h4" size="md">
              No messages have been sent
            </Heading>
          </Box>
        )}
        {Messages.data?.map((message) => {
          return (
            <UserMessage
              photoURL={message.UserImage}
              message={message.message}
              username={message.username}
              key={message.id}
              email={message.email}
              fromMe={message.email === User?.user?.data?.email}
              image={message.FileImage}
            />
          );
        })}
        <span ref={ButtomRef}></span>
      </Skeleton>
    </>
  );
};
