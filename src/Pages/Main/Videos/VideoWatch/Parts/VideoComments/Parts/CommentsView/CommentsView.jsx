import React, { useEffect, useRef } from "react";
import { useVideoComments } from "../../../../../../../../Firebase/Hooks/Videos/useVideoComments[id]/useVideoComments";
import { useParams } from "react-router-dom";
import { Box, Skeleton } from "@chakra-ui/react";
import { UserComment } from "../../Components/UserComment";

export const CommentsView = ({ data, loading }) => {
  return (
    <Skeleton
      isLoaded={!loading}
      p="10px"
      borderRadius="md"
      h="100%"
      w="100%"
      bgColor="gray.100"
      fadeDuration="2"
      overflow="auto"
    >
      {data?.map((item) => {
        return (
          <UserComment key={item.id} comment={item.comment} user={item.user} />
        );
      })}
    </Skeleton>
  );
};
