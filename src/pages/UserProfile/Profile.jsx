import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from 'axios';
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  useParams} from "react-router-dom";


export default function UserProfile() {

  const {id} =useParams();
  const current_ID = JSON.parse(localStorage.getItem('id'));

  const [dataUsers,setDataUsers] = useState([]);
  const [friendsUser,setFriendsUser] = useState([]); // data user friend as obj
  const [friends,setfriends] = useState([]); // data user friend as array

  useEffect(()=>{
    getDataUsers();
    getFriendsUser();
},[]);


    // لعرض  بيانات المستخدم في الموقع
    const getDataUsers = () => {

      axios.get(`http://localhost:80/frontend/back_end/user.php/users/${id}`)
      .then((respone)=>{
        setDataUsers(respone.data)
          console.log(respone.data);
      })
  }
    //   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم

    
    const getFriendsUser = () => {

      axios.get(`http://localhost:80/frontend/back_end/friends.php/${id}`)
      .then((respone)=>{
          console.log(respone.data);
          let friends = respone.data.map((ele)=>{
              return ele.friend_id
          })
          console.log(friends);
          setfriends(friends);
          setFriendsUser(respone.data)
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
            <Feed />
            <div className="rightbar">
            <div className="rightbarWrapper">
            <h4 className="rightbarTitle">User information</h4>
              <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">email:</span>
                  <span className="rightbarInfoValue">{users.email}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Phone:</span>
                  <span className="rightbarInfoValue">{users.phone}</span>
                </div>
                <div className="rightbarInfoItem">
                  <span className="rightbarInfoKey">Relationship:</span>
                  <span className="rightbarInfoValue">Single</span>
                </div>
              </div>
              <h4 className="rightbarTitle">User friends</h4>
              <div className="rightbarFollowings">
                {friendsUser.map((ele,index)=>{
                  return <>
                        {/* <Link to={`/UserProfile/${ele.user_id}/show`} > */}
                          <div className="rightbarFollowing"  key={index}>
                          <img
                            src={require(`../../components/image/${ele.image}`)}
                            alt=""
                            className="rightbarFollowingImg"
                          />
                          <span className="rightbarFollowingName" style={{textAlign:"center"}}>{ele.name}</span>
                        </div>
                        {/* </Link> */}
                  
                  </>
                })}
                {/* <div className="rightbarFollowing">
                  <img
                    src="assets/person/2.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="assets/person/3.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="assets/person/4.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="assets/person/5.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div>
                <div className="rightbarFollowing">
                  <img
                    src="assets/person/6.jpeg"
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">John Carter</span>
                </div> */}
              </div>
                </div>
              </div>
            </div>
            </div>
            </div>
            </div>
        })}
    </>
  );
}