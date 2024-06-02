import React, { useState, useTransition } from "react";
import Logo from "../../../assets/Logo/Chema__1_-removebg-preview.png";
// components
import { ScrollProgress } from "./ScrollProgress";
import {
  Stack,
  Image,
  Button,
  Avatar,
  IconButton,
  useMediaQuery,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
// icons
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
// react router
import { Link, useLocation } from "react-router-dom";
// user context
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { UserAvatar } from "../../UserAvatart/UserAvatar";
import { SideMenu } from "../../SideMenu/SideMenu";
export const LowerPart = () => {
  // user get data hook
  const User = UseUserData();
  const { pathname } = useLocation();
  const [PhoneQuery] = useMediaQuery("(max-width: 800px)", {
    ssr: true,
    fallback: true,
  });
  const [SmallPhoneQuery] = useMediaQuery("(max-width: 400px)", {
    ssr: true,
    fallback: true,
  });
  const {
    isOpen: isOpenendSideMenu,
    onClose: onCloseSideMenu,
    onOpen: onOpenSideMenu,
  } = useDisclosure();
  const PagesWithScrollParcent = ["/", "/about", "/main", "/main/home"];
  const CheckIfThePageBelongsToPagesWithScrollPercent = () => {
    return PagesWithScrollParcent.find((item) => {
      return item === pathname;
    });
  };
  const [isPending, startTransition] = useTransition();
  return (
    <Stack
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      gap="20px"
      flexDirection="row"
      paddingBlock="6px"
      paddingInline="10px"
      pos="sticky"
      top="0px"
      bgColor="white"
      zIndex="1000"
      flexWrap="wrap"
      borderBottom={CheckIfThePageBelongsToPagesWithScrollPercent() && "2px"}
      borderBottomColor="gray.200"
    >
      <Link to="/">
        <Image src={Logo} w="80px" />
      </Link>
      {PhoneQuery && (
        <SideMenu isOpen={isOpenendSideMenu} onClose={onCloseSideMenu} />
      )}

      {!PhoneQuery && (
        <Stack display="flex" gap="20px" flexDir="row">
          {links.map((link, index) => {
            return (
              <Button
                colorScheme={pathname === link.href ? "blue" : "gray"}
                borderRadius={pathname === link.href && "full"}
                transition="0.3s"
                key={index}
                isLoading={isPending}
                variant={pathname === link.href ? "solid" : "link"}
              >
                <Link to={link.href}>{link.title}</Link>
              </Button>
            );
          })}
        </Stack>
      )}

      <Stack display="flex" alignItems="center" gap="10px" flexDir="row">
        {User?.user?.loading && <Button isLoading></Button>}
        {!User?.user?.loading && User?.user?.data && (
          <Flex gap="10px" alignItems="center">
            <Button isLoading={isPending} colorScheme="blue">
              <Link to="/main">the main site</Link>
            </Button>
          </Flex>
        )}
        {!User?.user?.loading && !User?.user?.data && (
          <>
            <Button isLoading={isPending} colorScheme="blue" variant="outline">
              <Link to="/login">Login</Link>
            </Button>
            {!SmallPhoneQuery && (
              <Button isLoading={isPending} colorScheme="blue">
                <Link to="/register">Regsiter</Link>
              </Button>
            )}
          </>
        )}
        <UserAvatar src={User?.user?.data?.photoURL} />
        {PhoneQuery && (
          <IconButton isLoading={isPending} onClick={onOpenSideMenu}>
            <MenuOutlined />
          </IconButton>
        )}
      </Stack>
      <ScrollProgress />
    </Stack>
  );
};
const links = [
  { href: "/", title: "Home" },
  { title: "About", href: "/about" },
  {
    title: "Our Location",
    href: "/location",
  },
  {
    title: "Courses",
    href: "/courses",
  },
];
