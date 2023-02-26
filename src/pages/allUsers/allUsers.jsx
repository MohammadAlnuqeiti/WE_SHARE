import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./allUsers.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function AllUsers() {


    const id = JSON.parse(localStorage.getItem('id'));

    const [users,setUsers] = useState([]);
    const [pendingFriends,setpendingFriends] = useState([]);
    const [acceptrdFriends,setAcceptedFriends] = useState([]);
    const [requestFriends,setRequestFriends] = useState([]);  
    const [pendingRequest,setpendingRequest] = useState([]);
    const [friends,setfriends] = useState([]);
    const [requestFriend,setrequestFriend] = useState([]);

    useEffect(()=>{
        getUsers();
        getFriendsPending();
        getFriendsAccepted();
        getFriendsRequest();

    },[]);

        // لعرض جميع المستخدمين في الموقع
        const getUsers = () => {

            axios.get("http://localhost:80/frontend/back_end/user.php/users")
            .then((respone)=>{
                setUsers(respone.data)
                console.log(respone.data);
            })
        }
        
    // اللي بعثهم المستخدم pending عرض جميع طلبات الصداقة في حالة 
    const getFriendsPending = () => {

        axios.get(`http://localhost:80/frontend/back_end/acceptFriend.php/${id}`)
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

        axios.get(`http://localhost:80/frontend/back_end/friends.php/${id}`)
        .then((respone)=>{
            console.log(respone.data);
            let friends = respone.data.map((ele)=>{
                return ele.friend_id
            })
            console.log(friends);
            setfriends(friends);
            setAcceptedFriends(respone.data)
        })
    }

        // عرض طلبات الصداقة الخاصة بالمستخدم واللي لسا ما وافق عليهم

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

        
    //  pending وحالته بتكون friends  اضافة صديق جديد في جدول ال 
    const AddFriends = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.post(`http://localhost:80/frontend/back_end/friends.php/save`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getUsers();
            getFriendsPending();
            getFriendsRequest();
        })


        
    }

    
    // status الموافقة على طلب الصداقة وتغيير ال 
    const AcceptFriend = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
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
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost:80/frontend/back_end/removeRequest.php/edit`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
        })


        
    }
    
    // حذف الصداقة
    const removeFriend = (friendId) => {
        let inputs = {user_id:id , friend_id:friendId};
        axios.put(`http://localhost:80/frontend/back_end/removeFriends.php`,inputs)
        .then((respone)=>{
            console.log(respone.data);
            getFriendsPending();
            getFriendsAccepted();
            
        })


        
    }
  


    return (
      <>
        <Topbar />
        <div className="groupContainer">
          <Sidebar />

          <div className="Allgroups">


      <div className="AllgroupsWrapper" style={{display:"flex",flexWrap:"wrap"}}>
      {users.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.id === id) {
                        return false; // skip
                    }
                    return true;
                    }).map((ele,index)=>{
                        return(

                  <Card key={index} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={require(`../../components/image/${ele.image}`)} />
                  <Card.Body>
                    <Card.Title>{ele.name}</Card.Title>
                    <Card.Text>
                            {ele.email}                    
                    </Card.Text>
                    {(() => {
                            if (pendingRequest.includes(ele.id) || friends.includes(ele.id) || requestFriend.includes(ele.id)){
                                if(pendingRequest.includes(ele.id)){
                                    return (

                                        <Link>
                                            <Button variant="primary" onClick={()=>removeRequest(ele.id)}>remove request</Button>
                                        </Link>

                                    )

                                }
                                if(friends.includes(ele.id)){
                                    return (
                                                <Link>
                                                    <Button variant="danger" onClick={()=>removeFriend(ele.id)}>remove friends</Button>
                                                </Link>
                                        )

                                }
                                if(requestFriend.includes(ele.id)){
                                    return (
                                            <Link>
                                                <Button variant="primary" onClick={()=>AcceptFriend(ele.id)}>accept</Button>
                                            </Link>
                                    )

                                }
                             
                            }else{
                                return ( 
                              
                                    <Link>
                                        <Button variant="primary" onClick={()=>AddFriends(ele.id)}>Add</Button>
                                    </Link>
                               
                                )
                            }
              
            })()}
                        
                    
                    <Link to={`/UserProfile/${ele.id}/show`}>
                        <Button variant="success">Show Profile</Button>
                    </Link>
     



      </Card.Body>
    </Card>

)})}
      </div>
    </div>
          </div>
    </>
  );
}