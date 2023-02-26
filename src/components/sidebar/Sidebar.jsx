import "./sidebar.css";

import { MdRssFeed,MdHelpOutline } from 'react-icons/md';
import {BsFillChatFill,BsPlayCircle,BsFillBookmarkFill,BsFillPersonFill} from 'react-icons/bs';
import { BiGroup,BiCalendarEvent } from 'react-icons/bi';
import { Link,NavLink } from "react-router-dom";
// import { BiGroup,BiCalendarEvent, BiFontSize } from 'react-icons/bi';
// import { BsFillPlusCircleFill } from "react-icons/bs";
// import Button from 'react-bootstrap/Button';
import { IoMdSchool } from 'react-icons/io';
import { useState , useEffect } from 'react';
import { Users } from "../../dummyData/dummyData";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function Sidebar() {

  const current_ID = JSON.parse(localStorage.getItem('id'));
  const [groups , setGroups] = useState([]);

  const [myAcceptrdGroups , setMyAcceptrdGroups] = useState([]);


  useEffect(()=>{
    getGroups();
    getMyAcceptrdGroups();
} , [])

function getGroups(){
  axios.get(`http://localhost:80/frontend/back_end/groups.php/`)
  .then(response => {
      console.log(response.data)
      setGroups(response.data);
  })
}

const getMyAcceptrdGroups = () => {

  axios.get(`http://localhost:80/frontend/back_end/getMyGroupAcceptedStatus.php/${current_ID}`)
  .then(response => {
      console.log(response.data)
      setMyAcceptrdGroups(response.data);
  })

}


  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <MdRssFeed className="sidebarIcon" />
            <NavLink to="/" className="sidebarListItemText">Home</NavLink>
          </li>
          <li className="sidebarListItem">
            <MdRssFeed className="sidebarIcon" />
            <NavLink to="/profile" className="sidebarListItemText">Profile</NavLink>
          </li>
          <li className="sidebarListItem">
            <BiGroup className="sidebarIcon" />
            <NavLink to="/Group" className="sidebarListItemText">Groups</NavLink>
          </li>

          <li className="sidebarListItem">
            <BsFillPersonFill className="sidebarIcon" />
            <span className="sidebarListItemText">Freinds</span>
          </li>

        </ul>
       
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList" >
          <h5 >My Groups</h5>
          { groups.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return (
                    <li className="sidebarFriend" key={index}>
                      <img className="sidebarFriendImg" src={require(`../image/${element.group_image}`)} alt="" />
                      <Link to={`/groups/${element.group_id}/show`}>
                          <span className="sidebarFriendName">{element.group_name}</span>
                      </Link>
                    </li>
           )})}

        <h5 >Groups</h5>

          { myAcceptrdGroups.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return true; // skip
                    }
                    return false;
                    }).map((element,index) => {
                    return (
                    <li className="sidebarFriend" key={index}>
                      <img className="sidebarFriendImg" src={require(`../image/${element.group_image}`)} alt="" />
                      <Link to={`/groups/${element.group_id}/show`}>
                          <span className="sidebarFriendName">{element.group_name}</span>
                      </Link>
                    </li>
           )})}
        </ul>
      </div>
    </div>
  );
}