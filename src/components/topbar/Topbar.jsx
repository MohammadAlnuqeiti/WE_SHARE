import "./topbar.css";
import { BsSearch,BsFillPersonFill,BsFillChatFill } from 'react-icons/bs';
import { MdNotifications } from 'react-icons/md';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom";





export default function Topbar() {

  const id = JSON.parse(localStorage.getItem('id'));
  const ImageUser = localStorage.getItem('image');

  const [requestFriends,setRequestFriends] = useState([]);  
  const [requestFriend,setrequestFriend] = useState([]);

  useEffect(()=>{
    getFriendsRequest();

},[]);

  const getFriendsRequest = () => {

    axios.get(`http://localhost:80/frontend/back_end/friendRequests.php/${id}`)
    .then((respone)=>{
        console.log(respone.data);
        let requestFriend = respone.data.map((ele)=>{
            return ele.user_id
        })
        console.log(requestFriend);
        setrequestFriend(requestFriend);
        setRequestFriends(respone.data)
    })
}

    // status الموافقة على طلب الصداقة وتغيير ال 
    const AcceptFriend = (friendId) => {
      let inputs = {user_id:id , friend_id:friendId};
      axios.put(`http://localhost:80/frontend/back_end/friends.php/edit`,inputs)
      .then((respone)=>{
          getFriendsRequest();
      })
    }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Lamasocial</span>
      </div>
      <div className="topbarCenter">
        {/* <div className="searchbar">
          <BsSearch className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div> */}
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div  className="topbarIconItem">
          <Dropdown >
      <Dropdown.Toggle variant="#008069" bsPrefix >
      <BsFillPersonFill style={{color:"white"}} />
      {/* {requestFriends.length > 0 ?
            <span className="topbarIconBadge">{requestFriends.length}</span>
            :
            ""} */}
            <span className="topbarIconBadge" >{requestFriends.length}</span>
      </Dropdown.Toggle >
      <Dropdown.Menu >
        
      {requestFriends.map((ele,index)=>{
            return(
        <Dropdown.Item   href="#/action-1" key={index} >
          <tr>
            <td>{ele.name}</td>
            <td>
            <Link>
                <Button variant="primary" onClick={()=>AcceptFriend(ele.user_id)}>accept</Button>
            </Link>
            </td>
          </tr>
          
        
        </Dropdown.Item>
        // <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        // <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>

        )})}
      </Dropdown.Menu>
    </Dropdown>
          </div>
          {/* <div className="topbarIconItem">
            <BsFillChatFill />
            <span className="topbarIconBadge">2</span>
          </div> */}
          <div className="topbarIconItem">
       
            <Dropdown>
      {/* <Dropdown.Toggle  id="dropdown-basic" bsPrefix>
      <span className="topbarIconBadge1">1</span>
      <MdNotifications />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu> */}
    </Dropdown>
          </div>
        </div>

        <div style={{display:"flex",marginTop:"2%"}}>
        <p style={{marginLeft:"-10%"}}>Hello,Haneen</p>
        <img style={{marginLeft:"10%"}} src={require(`../image/${ImageUser}`)} alt="" className="topbarImg"/>
         </div>
      </div>
    </div>
  );
}