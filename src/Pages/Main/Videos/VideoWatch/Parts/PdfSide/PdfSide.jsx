import { FileFilled } from "@ant-design/icons";
import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  IconButton,
  AspectRatio,
} from "@chakra-ui/react";
import React from "react";

export const PdfSide = ({ pdf }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <Button
        pos="absolute"
        top="15px"
        right="15px"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        zIndex="10"
      >
        Pdf
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <IconButton
            onClick={onClose}
            colorScheme="red"
            pos="absolute"
            top="10px"
            right="10px"
          >
            <CloseIcon />
          </IconButton>
          <DrawerHeader>Pdf Viwer</DrawerHeader>

          <DrawerBody>
            <AspectRatio ratio={16 / 15}>
              <iframe src={pdf} loading="lazy" />
            </AspectRatio>
            <Button w="100%" colorScheme="orange" mt="10px">
              <a target="_blank" rel="noreferrer" href={pdf}>
                Download
                <FileFilled style={{ marginLeft: "10px" }} />
              </a>
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3}>
              Devolped by mohassan
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
