import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feedUser/Feed";
import axios from 'axios';
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';


export default function Profile() {
  // const {id} =useParams();

  const current_ID = JSON.parse(localStorage.getItem('id'));


  const [dataUsers,setDataUsers] = useState([]);
  const [friendsUser,setFriendsUser] = useState([]); // data user friend as obj
  const [friends,setfriends] = useState([]); // data user friend as array
  const [pendingRequest,setpendingRequest] = useState([]);
  const [Myfriends,setMyfriends] = useState([]);
  const [requestFriend,setrequestFriend] = useState([]);
  const [pendingFriends,setpendingFriends] = useState([]);
  const [acceptrdFriends,setAcceptedFriends] = useState([]);
  const [requestFriends,setRequestFriends] = useState([]); 


  
  useEffect(()=>{
    getDataUsers();
    // getFriendsUser();
    // getFriendsPending();
    // getFriendsAccepted();
    // getFriendsRequest();
},[]);

  // لعرض  بيانات المستخدم في الموقع
  const getDataUsers = () => {

    axios.get(`http://localhost:80/frontend/back_end/user.php/users/${current_ID}`)
    .then((respone)=>{
      setDataUsers(respone.data)
        console.log(respone.data);
    })
}

  return (
    <>
    {dataUsers.map((users,index)=>{

    return <div key={index}>

  
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={require("../../components/image/ayla.jpg")}
                alt=""
              />
              <img
                className="profileUserImg"
                src={require(`../../components/image/${users.image}`)}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{users.name}</h4>
                <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
          <Feed user_id={current_ID}/>
            <Rightbar profile/>
          </div>
        </div>
      </div>
      </div>
        })}
    </>
  );
}