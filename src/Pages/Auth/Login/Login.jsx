import React, { useContext, useEffect, useReducer, useState } from "react";
// icons =>{
import {
  FacebookFilled,
  FormOutlined,
  GoogleCircleFilled,
  LoginOutlined,
  TwitterCircleFilled,
} from "@ant-design/icons";

// }
// chakra components =>{
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  Image,
  Switch,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";
// }
// reducer =>{
import {
  INITIAL_STATE,
  LoginHandlerReducer,
} from "./Reducer/LoginHandlerReducer";
// }
// react router integration =>{
import { Link, useNavigate } from "react-router-dom";
// }
// utils =>{
import { ValidateEmail } from "../../../Utils/Auth/ValidateEmail";
import { ValidateField } from "../../../Utils/Auth/ValidateField";
// }
// hooks =>{
import { useAlert } from "../../../Hooks/useAlert/useAlert";
import { AlertMessage } from "../../../Components/AlertMessage/AlertMessage";
// }
// firebase utils =>{
import { LoginRequist } from "../../../Firebase/Utils/Auth/Login/LoginRequist";
// }
// User context =>{
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { GradeChooseModal } from "../../../Components/GradeChooseModal/GradeChooseModal";
// }
import LoginImage from "../../../assets/PersonalPhotos/login.jpg";

export default function Login() {
  const toast = useToast();
  const User = UseUserData();
  const [phoneQuery] = useMediaQuery("(max-width: 1000px)");
  const Naviagate = useNavigate();
  const [alert, ShowAlert, errorKey] = useAlert();
  const {
    isOpen: isOpenenGradeChosseModal,
    onOpen: onOpenGradeChosseModal,
    onClose: onCloseGradeChosseModal,
  } = useDisclosure();
  // form handler
  const [form, dispach] = useReducer(LoginHandlerReducer, INITIAL_STATE);
  const HandleChange = (e) => {
    const { name, value } = e.target;
    dispach({
      type: "FORM_HANDLER",
      payload: {
        name: name,
        value: value,
      },
    });
  };
  const ShowPassword = (e) => {
    const { checked } = e.target;
    dispach({
      type: "SHOW_PASSWORD",
      payload: checked,
    });
  };
  //   login with email
  const Login_req = async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const req = await LoginRequist({
        form: form.data,
        withGoogle: false,
      });
      dispach({
        type: "POST_SUCCESS",
      });
      User.HandleRender();
      Naviagate("/main");
    } catch (err) {
      ShowAlert({
        type: "error",
        title: err.message,
      });
      dispach({
        type: "POST_ERROR",
      });
    }
  };
  const Validiation = () => {
    if (!ValidateEmail(form.data.email)) {
      ShowAlert({
        type: "error",
        title: "please insert valid email",
        errorKey: "email",
      });
    } else if (
      !ValidateField({ field: form.data.password, RequiredLength: 8 })
    ) {
      ShowAlert({
        type: "error",
        title: "password cant be less than 8 characters",
        errorKey: "password",
      });
    } else {
      Login_req();
    }
  };
  //   login with google
  const GoogleLoginRequist = async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const req = await LoginRequist({
        form: form.data,
        withGoogle: true,
      });
      dispach({
        type: "POST_SUCCESS",
      });
      onCloseGradeChosseModal();
      User.HandleRender();
      Naviagate("/main");
    } catch (err) {
      ShowAlert({
        type: "error",
        title: err.message,
      });
      dispach({
        type: "POST_ERROR",
      });
    }
  };
  useEffect(() => {
    if (User.user.data) {
      toast({
        title: "you are already logged in",
        description: `hi ${User.user.data.displayName} you are already logged in`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      Naviagate("/main");
    }
  }, [User.user.data]);
  return (
    <>
      <GradeChooseModal
        isOpen={isOpenenGradeChosseModal}
        onClose={onCloseGradeChosseModal}
        onChange={HandleChange}
        onSubmit={GoogleLoginRequist}
        grade={form.data.grade}
        loading={form.loading}
      />
      <AlertMessage {...alert} />

      <Flex
        sx={{
          [phoneQuery ? "minH" : "h"]: "calc(100vh - 70px)",
        }}
        justifyContent={phoneQuery ? "center" : "space-between"}
        alignItems="center"
        display="flex"
        pos="relative"
        bgGradient="linear(to-r, #4e54c8, #4e54c8)"
        p={phoneQuery && "5"}
      >
        {!phoneQuery && (
          <Box w="100%" h="100%" overflow="hidden" bgColor="#220d48">
            <Image
              borderRadius="lg"
              w="100%"
              h="100%"
              objectFit="contain"
              objectPosition="50% 100%"
              src={LoginImage}
              transition="0.3s"
              loading="lazy"
              decoding="async"
            />
          </Box>
        )}

        <Flex
          bgColor="white"
          p={4}
          w="100%"
          maxW={phoneQuery && "600px"}
          h="100%"
          flexDirection="column"
          gap="20px"
          justifyContent="center"
          alignItems="center"
          pos="relative"
          overflow="hidden"
          borderRadius={phoneQuery && "lg"}
        >
          <Heading
            pos="relative"
            width="fit-content"
            color="blue.800"
            size="lg"
            textAlign="center"
            mb="20px"
            as="h3"
          >
            Login
            <FormOutlined style={{ marginTop: "10px", marginLeft: "10px" }} />
          </Heading>

          <Input
            name="email"
            value={form.data.email}
            onChange={HandleChange}
            placeholder="Email"
            bgColor={errorKey === "email" ? "red.50" : "gray.100"}
            isInvalid={errorKey === "email"}
            _placeholder={{ color: errorKey === "email" && "red" }}
            variant="flushed"
            size="lg"
            pl="20px"
          />
          <Input
            name="password"
            value={form.data.password}
            onChange={HandleChange}
            placeholder="password"
            bgColor={errorKey === "password" ? "red.100" : "gray.100"}
            isInvalid={errorKey === "password"}
            _placeholder={{ color: errorKey === "password" && "red" }}
            type={form.data.showPassword ? "text" : "password"}
            variant="flushed"
            size="lg"
            pl="20px"
          />
          <Flex w="100%" alignItems="center" gap="10px">
            <Text>Show Password</Text>
            <Switch
              colorScheme="blue"
              name="showPassword"
              isChecked={form.data.showPassword}
              onChange={ShowPassword}
            />
          </Flex>

          <Button
            w="fit-content"
            mr="auto"
            variant="link"
            fontSize="md"
            fontWeight="600"
          >
            <Link to="/reset_password">Forget password</Link>
          </Button>
          <Text mr="auto">
            Dont have an account please
            <Button
              ml="10px"
              w="fit-content"
              variant="link"
              fontSize="md"
              fontWeight="600"
            >
              <Link to="/register">Sign up</Link>
            </Button>
          </Text>
          <Button
            isLoading={form.loading}
            colorScheme="blue"
            w="100%"
            onClick={Validiation}
          >
            Login
          </Button>
          <Button
            onClick={onOpenGradeChosseModal}
            isLoading={form.loading}
            alignItems="center"
            w="100%"
            border="1px"
            borderColor="gray.400"
          >
            Login With <GoogleCircleFilled style={{ marginLeft: "10px" }} />
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
