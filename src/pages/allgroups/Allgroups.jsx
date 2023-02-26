import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./allgroups.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import CreateGroup from "./createGroup";


export default function Allgroups() {

  const current_ID = JSON.parse(localStorage.getItem('id'));

    const[data,setData]=useState([]);
    const[showUpdateForm,setShowUpdateForm]=useState(false);
    const [pendingMembers,setPendingMembers] = useState([]);
    const [acceptedMembers,setAcceptedMembers] = useState([]);

    useEffect(()=>{
      getGroups();
      getPendingMempers();
      getAcceptedMempers();
            },[])

            // لعرض كل الجروبات في الموقع

    const getGroups =()=>{
        
        axios.get("http://localhost/frontend/back_end/groups.php")
      
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
   } 


// لاضافة عضو لجروب معين
const AddToGroup = (groupId) => {
  let inputs = {user_id:current_ID , group_id:groupId};
  axios.post(`http://localhost:80/frontend/back_end/membersGroup.php/save`,inputs)
  .then((respone)=>{
      console.log(respone.data);
      getGroups();
      getPendingMempers();
      
            // getFriendsRequest();
  })
}
     //للجروبات pending لعرض كل طلبات المستخدم اللي حالتهم 
    const getPendingMempers = () => {

        axios.get(`http://localhost:80/frontend/back_end/getPendingMember.php/${current_ID}`)
        .then((respone)=>{
            console.log(respone.data);
            let pendingMembers = respone.data.map((ele)=>{
                return ele.group_id
            })
            console.log(pendingMembers);
            setPendingMembers(pendingMembers);
            // setPendingMempers(respone.data)
        })
    }

         //للجروبات accepted لعرض كل طلبات المستخدم اللي حالتهم 
         const getAcceptedMempers = () => {

          axios.get(`http://localhost:80/frontend/back_end/getAcceptedMember.php/${current_ID}`)
          .then((respone)=>{
              console.log(respone.data);
              let acceptedMembers = respone.data.map((ele)=>{
                  return ele.group_id
              })
              console.log(acceptedMembers);
              setAcceptedMembers(acceptedMembers);
              // setPendingMempers(respone.data)
          })
      }

  // لحذب طلب الاضافة 
    const removeRequest = (GroupId) => {
      let inputs = {user_id:current_ID , group_id:GroupId};
      axios.put(`http://localhost:80/frontend/back_end/getPendingMember.php/edit`,inputs)
      .then((respone)=>{
          console.log(respone.data);
          getGroups();
          getPendingMempers();
      })

    }


// ////////////////////
const [text, setText] = useState("");
const [file, setFile] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("user_id", current_ID);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:80/frontend/back_end/groups.php",
        formData
      );
      console.log(response.data);
      setShowUpdateForm(false);

    } catch (error) {
      console.error(error);
    }
  };



    return (
      <>
        <Topbar />
        <div className="groupContainer">
          <Sidebar />

          <div className="Allgroups">
          <Button variant="primary" onClick={()=>setShowUpdateForm(true)}>add group</Button>

          {showUpdateForm&& <CreateGroup handleSubmit={handleSubmit} setText={setText} setFile={setFile} text={text} />}

      <div className="AllgroupsWrapper" style={{display:"flex"}}>
      {data.filter(function(ele) {
                    // لحتى ما اطبع المستخد اللي عامل تسجيل دخول
                    if (ele.user_id === current_ID) {
                        return false; // skip
                    }
                    return true;
                    }).map((ele,index)=>(
                  <Card key={index} style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={require(`../../components/image/${ele.group_image}`)} />
                  <Card.Body>
                    <Card.Title>{ele.name}</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and make up the
                      bulk of the card's content.
                    </Card.Text>
                    {(() => {
                            if (pendingMembers.includes(ele.group_id) || acceptedMembers.includes(ele.group_id) ){
                                if(pendingMembers.includes(ele.group_id)){
                                  return ( 
                                        <Link>
                                        <Button variant="primary" onClick={()=>removeRequest(ele.group_id)}>remove request</Button>
                                    </Link>
                                      )

                                }
                                if(acceptedMembers.includes(ele.group_id)){
                                    return (
        
                                      <Link>
                                          <Button variant="danger"  onClick={()=>removeRequest(ele.group_id)}>delete group</Button>
                                      </Link>


                                    
                                                )

                                }
                              
                             
                            }else{
                              return ( 
                  
                                <Link>
                                    <Button variant="primary" onClick={()=>AddToGroup(ele.group_id)}>Add</Button>
                                </Link>
                            
                              )
                          }
              
            })()}
                                      <Link to={`/groups/${ele.group_id}/show`}>
                                          <Button variant="success">Show Group</Button>
                                      </Link>
     



      </Card.Body>
    </Card>
      ))}
         
      </div>
    </div>
          </div>
    </>
  );
}