import { Outlet } from "react-router-dom";
import { UseUserData } from "../../Context/UserDataProvider/UserDataProvider";
import { CircularProgress } from "@chakra-ui/react";
import { NoUserFound } from "./NoUserFound/NoUserFound";
import useOnlineStatus from "../../Hooks/useOnlineStatus/useOnlineStatus";
import { lazy } from "react";
import { ReactLazy } from "../../Components/ReactLazy/ReactLazy";
import { RefactoringPage } from "./RefactoringPage/RefactoringPage";
const OfflineStatus = lazy(() => import("./OfflineStatus/OfflineStatus"));
// refactoring page
const isRefactoring = false;

export default function Index() {
  const User = UseUserData();
  const OnlineStatus = useOnlineStatus();
  return (
    <>
      {isRefactoring && <RefactoringPage />}
      {User?.user?.loading && (
        <CircularProgress
          pos="fixed"
          top="50%"
          left="50%"
          sx={{ translate: "-50% -50%" }}
          isIndeterminate
        />
      )}
      {!User?.user?.loading &&
        User.user?.data &&
        OnlineStatus &&
        !isRefactoring && <Outlet />}
      {!User?.user?.loading && !User.user?.data && <NoUserFound />}
      {!OnlineStatus && (
        <ReactLazy>
          <OfflineStatus />
        </ReactLazy>
      )}
    </>
  );
}
