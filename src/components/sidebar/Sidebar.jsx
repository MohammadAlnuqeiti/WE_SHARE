import "./sidebar.css";
import { MdRssFeed,MdHelpOutline } from 'react-icons/md';
import {BsFillChatFill,BsPlayCircle,BsFillBookmarkFill,BsFillPersonFill} from 'react-icons/bs';
import { BiGroup,BiCalendarEvent } from 'react-icons/bi';
import { Link,NavLink } from "react-router-dom";
import { IoMdSchool } from 'react-icons/io';
import { Users } from "../../dummyData/dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

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
        <ul className="sidebarFriendList">
          <h5>My Groups</h5>
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}