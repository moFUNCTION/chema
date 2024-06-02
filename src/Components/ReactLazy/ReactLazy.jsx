import { CircularProgress } from "@chakra-ui/react";
import React, { Suspense } from "react";

export const ReactLazy = ({ children }) => {
  return (
    <Suspense
      fallback={
        <CircularProgress
          isIndeterminate
          pos="fixed"
          top="50%"
          left="50%"
          sx={{ translate: "-50% -50%" }}
        />
      }
    >
      {children}
    </Suspense>
  );
};
