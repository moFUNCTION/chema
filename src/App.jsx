import { lazy, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
// components
import { ReactLazy } from "./Components/ReactLazy/ReactLazy";
import { Header } from "./Components/Header/Header";
import { Footer } from "./Components/Footer/Footer";
import { MassengerChatPlugin } from "./Components/MassengerChatPlugin/MassengerChatPlugin";
// ___pages___
// landing
const Landing = lazy(() => import("./Pages/Landing/index"));
// not found
const PageNotFound = lazy(() => import("./Pages/PageNotFound/PageNotFound"));
// auth
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Register = lazy(() => import("./Pages/Auth/Register/Register"));
const ResetPassword = lazy(() =>
  import("./Pages/Auth/ResetPassword/ResetPassword")
);
// __main__
const Main = lazy(() => import("./Pages/Main/Index"));
// home
const Home = lazy(() => import("./Pages/Main/Home/Home"));
// about
const About = lazy(() => import("./Pages/About/About"));
// user information
const User_Information = lazy(() =>
  import("./Pages/Main/User_Info/User_Information")
);
// chat
const Chat = lazy(() => import("./Pages/Main/Chat/Chat"));
// video
const VideoLanding = lazy(() =>
  import("./Pages/Main/Videos/VideosLanding/VideoLanding")
);
const VideoPurchase = lazy(() =>
  import("./Pages/Main/Videos/VideoPurchase/VideoPurchase")
);
const VideoWatch = lazy(() =>
  import("./Pages/Main/Videos/VideoWatch/VideoWatch")
);
// quiz
const QuizesLanding = lazy(() =>
  import("./Pages/Main/Quizes/QuizesLanding/QuizesLanding")
);
const QuizLanding = lazy(() =>
  import("./Pages/Main/Quizes/QuizLanding/QuizLanding")
);
const QuizMain = lazy(() => import("./Pages/Main/Quizes/QuizMain/QuizMain"));
const QuizResult = lazy(() =>
  import("./Pages/Main/Quizes/QuizResult/QuizResult")
);
const QuizAnswers = lazy(() =>
  import("./Pages/Main/Quizes/QuizAnswers/QuizAnswers")
);
// live
const Live = lazy(() => import("./Pages/Main/Live/Live"));
// code redeem
const Code_Redeem = lazy(() => import("./Pages/Main/Code_Redeem/Code_Redeem"));
// courses
const CoursesLanding = lazy(() =>
  import("./Pages/Main/Courses/CoursesLanding/CoursesLanding")
);
const CourseView = lazy(() =>
  import("./Pages/Main/Courses/Course[id]View/CourseView")
);
const CoursePurchase = lazy(() =>
  import("./Pages/Main/Courses/Course[id]Purchase/CoursePurchase")
);
const CourseLessons = lazy(() =>
  import("./Pages/Main/Courses/Course[id]Lessons/CourseLessons")
);
function App() {
  return (
    <>
      <Header />
      <MassengerChatPlugin />
      <Routes>
        <Route
          path="/"
          element={
            <ReactLazy>
              <Landing />
              <Footer />
            </ReactLazy>
          }
        />
        <Route
          path="*"
          element={
            <ReactLazy>
              <PageNotFound />
            </ReactLazy>
          }
        />
        <Route
          path="/about"
          element={
            <ReactLazy>
              <About />
            </ReactLazy>
          }
        />
        <Route
          path="/login"
          element={
            <ReactLazy>
              <Login />
            </ReactLazy>
          }
        />
        <Route
          path="/register"
          element={
            <ReactLazy>
              <Register />
            </ReactLazy>
          }
        />
        <Route
          path="/reset_password"
          element={
            <ReactLazy>
              <ResetPassword />
            </ReactLazy>
          }
        />
        <Route
          path="/main"
          element={
            <ReactLazy>
              <Main />
            </ReactLazy>
          }
        >
          <Route
            index
            element={
              <ReactLazy>
                <Home />
                <Footer />
              </ReactLazy>
            }
          />

          <Route
            path="home"
            element={
              <ReactLazy>
                <Home />
                <Footer />
              </ReactLazy>
            }
          />
          <Route
            path="user"
            element={
              <ReactLazy>
                <User_Information />
              </ReactLazy>
            }
          />
          <Route
            path="chat"
            element={
              <ReactLazy>
                <Chat />
              </ReactLazy>
            }
          />
          <Route
            path="videos"
            element={
              <ReactLazy>
                <VideoLanding />
              </ReactLazy>
            }
          />
          <Route
            path="videos/:id"
            element={
              <ReactLazy>
                <VideoWatch />
              </ReactLazy>
            }
          />
          <Route
            path="videos/purchase/:id"
            element={
              <ReactLazy>
                <VideoPurchase />
              </ReactLazy>
            }
          />
          <Route
            path="quizes"
            element={
              <ReactLazy>
                <QuizesLanding />
              </ReactLazy>
            }
          />
          <Route
            path="quizes/:id"
            element={
              <ReactLazy>
                <QuizLanding />
              </ReactLazy>
            }
          />
          <Route
            path="quizes/:id/preform"
            element={
              <ReactLazy>
                <QuizMain />
              </ReactLazy>
            }
          />
          <Route
            path="quizes/:id/result"
            element={
              <ReactLazy>
                <QuizResult />
              </ReactLazy>
            }
          />
          <Route
            path="quizes/:id/answers"
            element={
              <ReactLazy>
                <QuizAnswers />
              </ReactLazy>
            }
          />
          <Route
            path="live"
            element={
              <ReactLazy>
                <Live />
              </ReactLazy>
            }
          />
          <Route
            path="code_redeem"
            element={
              <ReactLazy>
                <Code_Redeem />
              </ReactLazy>
            }
          />
          <Route
            path="courses"
            element={
              <ReactLazy>
                <CoursesLanding />
              </ReactLazy>
            }
          />
          <Route
            path="courses/:courseId"
            element={
              <ReactLazy>
                <CourseView />
              </ReactLazy>
            }
          >
            <Route
              index
              element={
                <ReactLazy>
                  <CourseLessons />
                </ReactLazy>
              }
            />
          </Route>
          <Route
            path="courses/:courseId/purchase"
            element={
              <ReactLazy>
                <CoursePurchase />
              </ReactLazy>
            }
          />
          <Route path="user/coursesPurchased" />
        </Route>
      </Routes>
    </>
  );
}

export default App;
