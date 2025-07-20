// MainRouter.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Feed from "../views/Feed";
import DetailsPublication from "../views/DetailsPublication";
import UserProfile from "../views/users/Profile";
import UserEditProfile from "../views/users/EditProfile";
import Header from "../components/template/Header.jsx";
import Footer from "../components/template/Footer.jsx";
import SignUp from "../views/SignUp.jsx";
import Login from "../views/Login.jsx";
import PasswordRecovery from "../views/PasswordRecovery.jsx";
import {Toaster} from "sonner";
import NewPostPet from "../views/NewPostPet.jsx";
import NewPostState from "../views/NewPostState.jsx";
import NewPostTag from "../views/NewPostTag.jsx";
import NewPostAddInfo from "../views/NewPostAddInfo.jsx";
import NewPostMap from "../views/NewPostMap.jsx";
import {PetProvider} from "../contexts/post/PetProvider";
import LandingPage from "../views/LandingPage.jsx";
import Settings from "../views/Settings.jsx";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../views/AdminPage.jsx";
import AccessDenied from "../views/AccessDenied.jsx";
import ChatInterface from "../views/chat/ChatInterface.jsx";
import AlternateHeader from "../components/Settings/Header.jsx";


export const MainRouter = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    "/register",
    "/signup",
    "/login",
    "/passwordrecovery",
    "/landingpage",
    "/admin",
    "/settings",
    "/access-denied",
    "/"
  ];

  const alternateHeaderRoutes = ["/chats", "/post/map", "/settings", "/post/info", "/post", "/post/tag", "/post/state"]


  return (
    <>
      <PetProvider>
        <Toaster richColors expand={true} />
        {!hideHeaderRoutes.includes(location.pathname) &&
          (alternateHeaderRoutes.includes(location.pathname) ? (
            <AlternateHeader title={location.pathname} />
          ) : (
            <Header />
          ))
        }
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordrecovery" element={<PasswordRecovery />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route element={<ProtectedRoute allowedRoles={["ADMINISTRATOR"]} />}>
          <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["USER"]} />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:filter" element={<Feed />} />
            <Route path="/pet/:id" element={<DetailsPublication />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/user/edit/:id" element={<UserEditProfile />} />
            <Route path="/post" element={<NewPostPet />} />
            <Route path="/post/state" element={<NewPostState />} />
            <Route path="/post/tag" element={<NewPostTag />} />
            <Route path="/post/info" element={<NewPostAddInfo />} />
            <Route path="/post/map" element={<NewPostMap />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chats" element={<ChatInterface/>}/>
          </Route>
        </Routes>

        {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
      </PetProvider>
    </>
  );
};
