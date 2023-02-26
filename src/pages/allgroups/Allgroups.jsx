import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./allgroups.css";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useState,useEffect } from "react";


export default function Allgroups() {
    const[data,setData]=useState([])

    useEffect(()=>{
getgroups();

    },[])
    const getgroups =()=>{
        
        axios.get("http://localhost/frontend/back_end/groups.php")
      
        .then((res)=>{
            console.log(res.data)
            setData(res.data)
        })
   } 
    return (
      <>
        <Topbar />
        <div className="groupContainer">
          <Sidebar />
          <div className="Allgroups">
      <div className="AllgroupsWrapper">
      {data.map((ele,index)=>(
      <Card key={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>{ele.group_name}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="success">ADD Group</Button>
      </Card.Body>
    </Card>
      ))}
         
      </div>
    </div>
          </div>
    </>
  );
}