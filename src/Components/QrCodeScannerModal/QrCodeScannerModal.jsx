import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  CircularProgress,
} from "@chakra-ui/react";
import QrScanner from "react-qr-scanner";
export const QrCodeScannerModal = ({ isOpen, onClose, link }) => {
  const toast = useToast();
  return (
    <Modal
      motionPreset="slideInBottom"
      isCentered
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay backdropFilter="blur(2px)" />
      <ModalContent p="10px" m="10px" alignItems="center">
        <ModalHeader>Qr code scanner</ModalHeader>
        <ModalCloseButton />
        <ModalBody p="20px" bgColor="gray.200" borderRadius="lg" pos="relative">
          <CircularProgress
            isIndeterminate
            pos="absolute"
            top="50%"
            left="50%"
            style={{
              translate: "-50% -50%",
            }}
            zIndex="1"
          />
          <QrScanner
            delay={300}
            // onError={handleError}
            // onScan={handleScan}
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "6px",
              zIndex: "10",
              position: "relative",
              filter: "saturate(100%)",
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
