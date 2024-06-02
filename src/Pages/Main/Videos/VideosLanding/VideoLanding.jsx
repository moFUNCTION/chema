import React, { useEffect, useRef } from "react";
import { VideoCard } from "./Components/VideoCard/VideoCard";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  CircularProgress,
  Flex,
  Heading,
  Stack,
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import { useVideos } from "../../../../Firebase/Hooks/Videos/useVideo/useVideos";
import { Image } from "@chakra-ui/react";
import NoDataImage from "../../../../assets/noData/sapiens.png";
import { useCollectionCount } from "./../../../../Firebase/Hooks/UseCollectionCount/useCollectionCount";

export default function VideoLanding() {
  const User = UseUserData();
  const ref = useRef();

  const {
    data,
    loading,
    error,
    HandleGetNextPage,
    HandleGetPreviousPage,
    page,
  } = useVideos({
    grade: User?.user?.data?.grade,
    size: 6,
  });
  const {
    count,
    loading: countLoading,
    error: countError,
  } = useCollectionCount({
    collectionName: "lessons",
    GetQuery: `grade == ${User.user.data?.grade}`,
  });
  const pagesNumber = Math.ceil(count / 6);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);
  return (
    <Stack
      className="videos-landing"
      p="15px"
      display="flex"
      alignItems="center"
      gap="25px"
      ref={ref}
    >
      <Heading
        as="h3"
        textAlign="center"
        pos="relative"
        transition="0.3s"
        _after={{
          content: `""`,
          pos: "absolute",
          h: "2px",
          w: "100%",
          bottom: "-10px",
          left: "50%",
          translate: "-50% 0%",
          bgColor: "gray.300",
        }}
        _before={{
          content: `""`,
          pos: "absolute",
          h: "2px",
          w: "100%",
          top: "-5px",
          left: "50%",
          translate: "-50% 0%",
          bgColor: "gray.300",
        }}
        color="gray.500"
        size="xl"
      >
        {User.user?.data?.grade}
      </Heading>
      <Flex alignItems="center" gap="10px">
        Lectures Count
        <Button colorScheme="teal" isLoading={countLoading}>
          {count}
        </Button>
      </Flex>
      {loading && <CircularProgress isIndeterminate mt="20px" />}
      {!loading && !error && data?.length === 0 && (
        <Box
          display="flex"
          alignItems="center"
          textAlign="center"
          flexDir="column"
          gap="20px"
        >
          <Image
            src={NoDataImage}
            w="300px"
            h="300px"
            bgColor="gray.50"
            borderRadius="50%"
            objectFit="cover"
          />
          <Heading as="h3" size="md">
            No videos have been uploaded yet
          </Heading>
        </Box>
      )}
      {data?.length > 0 && (
        <Flex
          justifyContent="center"
          flexWrap="wrap"
          gap="15px"
          bgColor="gray.100"
          p="15px"
          borderRadius="lg"
          w="100%"
        >
          {data.map((video) => {
            return (
              <VideoCard
                key={video.id}
                Description={video.description}
                image={video.image}
                title={video.title}
                points={video.RequiredPoints}
                isFree={Number(video.RequiredPoints) === 0}
                id={video.id}
                isPurchased={User.user?.data?.VideosPurchased.includes(
                  video.id
                )}
                createdAt={video.createdAt}
              />
            );
          })}
        </Flex>
      )}
      {error && (
        <Alert
          w="fit-content"
          status="error"
          display="flex"
          justifyContent="center"
        >
          <AlertIcon />
          <AlertTitle>Error in fetching data check your network</AlertTitle>
        </Alert>
      )}

      <Flex
        gap="10px"
        alignItems="center"
        p="10px"
        w="100%"
        justifyContent="center"
      >
        <Button
          isLoading={loading}
          isDisabled={page === 0}
          onClick={HandleGetPreviousPage}
          colorScheme="blue"
        >
          Prev
        </Button>
        <Text>
          page {page + 1} of {pagesNumber}
        </Text>
        <Button
          isDisabled={page + 1 >= pagesNumber}
          isLoading={loading}
          onClick={HandleGetNextPage}
          colorScheme="blue"
        >
          Next
        </Button>
      </Flex>
    </Stack>
  );
}
