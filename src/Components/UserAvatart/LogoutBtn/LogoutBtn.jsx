import { Button, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { LogoutRequist } from "../../../Firebase/Utils/Auth/Logout/LogoutRequist";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";

export const LogOutBtn = () => {
  const [loading, setLoading] = useState(false);
  const User = UseUserData();
  const Toast = useToast();
  const Logout_req = async () => {
    setLoading(true);
    try {
      const req = await LogoutRequist({ user: User.user.data });
      setLoading(false);
      Toast({
        title: "Success",
        description: "Logout successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      setLoading(false);
      Toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      isLoading={loading}
      onClick={Logout_req}
      mt="5px"
      w="100%"
      colorScheme="red"
    >
      Logout
    </Button>
  );
};
