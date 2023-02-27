import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feedUser/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from 'axios';
import { useState , useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  useParams} from "react-router-dom";
import Button from 'react-bootstrap/Button';




export default function UserProfile() {

  const {id} =useParams();
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
    getFriendsUser();
    getFriendsPending();
    getFriendsAccepted();
    getFriendsRequest();
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
/////////////////////////////////////////////////////////


 // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
 const getFriendsPending = () => {

  axios.get(`http://localhost:80/frontend/back_end/acceptFriend.php/${current_ID}`)
  .then((respone)=>{
      console.log(respone.data);
      let pendingRequest = respone.data.map((ele)=>{
          return ele.friend_id
      })
      setpendingRequest(pendingRequest);
      console.log(pendingRequest);
      setpendingFriends(respone.data)
  })
}
//   عرض جميع طلبات الصداقة الذين تمت الموافقة عليهم


const getFriendsAccepted = () => {

  axios.get(`http://localhost:80/frontend/back_end/friends.php/${current_ID}`)
  .then((respone)=>{
      console.log(respone.data);
      let friends = respone.data.map((ele)=>{
          return ele.friend_id
      })
      console.log(friends);
      setMyfriends(friends);
      setAcceptedFriends(respone.data)
  })
}

  // عرض طلبات الصداقة الخاصة بالمستخدم واللي لسا ما وافق عليهم

  const getFriendsRequest = () => {

      axios.get(`http://localhost:80/frontend/back_end/friendRequests.php/${current_ID}`)
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

  
//  pending وحالته بتكون friends  اضافة صديق جديد في جدول ال 
const AddFriends = (friendId) => {
  let inputs = {user_id:current_ID , friend_id:friendId};
  axios.post(`http://localhost:80/frontend/back_end/friends.php/save`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getFriendsPending();
      getFriendsRequest();
  })


  
}


// status الموافقة على طلب الصداقة وتغيير ال 
const AcceptFriend = (friendId) => {
  let inputs = {user_id:current_ID , friend_id:friendId};
  axios.put(`http://localhost:80/frontend/back_end/friends.php/edit`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getFriendsPending();
      getFriendsAccepted();
      getFriendsRequest();
  })


  
}

 
// الغاء ارسال طلب الصداقة
const removeRequest = (friendId) => {
  let inputs = {user_id:current_ID , friend_id:friendId};
  axios.put(`http://localhost:80/frontend/back_end/removeRequest.php/edit`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getFriendsPending();
      getFriendsAccepted();
  })


  
}

// حذف الصداقة
const removeFriend = (friendId) => {
  let inputs = {user_id:current_ID , friend_id:friendId};
  axios.put(`http://localhost:80/frontend/back_end/removeFriends.php`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getFriendsPending();
      getFriendsAccepted();
      
  })


  
}
/////////////////////////////////////////////////////////



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
                {(() => {
                            if (pendingRequest.includes(users.id) || Myfriends.includes(users.id) || requestFriend.includes(users.id)){
                                if(pendingRequest.includes(users.id)){
                                    return (

                                        <Link>
                                            <Button variant="primary" onClick={()=>removeRequest(users.id)}>remove request</Button>
                                        </Link>

                                    )

                                }
                                if(Myfriends.includes(users.id)){
                                    return (
                                                <Link>
                                                    <Button variant="danger" onClick={()=>removeFriend(users.id)}>remove friends</Button>
                                                </Link>
                                        )

                                }
                                if(requestFriend.includes(users.id)){
                                    return (
                                            <Link>
                                                <Button variant="primary" onClick={()=>AcceptFriend(users.id)}>accept</Button>
                                            </Link>
                                    )

                                }
                             
                            }else{
                                return ( 
                              
                                    <Link>
                                        <Button variant="primary" onClick={()=>AddFriends(users.id)}>Add</Button>
                                    </Link>
                               
                                )
                            }
              
            })()}
                        
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed user_id={id}/>
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