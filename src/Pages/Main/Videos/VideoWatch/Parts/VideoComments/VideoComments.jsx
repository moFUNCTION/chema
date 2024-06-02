import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Input,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { UseUserData } from "../../../../../../Context/UserDataProvider/UserDataProvider";
import { CommentInput } from "./Parts/CommentInputs/CommentInput";
import { CommentsView } from "./Parts/CommentsView/CommentsView";
import { useVideoComments } from "../../../../../../Firebase/Hooks/Videos/useVideoComments[id]/useVideoComments";
import { useParams } from "react-router-dom";
export const VideoComments = () => {
  const User = UseUserData();
  const { id } = useParams();
  const comments = useVideoComments({
    LessonId: id,
  });

  return (
    <Stack
      borderRadius="md"
      bgColor="gray.200"
      gap="10px"
      p="10px"
      h="550px"
      w="100%"
    >
      <Heading size="md" display="flex" alignItems="center" gap="10px">
        {comments.loading ? (
          <CircularProgress size="30px" mr="10px" isIndeterminate />
        ) : (
          <Tooltip
            label={`there is ${comments.data?.length} comments in this video `}
          >
            <Badge fontSize="1.4rem" paddingInline="10px">
              {comments.data?.length}
            </Badge>
          </Tooltip>
        )}
        comment
      </Heading>
      <CommentsView loading={comments.loading} data={comments.data} />
      <CommentInput />
    </Stack>
  );
};
