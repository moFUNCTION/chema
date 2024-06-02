import { useScroll, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const { pathname } = useLocation();
  const PagesWithScrollParcent = ["/", "/about", "/main", "/main/home"];
  const CheckIfThePageBelongsToPagesWithScrollPercent = () => {
    return PagesWithScrollParcent.find((item) => {
      return item === pathname;
    });
  };
  return (
    <motion.div
      className="scroll-progress"
      style={{
        scaleX: scrollYProgress,
        transition: "0.1s",
        transformOrigin: "left",
        backgroundColor: "#1C74BB",
        width: "100%",
        height: "3px",
        position: "absolute",
        bottom: "-2px",
        left: "0%",
        zIndex: "100",
        display: `${
          CheckIfThePageBelongsToPagesWithScrollPercent() ? "block" : "none"
        }`,
      }}
    ></motion.div>
  );
};
