import "./sidebar.css";
import { MdRssFeed,MdHelpOutline } from 'react-icons/md';
import {BsFillChatFill,BsPlayCircle,BsFillBookmarkFill,BsFillPersonFill} from 'react-icons/bs';
import { BiGroup,BiCalendarEvent } from 'react-icons/bi';
import { Link,NavLink } from "react-router-dom";
import { BiGroup,BiCalendarEvent, BiFontSize } from 'react-icons/bi';
import { IoMdSchool } from 'react-icons/io';
import { Users } from "../../dummyData/dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
// import { BsFillPlusCircleFill } from "react-icons/bs";
// import Button from 'react-bootstrap/Button';

export default function Sidebar() {
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
          {/* <div style={{display:"flex"}}> */}
          <h5 >Groups</h5>
          {/* <Button  href="/Group" variant="success"> <BsFillPlusCircleFill size="1.2em" style={{marginLeft:"60%"}}/>Great Group</Button>
          </div> */}
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}