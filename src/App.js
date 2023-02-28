import Home from "./pages/home/Home";
import Group from "./pages/group/Group";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Allgroups from "./pages/allgroups/Allgroups";
import AllUsers from "./pages/allUsers/allUsers";
import UserProfile from "./pages/UserProfile/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';
import EditProfile from "./pages/profile/EditProfile";
import {Routes, Route } from "react-router-dom";




function App() {

 
  return(
    <>
      <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/profile/:profile_id' element={<Profile/>}></Route>
          <Route path='/profile/:profile_id/edit' element={<EditProfile/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/groups/:id/show' element={<Group/>}></Route>
          <Route path='/UserProfile/:id/show' element={<UserProfile/>}></Route>
          <Route path='/Allgroups' element={<Allgroups/>}></Route>
          <Route path='/Allusers' element={<AllUsers/>}></Route>
      </Routes>
     
    </>
  ) 
}

export default App;