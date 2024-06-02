// chakra components =>{
import {
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
// }
export const GradeChooseModal = ({
  onClose,
  isOpen,
  grade,
  onChange,
  onSubmit,
  loading,
}) => {
  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please choose the grade</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select
            value={grade}
            name="grade"
            onChange={onChange}
            variant="outline"
            bgColor="gray.100"
            cursor="pointer"
          >
            <option value="first-secondary">First secondary</option>
            <option value="second-secondary">Second secondary</option>
            <option value="third-secondary">Third secondary</option>
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme="blue"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button isLoading={loading} colorScheme="teal" onClick={onSubmit}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
