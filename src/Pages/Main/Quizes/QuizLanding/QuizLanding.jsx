import { Button, Stack } from "@chakra-ui/react";
import Lottie from "lottie-react";
import AnimationData from "../../../../assets/Animation/Quiz/Animation - 1707075130437.json";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function QuizLanding() {
  const Navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      Navigate("preform");
    }, 4000);
  }, []);
  return (
    <Stack h="calc(100vh - 120px)" justifyContent="center" alignItems="center">
      <Lottie
        style={{
          width: "100%",
          maxWidth: "300px",
        }}
        animationData={AnimationData}
        loop={false}
      />
    </Stack>
  );
}
