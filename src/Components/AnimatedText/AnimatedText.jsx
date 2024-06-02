import { useInView, motion } from "framer-motion";
import PropTypes from "prop-types";
import React, { useRef } from "react";
const AnimatedWord = ({ word, inView, index, wordHeight, duaration }) => {
  const wordsVariant = {
    initial: { y: "100%" },
    hidden: { y: "100%" },
    show: { y: "0%" },
  };
  return (
    <span style={{ height: wordHeight || "23px", overflow: "hidden" }}>
      <motion.span
        style={{
          translate: "0% 0%",
          display: "inline-block",
        }}
        variants={wordsVariant}
        animate={inView ? "show" : "hidden"}
        exit="hidden"
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: duaration || 0.3,
          delay: index * 0.01,
        }}
      >
        {word}
      </motion.span>
    </span>
  );
};
export const AnimatedText = ({ children, spacing }) => {
  const ref = useRef();
  const inView = useInView(ref);

  const CheckIfThereIsOneChildOrMore = () => {
    return children instanceof Array;
  };
  return (
    <>
      {CheckIfThereIsOneChildOrMore() ? (
        <>
          {children?.map((child, index) => {
            return (
              <child.type
                ref={ref}
                style={{
                  display: "flex",
                  gap: spacing,
                  flexWrap: "wrap",
                }}
                {...child.props}
                key={index}
              >
                {child.props.children.split(" ").map((word, index) => {
                  return (
                    <AnimatedWord
                      key={index}
                      index={index}
                      inView={inView}
                      word={word}
                      wordHeight={child.props.animatedwordheight}
                      duaration={child.props.animationDuration}
                    />
                  );
                })}
              </child.type>
            );
          })}
        </>
      ) : (
        <>
          <children.type
            ref={ref}
            style={{
              display: "flex",
              gap: spacing,
              flexWrap: "wrap",
            }}
            {...children.props}
          >
            {children.props.children.split(" ").map((word, index) => {
              return (
                <AnimatedWord
                  key={index}
                  index={index}
                  word={word}
                  inView={inView}
                  wordHeight={children.props.animatedwordheight}
                />
              );
            })}
          </children.type>
        </>
      )}
    </>
  );
};
