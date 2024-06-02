import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Button,
  Tag,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { UseUserData } from "../../Context/UserDataProvider/UserDataProvider";
import { Link } from "react-router-dom";
import { LogOutBtn } from "./LogoutBtn/LogoutBtn";

export const UserAvatar = ({ src }) => {
  const User = UseUserData();
  return (
    <>
      <Menu>
        <MenuButton size="md" borderRadius="50%" p="3px" as={IconButton}>
          <Avatar src={src} size="sm"></Avatar>
        </MenuButton>

        <MenuList pos="relative" zIndex="1000" p="10px">
          {User.user.data ? (
            <>
              <MenuItem
                display="flex"
                _hover={{ pl: "20px" }}
                transition="0.3s"
              >
                <Link style={{ width: "100%" }} to="/main/user">
                  User Information
                </Link>
              </MenuItem>
              <MenuItem _hover={{ pl: "20px" }} transition="0.3s">
                <Link to="/main/code_redeem">Code redeem</Link>
              </MenuItem>
              <MenuItem _hover={{ pl: "20px" }} transition="0.3s">
                Videos Purchased
              </MenuItem>
              <MenuItem _hover={{ pl: "20px" }} transition="0.3s">
                Points
                <Tag colorScheme="blue" ml="10px">
                  {User?.user?.data?.points}
                </Tag>
              </MenuItem>
              <LogOutBtn />
            </>
          ) : (
            <>
              <Text mb="10px">You are not logged in 😥</Text>
              <MenuItem
                display="flex"
                _hover={{ pl: "20px" }}
                transition="0.3s"
                bgColor="blue.400"
                color="white"
                mb="10px"
                p="10px"
                borderRadius="md"
                fontWeight="600"
              >
                <Link style={{ width: "100%" }} to="/login">
                  Login
                </Link>
              </MenuItem>
              <MenuItem
                display="flex"
                _hover={{ pl: "20px" }}
                transition="0.3s"
                bgColor="gray.200"
                color="blue.800"
                p="10px"
                borderRadius="md"
                fontWeight="600"
              >
                <Link style={{ width: "100%" }} to="/register">
                  Register
                </Link>
              </MenuItem>
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};
