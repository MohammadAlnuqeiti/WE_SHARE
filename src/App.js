import Home from "./pages/home/Home";
import Group from "./pages/group/Group";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Allgroups from "./pages/allgroups/Allgroups";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route } from "react-router-dom";




function App() {

 
  return(
    <>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/Register' element={<Register/>}></Route>
          <Route path='/groups/:id/show' element={<Group/>}></Route>
          <Route path='/Allgroups' element={<Allgroups/>}></Route>
      </Routes>
    </>
  ) 
}

export default App;