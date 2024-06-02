import {
  Button,
  IconButton,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
export const MassengerChatPlugin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Menu>
      <MenuButton
        colorScheme="green"
        as={IconButton}
        icon={<WhatsAppOutlined />}
        pos="fixed"
        zIndex="10000000"
        bottom="10px"
        right="10px"
        size="lg"
        borderRadius="full"
      >
        Actions
      </MenuButton>
      <MenuList dir="rtl" maxW="100px" pos="relative" zIndex="10000000">
        <MenuItem as={Link} target="_blank" to="https://wa.me/+201015577851">
          المحادثة مع الدعم لشراء الحصص او الكورسات
        </MenuItem>
        <MenuItem as={Link} target="_blank" to="https://wa.me/+201202889831">
          المحادثة مع المطور
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
