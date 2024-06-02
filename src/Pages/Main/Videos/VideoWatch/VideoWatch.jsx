import { Box, CircularProgress, Skeleton, Stack } from "@chakra-ui/react";
import { VideoSide } from "./Parts/VideoSide/VideoSide";
import { VideoComments } from "./Parts/VideoComments/VideoComments";
import { PdfSide } from "./Parts/PdfSide/PdfSide";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import { useParams } from "react-router-dom";
import { NotPurchased } from "./Parts/NotPurchased/NotPurchased";
import { useVideo } from "../../../../Firebase/Hooks/Videos/useVideo(id)/useVideo";
import { VideoData } from "./Parts/VideoData/VideoData";
import { InValidVideo } from "./Parts/InValidVideo/InValidVideo";
import { useLocation } from "react-router-dom";
export default function VideoWatch() {
  const User = UseUserData();
  const { id } = useParams();
  const { pathname } = useLocation();
  const CheckIfUserHavePurchasedVideo = () => {
    return User.user.data.VideosPurchased?.includes(id);
  };
  const lesson = useVideo({
    id: id,
  });

  return (
    <Stack pos="relative" p="10px">
      {lesson.loading && (
        <CircularProgress
          isIndeterminate
          pos="fixed"
          top="50%"
          left="50%"
          translate="-50% -50%"
        />
      )}
      {!lesson.loading && (
        <>
          {CheckIfUserHavePurchasedVideo() ||
          Number(lesson.data?.RequiredPoints) === 0 ? (
            <>
              {lesson.error ? (
                <InValidVideo err={lesson.error} />
              ) : (
                <>
                  <PdfSide pdf={lesson.data?.pdfFile} />
                  <VideoSide
                    isLoading={lesson.loading}
                    VideoSrc={lesson.data?.VideoURL}
                    ImageSrc={lesson.data?.image}
                    withIframe={!lesson.data?.WithExistedFile}
                  />
                  <VideoData
                    title={lesson.data?.title}
                    description={lesson.data?.description}
                  />
                  <VideoComments />
                </>
              )}
            </>
          ) : (
            <NotPurchased />
          )}
        </>
      )}
    </Stack>
  );
}
