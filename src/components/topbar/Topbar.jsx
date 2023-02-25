import "./topbar.css";
import { BsSearch,BsFillPersonFill,BsFillChatFill } from 'react-icons/bs';
import { MdNotifications } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';


export default function Topbar() {
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Lamasocial</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <BsSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconItem">
          <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
      <BsFillPersonFill />
            <span className="topbarIconBadge">2</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </div>
          {/* <div className="topbarIconItem">
            <BsFillChatFill />
            <span className="topbarIconBadge">2</span>
          </div> */}
          <div className="topbarIconItem">
       
            <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
      <span className="topbarIconBadge1">1</span>
      <MdNotifications />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </div>
        </div>
        <img src="/assets/wateen.png" alt="" className="topbarImg"/>
      </div>
    </div>
  );
}