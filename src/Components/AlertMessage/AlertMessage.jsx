import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";
export const AlertMessage = ({ title, type, show }) => {
  return (
    <Alert
      position="fixed"
      top="0%"
      left="0%"
      w="100%"
      status={type || "error"}
      display={show ? "flex" : "none"}
      zIndex="10000"
      variant="top-accent"
    >
      <AlertIcon />
      {title}
    </Alert>
  );
};
