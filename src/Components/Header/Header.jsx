import React from "react";
import { UpperPart } from "./Parts/UpperPart";
import { LowerPart } from "./Parts/LowerPart";
import { ScrollProgress } from "./Parts/ScrollProgress";
import { useLocation } from "react-router-dom";

export const Header = () => {
  const { pathname } = useLocation();
  const PathesThatHaveTheUpperSide = ["/", "/about", "/location"];
  return (
    <>
      {PathesThatHaveTheUpperSide.includes(pathname) && <UpperPart />}
      <LowerPart />
    </>
  );
};
