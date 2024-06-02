import { Grid, useMediaQuery } from "@chakra-ui/react";
import React from "react";

export const GridSystem = ({ children, phone, ipad, sx }) => {
  const [PhoneQuery] = useMediaQuery(`(max-width: ${phone})`);
  const [IpadQuery] = useMediaQuery(`(max-width: ${ipad})`);
  const GetColumns = () => {
    if (PhoneQuery) {
      return "repeat(1, 1fr)";
    } else if (IpadQuery) {
      return "repeat(2, 1fr)";
    } else {
      return "repeat(3, 1fr)";
    }
  };
  return (
    <Grid {...sx} templateColumns={GetColumns()}>
      {children}
    </Grid>
  );
};
