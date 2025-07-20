import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../views/Home";
import Feed from "../views/Feed";
import DetailsPublication from "../views/DetailsPublication";
import UserProfile from "../views/users/Profile";
import UserEditProfile from "../views/users/EditProfile";
import Header from "../components/template/Header.jsx";
import Footer from "../components/template/Footer.jsx";
import SignUp from "../views/SignUp.jsx";
import Login from "../views/Login.jsx";
import PasswordRecovery from "../views/PasswordRecovery.jsx";
import { Toaster } from "sonner";
import NewPostPet from "../views/NewPostPet.jsx";
import NewPostState from "../views/NewPostState.jsx";
import NewPostTag from "../views/NewPostTag.jsx";
import NewPostAddInfo from "../views/NewPostAddInfo.jsx";
import NewPostMap from "../views/NewPostMap.jsx";
import { PetProvider } from "../contexts/post/PetProvider";
import LandingPage from "../views/LandingPage.jsx";

export const MainRouter = () => {
  const location = useLocation();
  const hideHeaderRoutes = [
    "/register",
    "/signup",
    "/login",
    "/passwordrecovery",
    "/landingpage",
  ];
  return (
    <>
      <Toaster richColors expand={true} />
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/pet/:id" element={<DetailsPublication />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/user/edit/:id" element={<UserEditProfile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landingpage" element={<LandingPage />} />

        <Route path="/passwordrecovery" element={<PasswordRecovery />} />
        <Route
          path="/post"
          element={
            <PetProvider>
              <NewPostPet />
            </PetProvider>
          }
        />
        <Route
          path="/post/state"
          element={
            <PetProvider>
              <NewPostState />
            </PetProvider>
          }
        />
        <Route
          path="/post/tag"
          element={
            <PetProvider>
              <NewPostTag />
            </PetProvider>
          }
        />
        <Route
          path="/post/info"
          element={
            <PetProvider>
              <NewPostAddInfo />
            </PetProvider>
          }
        />
        <Route
          path="/post/map"
          element={
            <PetProvider>
              <NewPostMap />
            </PetProvider>
          }
        />
      </Routes>
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};
