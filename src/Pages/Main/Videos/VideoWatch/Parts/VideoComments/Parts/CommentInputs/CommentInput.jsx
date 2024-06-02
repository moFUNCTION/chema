import React, { useReducer } from "react";
import { Flex, Avatar, Input, Button, useToast } from "@chakra-ui/react";
import { UseUserData } from "../../../../../../../../Context/UserDataProvider/UserDataProvider";
import { AddComment } from "../../../../../../../../Firebase/Utils/Videos/AddComment/AddComment";
import { AddCommentReducer, INITIAL_STATE } from "./Reducer/AddCommentReducer";
import { useParams } from "react-router-dom";
export const CommentInput = () => {
  const User = UseUserData();
  const [form, dispach] = useReducer(AddCommentReducer, INITIAL_STATE);
  const toast = useToast();
  const { id } = useParams();
  const HandleInputChange = (e) => {
    dispach({
      type: "FORM_HANDLER",
      payload: e.target.value,
    });
  };
  const HandleAddComment = async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const req = await AddComment({
        lessonID: id,
        user: User.user.data,
        comment: form.input,
      });

      dispach({
        type: "POST_SUCCESS",
      });
    } catch (err) {
      dispach({
        type: "POST_ERROR",
      });
      toast({
        title: "error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      borderRadius="md"
      alignItems="center"
      bgColor="gray.50"
      p="20px"
      gap="10px"
    >
      <Avatar src={User.user?.data?.photoURL}></Avatar>
      <Input
        value={form.input}
        onChange={HandleInputChange}
        variant="solid"
        bgColor="gray.300"
        placeholder="write a comment"
      />
      <Button
        onClick={HandleAddComment}
        isLoading={form.loading}
        colorScheme="blue"
      >
        Send
      </Button>
    </Flex>
  );
};
