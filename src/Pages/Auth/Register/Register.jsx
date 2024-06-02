import React, { useCallback, useEffect, useMemo, useReducer } from "react";
// icons =>{
import {
  FacebookFilled,
  FormOutlined,
  GoogleCircleFilled,
  TwitterCircleFilled,
} from "@ant-design/icons";
// }
// Images =>{
import Background from "../../../assets/Background/3610946 (1).jpg";
// }
// chakra components =>{
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Stack,
  Text,
  Image,
  Avatar,
  useToast,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
// }
// reducer =>{
import {
  INITIAL_STATE,
  RegisterHandlerReducer,
} from "./Reducer/RegisterHandlerReducer";
// }
// react router integration =>{
import { Link, useNavigate } from "react-router-dom";
// }
// utils =>{
import { ValidateEmail } from "../../../Utils/Auth/ValidateEmail";
import { ValidateField } from "../../../Utils/Auth/ValidateField";
import { ValidatePhoneNumber } from "../../../Utils/Auth/ValidatePhoneNumber";
// }
// hooks =>{
import { useAlert } from "../../../Hooks/useAlert/useAlert";
import { AlertMessage } from "../../../Components/AlertMessage/AlertMessage";
// }
// firebase utils =>{
import { RegsiterRequist } from "../../../Firebase/Utils/Auth/Regsiter/RegsiterRequist";
// }
// User context =>{
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { GradeChooseModal } from "../../../Components/GradeChooseModal/GradeChooseModal";
// }
import RegisterImage from "../../../assets/PersonalPhotos/login.jpg";
export default function Register() {
  const [phoneQuery] = useMediaQuery("(max-width: 1000px)");
  const toast = useToast();
  const User = UseUserData();
  const Navigate = useNavigate();
  const [alert, ShowAlert, errorKey] = useAlert();
  const {
    isOpen: isOpenenGradeChosseModal,
    onOpen: onOpenGradeChosseModal,
    onClose: onCloseGradeChosseModal,
  } = useDisclosure();
  // form handler
  const [form, dispach] = useReducer(RegisterHandlerReducer, INITIAL_STATE);
  const HandleChange = (e) => {
    const { name, value, files } = e.target;
    dispach({
      type: "FORM_HANDLER",
      payload: {
        name: name,
        value: files ? files[0] : value,
      },
    });
  };
  //   Regsiter with email
  const Register_req = async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const req = await RegsiterRequist({
        form: form.data,
        withGoogle: false,
      });
      dispach({
        type: "POST_SUCCESS",
      });
      User.HandleRender();
      Navigate("/main");
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
      !ValidateField({ field: form.data.username, RequiredLength: 4 })
    ) {
      ShowAlert({
        type: "error",
        title: "username cant be less than 4 characters",
        errorKey: "username",
      });
    } else if (!ValidatePhoneNumber(form.data.phoneNumber)) {
      ShowAlert({
        type: "error",
        title: "in-valid phone number",
        errorKey: "phoneNumber",
      });
    } else if (!ValidatePhoneNumber(form.data.parentPhoneNumber)) {
      ShowAlert({
        type: "error",
        title: "in-valid parent phone number",
        errorKey: "parentPhoneNumber",
      });
    } else if (
      !ValidateField({
        field: form.data.password,
        RequiredLength: 8,
      })
    ) {
      ShowAlert({
        type: "error",
        title: "password must me more than 8 characters",
        errorKey: "password",
      });
    } else if (form.data.password !== form.data.ConfirmPassword) {
      ShowAlert({
        type: "error",
        title: "please confirm password correctly",
        errorKey: "ConfirmPassword",
      });
    } else {
      Register_req();
    }
  };
  //   Register with google
  const GoogleRegsiterRequist = useCallback(async () => {
    try {
      dispach({
        type: "POST_START",
      });
      const req = await RegsiterRequist({
        form: form.data,
        withGoogle: true,
      });
      dispach({
        type: "POST_SUCCESS",
      });
      onCloseGradeChosseModal();
      User.HandleRender();
      Navigate("/main");
    } catch (err) {
      console.log(err);
      ShowAlert({
        type: "error",
        title: err.message,
      });
      dispach({
        type: "POST_ERROR",
      });
    }
  }, []);
  useEffect(() => {
    if (User.user.data) {
      toast({
        title: "you are already logged in",
        description: `hi ${User.user.data.displayName} you are already logged in`,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      Navigate("/main");
    }
  }, [User.user.data]);
  return (
    <>
      <AlertMessage {...alert} />
      <GradeChooseModal
        isOpen={isOpenenGradeChosseModal}
        onClose={onCloseGradeChosseModal}
        onChange={HandleChange}
        onSubmit={GoogleRegsiterRequist}
        grade={form.data.grade}
        loading={form.loading}
      />
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
              src={RegisterImage}
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
          overflow="auto"
          sx={{
            "> *": {
              flexShrink: "0",
            },
          }}
          borderRadius={phoneQuery && "lg"}
        >
          <Heading
            as="h3"
            w="100%"
            color="blue.800"
            size="lg"
            textAlign="center"
          >
            Register
            <FormOutlined style={{ marginTop: "10px", marginLeft: "10px" }} />
          </Heading>
          <Flex flexWrap={phoneQuery && "wrap"} w="100%" gap="10px">
            <Input
              name="email"
              value={form.data.email}
              onChange={HandleChange}
              placeholder="email"
              bgColor={errorKey === "email" ? "red.50" : "gray.100"}
              isInvalid={errorKey === "email"}
              _placeholder={{ color: errorKey === "email" && "red" }}
              size="lg"
              pl="20px"
              variant="flushed"
            />
            <Input
              name="username"
              value={form.data.username}
              onChange={HandleChange}
              placeholder="username"
              bgColor={errorKey === "username" ? "red.50" : "gray.100"}
              isInvalid={errorKey === "username"}
              _placeholder={{ color: errorKey === "username" && "red" }}
              size="lg"
              pl="20px"
              variant="flushed"
            />
          </Flex>
          <Flex flexWrap={phoneQuery && "wrap"} w="100%" gap="10px">
            <Input
              name="phoneNumber"
              value={form.data.phoneNumber}
              onChange={HandleChange}
              placeholder="phone number"
              bgColor={errorKey === "phoneNumber" ? "red.50" : "gray.100"}
              isInvalid={errorKey === "phoneNumber"}
              _placeholder={{ color: errorKey === "phoneNumber" && "red" }}
              type="number"
              size="lg"
              pl="20px"
              variant="flushed"
            />
            <Input
              name="parentPhoneNumber"
              value={form.data.parentPhoneNumber}
              onChange={HandleChange}
              placeholder="parent phone number"
              bgColor={errorKey === "parentPhoneNumber" ? "red.50" : "gray.100"}
              isInvalid={errorKey === "parentPhoneNumber"}
              _placeholder={{
                color: errorKey === "parentPhoneNumber" && "red",
              }}
              type="number"
              size="lg"
              pl="20px"
              variant="flushed"
            />
          </Flex>

          <Flex w="100%" flexWrap={phoneQuery && "wrap"} gap="10px">
            <Input
              name="password"
              value={form.data.password}
              onChange={HandleChange}
              placeholder="password"
              bgColor={errorKey === "password" ? "red.100" : "gray.100"}
              isInvalid={errorKey === "password"}
              _placeholder={{ color: errorKey === "password" && "red" }}
              size="lg"
              pl="20px"
              variant="flushed"
            />
            <Input
              name="ConfirmPassword"
              value={form.data.ConfirmPassword}
              onChange={HandleChange}
              placeholder="ConfirmPassword"
              bgColor={errorKey === "ConfirmPassword" ? "red.100" : "gray.100"}
              isInvalid={errorKey === "ConfirmPassword"}
              _placeholder={{ color: errorKey === "ConfirmPassword" && "red" }}
              size="lg"
              pl="20px"
              variant="flushed"
            />
          </Flex>

          <Select
            value={form.data.grade}
            name="grade"
            onChange={HandleChange}
            variant="outline"
            bgColor="gray.100"
            cursor="pointer"
          >
            <option value="first-secondary">First secondary</option>
            <option value="second-secondary">Second secondary</option>
            <option value="third-secondary">Third secondary</option>
          </Select>

          <Text w="100%">
            have an account already
            <Button
              ml="10px"
              w="fit-content"
              variant="link"
              fontSize="md"
              fontWeight="600"
            >
              <Link to="/login">Login</Link>
            </Button>
          </Text>
          <Button
            isLoading={form.loading}
            colorScheme="blue"
            w="100%"
            onClick={Validiation}
          >
            Register
          </Button>
          <Button
            onClick={onOpenGradeChosseModal}
            isLoading={form.loading}
            alignItems="center"
            w="100%"
            border="1px"
            borderColor="gray.400"
          >
            Register With <GoogleCircleFilled style={{ marginLeft: "10px" }} />
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
