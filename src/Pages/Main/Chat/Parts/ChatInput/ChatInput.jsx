import {
  Avatar,
  Button,
  Flex,
  IconButton,
  Input,
  Tooltip,
  Image,
  Fade,
  Box,
  CloseButton,
  useToast,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FileAddFilled } from "@ant-design/icons";
import { UseUserData } from "../../../../../Context/UserDataProvider/UserDataProvider";
import React, { useMemo, useReducer } from "react";
import { FormHandlerReducer, INITIAL_STATE } from "./Reducer/FormHandler";
import { AddMessage } from "../../../../../Firebase/Utils/Chat/AddMessage/AddMessage";

export const ChatInput = () => {
  const toast = useToast();
  const User = UseUserData();
  const [form, dispach] = useReducer(FormHandlerReducer, INITIAL_STATE);
  const FormHandler = (e) => {
    const { name, value, files } = e.target;
    dispach({
      type: "FORM_HANDLER",
      payload: {
        name: name,
        value: files ? files[0] : value,
      },
    });
  };
  const RemoveImage = () => {
    dispach({
      type: "FORM_HANDLER",
      payload: {
        name: "image",
        value: "",
      },
    });
  };

  const ImageFile = useMemo(() => {
    return form.data.image ? URL.createObjectURL(form.data.image) : undefined;
  }, [form.data.image]);
  const SendMessage = async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const AddMessage_Req = await AddMessage({
        user: User.user.data,
        Message: form.data.message,
        File: form.data.image,
      });
      dispach({
        type: "POST_SUCCESS",
      });
    } catch (err) {
      console.log(form);
      dispach({
        type: "POST_ERROR",
      });
      toast({
        title: "error in send message",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log(err);
    }
  };
  return (
    <Flex
      justifyContent="center"
      gap="10px"
      flexWrap="wrap"
      alignItems="center"
      pos="relative"
    >
      <Fade in={form.data.image} className="image">
        <Box
          bottom="calc(100% + 10px)"
          right="0px"
          pos="absolute"
          h="100px"
          w="100px"
          bgColor="gray.300"
        >
          <CloseButton
            pos="absolute"
            top="2px"
            right="2px"
            bgColor="red.500"
            size="sm"
            onClick={RemoveImage}
          />
          {form.data.image && (
            <Image
              alt="img"
              h="100%"
              w="100%"
              borderRadius="lg"
              src={ImageFile}
            />
          )}
        </Box>
      </Fade>

      <Box w="100%" maxW="400px" display="flex" alignItems="center" gap="10px">
        <Tooltip label="user">
          <IconButton borderRadius="50%">
            <Avatar size="sm" src={User?.user?.data?.photoURL}></Avatar>
          </IconButton>
        </Tooltip>
        <Input
          name="message"
          value={form.data.message}
          onChange={FormHandler}
          placeholder="write a message"
        />
      </Box>
      <Box display="flex" alignItems="center" gap="10px">
        <Button
          isLoading={form.loading}
          onClick={SendMessage}
          colorScheme="blue"
        >
          Send
          <ArrowForwardIcon style={{ marginLeft: "10px" }} />
        </Button>
        <Button isLoading={form.loading} colorScheme="orange">
          <label
            htmlFor="1"
            style={{
              cursor: "pointer",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            File
            <FileAddFilled style={{ marginLeft: "10px" }} />
          </label>
          <input
            accept="image/*"
            id="1"
            type="file"
            onChange={FormHandler}
            name="image"
            hidden
          />
        </Button>
      </Box>
    </Flex>
  );
};
