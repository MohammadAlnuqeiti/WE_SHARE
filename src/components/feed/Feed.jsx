import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import { async } from "q";

export default function Feed() {


  const current_ID = JSON.parse(localStorage.getItem('id'));

  
  const [inputs, setInputs] = useState("")
  const [posts, setPosts] = useState([]);
  
  const [check, setCheck] = useState();

  useEffect(() => {
    console.log("rerender");
    getPosts();
  }, [check])



// function getPosts() {
//   axios.get(`http://localhost:80/frontend/back_end/posts.php/`)
//     .then(response => {
//       console.log(response.data);
//       setPosts(response.data);
//     })
// }

const getPosts = async () =>{
 await axios.get(`http://localhost:80/frontend/back_end/posts.php/${current_ID}`)
  .then(response => {
    console.log(response.data);
    setPosts(response.data);
  })
}

const handleSubmit = (check) => {
  console.log(check,"dddd");
  getPosts();
  setCheck(check);
  

}

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share handleSubmit={handleSubmit}/>
        {(posts == []) ?
                  <></>
                  :
                  posts.map((post) =>(
                    <Post key = {post.id} post ={post} handleSubmit={handleSubmit}/>
                    ))}
        {/* <Post/> */}
        
      </div>
    </div>
  );
}