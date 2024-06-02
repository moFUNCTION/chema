import React, { useState } from "react";
import { useVideo } from "../../../../Firebase/Hooks/Videos/useVideo(id)/useVideo";
import { useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  Image,
  Heading,
  Text,
  ButtonGroup,
  Button,
  Skeleton,
  useToast,
} from "@chakra-ui/react";
import { PurchaseVideo } from "../../../../Firebase/Utils/Videos/PurchaseVideo/PurchaseVideo";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
export default function VideoPurchase() {
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const User = UseUserData();
  const { id } = useParams();
  const lesson = useVideo({ id: id });
  const PurchaseVideo_req = async () => {
    try {
      setLoading(true);
      const req = await PurchaseVideo({
        user: User.user.data,
        VideoID: id,
      });
      setLoading(false);
      toast({
        title: "Video Purchased successfully",
        description: "Watch it now !!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Navigate("/main/videos");
      User.HandleRender();
    } catch (err) {
      setLoading(false);
      toast({
        title: "Failed to Purchase Video",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Stack p="10px" alignItems="center">
      <Skeleton
        w="100%"
        maxW="600px"
        isLoaded={!lesson.loading}
        bgColor="gray.200"
        minH="300px"
      >
        <Image
          border="2px"
          borderColor="gray.300"
          src={lesson.data?.image}
          w="100%"
          borderRadius="lg"
        />
      </Skeleton>

      <Heading as="h3">{lesson.data?.title}</Heading>
      <Text>{lesson.data?.description}</Text>
      {User.user?.data?.VideosPurchased.includes(id) ? (
        <Button colorScheme="green">
          you have already purchase this video
        </Button>
      ) : (
        <ButtonGroup>
          <Button
            isLoading={loading}
            onClick={PurchaseVideo_req}
            colorScheme="green"
          >
            Purchase For {lesson.data?.RequiredPoints} points
          </Button>
        </ButtonGroup>
      )}
    </Stack>
  );
}
