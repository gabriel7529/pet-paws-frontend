
import {Routes, Route, useLocation} from 'react-router-dom';
import Home from '../views/Home';
import Feed from '../views/Feed';
import DetailsPublication from '../views/DetailsPublication';
import UserProfile from '../views/users/Profile';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/template/Header.jsx'
import  SignUp  from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';

export const MainRouter=()=>{
  const location = useLocation();
  const hideHeaderRoutes = ["/register","/signup","/login"];
  return(
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header/>}
      <Routes>
        <Route path="/" element={<Home></Home>}/>,
        <Route path="/feed" element={<Feed></Feed>}/>
        <Route path="/pet/:id" element={<DetailsPublication></DetailsPublication>}/>
        <Route path="/user/:id" element={<UserProfile></UserProfile>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}
