import { Button, Flex, Input, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import Lottie from "lottie-react";
import AnimationData from "../../../assets/Animation/Main/Code_generation/Animation - 1704231175643.json";
import { CodeRedeem_req } from "../../../Firebase/Utils/Code_Redeem/CodeRedeem_req";
import { UseUserData } from "../../../Context/UserDataProvider/UserDataProvider";
import { useNavigate } from "react-router-dom";
import { QrcodeOutlined } from "@ant-design/icons";
// import { QrCodeScannerModal } from "../../../Components/QrCodeScannerModal/QrCodeScannerModal";
export default function Code_Redeem() {
  // code redeem handler
  const Toast = useToast();
  const User = UseUserData();
  const Navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const CodeHandlerChange = (e) => {
    setCode(e.target.value);
  };
  const RedeemCode = async () => {
    try {
      setLoading(true);
      const req = await CodeRedeem_req({
        code: code,
        user: User.user.data,
      });
      setLoading(false);
      User.HandleRender();
      Toast({
        title: "SUCCESS",
        description: "Code Redeem Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Navigate("/main/user");
    } catch (err) {
      setLoading(false);
      Toast({
        title: "ERROR",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  // // qr code handler
  // const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  // const HandleOpenQrScanner = () => {
  //   setIsQrScannerOpen(true);
  // };
  // const HandleCloseQrScanner = () => {
  //   setIsQrScannerOpen(false);
  // };
  return (
    <Stack alignItems="center" flexDir="column" gap="30px">
      {/* <QrCodeScannerModal
        isOpen={isQrScannerOpen}
        onClose={HandleCloseQrScanner}
      /> */}
      <Lottie
        style={{
          width: "300px",
          height: "300px",
        }}
        animationData={AnimationData}
      />

      <Stack maxW="600px" w="100%" gap="10px">
        <Input
          onChange={CodeHandlerChange}
          placeholder="enter the code to get the points"
        />
        <Button isLoading={loading} onClick={RedeemCode} colorScheme="blue">
          Get Points
        </Button>
      </Stack>
      {/* <Button onClick={HandleOpenQrScanner} colorScheme="teal" w="200px">
        scan QR code <QrcodeOutlined style={{ marginLeft: "10px" }} />
      </Button> */}
    </Stack>
  );
}
