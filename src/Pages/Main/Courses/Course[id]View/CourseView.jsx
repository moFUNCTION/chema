import { CircularProgress, Flex, Stack, Tab, Tabs } from "@chakra-ui/react";
import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { TabsMenu } from "../../../../Components/TabssMenu/TabsMenu";
import {
  VideoCameraOutlined,
  BookOutlined,
  CloudUploadOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { useCoursePurchaseExistValidation } from "../../../../Firebase/Hooks/Courses/useCourseExistValidation/useCoursePurchaseExistValidation";
import { UseUserData } from "../../../../Context/UserDataProvider/UserDataProvider";
import { CourseUnPurchased } from "../CourseUnPurchased/CourseUnPurchased";

export default function CourseView() {
  const { user } = UseUserData();
  const { courseId } = useParams();
  const { status: checkIfPurchasedStatus, isPurchased } =
    useCoursePurchaseExistValidation({
      courseId,
      userId: user.data.uid,
    });
  return (
    <Flex overflowX="hidden" h="calc(100vh - 70px)">
      <TabsMenu TabsValues={TabsValues} />
      {checkIfPurchasedStatus === "loading" ? (
        <CircularProgress isIndeterminate m="0 auto" mt="auto" mb="auto" />
      ) : isPurchased ? (
        <Outlet />
      ) : (
        <CourseUnPurchased />
      )}
    </Flex>
  );
}
const TabsValues = [
  {
    title: "lessons",
    icon: <VideoCameraOutlined />,
  },
  {
    title: "quizes",
    icon: <BookOutlined />,
  },
  {
    title: "Files",
    icon: <CloudUploadOutlined />,
  },
  { title: "Course Statics", icon: <UserOutlined /> },
  { title: "Chat With Assistant", icon: <WhatsAppOutlined /> },
];
