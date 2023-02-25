import "./post.css";
import { MdOutlineMoreVert } from 'react-icons/md';
import { Users } from "../../dummyData/dummyData";
import axios from 'axios';
import { useState , useEffect , useParams } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";


export default function Post({ post }) {
  // const [like,setLike] = useState(post.like)
  // const [isLiked,setIsLiked] = useState(false)

  // const likeHandler =()=>{
  //   setLike(isLiked ? like-1 : like+1)
  //   setIsLiked(!isLiked)
  // }


  const current_ID = JSON.parse(localStorage.getItem('id'));
  const current_Email = localStorage.getItem('email');

  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);

  const [file, setFile] = useState(null);


  useEffect(()=>{
    getPosts();
    // getComments();
} , [])
 // Posts



 function getPosts(){
  axios.get(`http://localhost:80/frontend/back_end/posts.php/`)
  .then(response => {
      setPosts(response.data);
  })
}

const handleImagePost = async (e) => {
e.preventDefault();

const formData = new FormData();

formData.append("post", inputs);
formData.append("user_id", current_ID);
formData.append("file", file);

try {
  const response = await axios.post(
    "http://localhost:80/frontend/back_end/posts.php", formData
  );
  console.log(response.data);
  window.location.assign('/');
} catch (error) {
  console.error(error);
}
};

const handlePost = (e) => {
  const value = e.target.value;
  setInputs(value)
}

const handleChange = (e) => {
  const value = e.target.value;
  const post_id = e.target.id;
  const user_id = e.target.name;
  setInputs({'comment_content': value , 'post_id': post_id , 'user_id' : user_id})
}








const editPost = (id) => {
document.getElementById(`post${id}`).style.display = 'none';
document.getElementById(`editPostForm${id}`).style.display = 'block';
document.getElementById(`editPostBTN${id}`).style.display = 'none';
}

const handleEditPost = (id) => {
const post_id = id;
const value = document.getElementById(`editPostInput${id}`).value;
setInputs({'post_content': value , 'post_id' : post_id})
}

const handleEditPostSubmit  = async (e) => {
e.preventDefault();

const formEditData = new FormData();

formEditData.append("post_content", inputs['post_content']);
formEditData.append("post_id", inputs['post_id']);
formEditData.append("file", file);

console.log(formEditData);

try {
  const response = await axios.post(
    "http://localhost:80/frontend/back_end/postEdit.php", formEditData
  );
  console.log(response.data);
  // window.location.assign('/');
} catch (error) {
  console.error(error);
}
};









const deletePost = (id) => {
axios.delete(`http://localhost:80/frontend/back_end/posts.php/${id}`).then(function(response){
  window.location.assign('/');
})
}


const canclePostEdit = (id) => {
  document.getElementById(`post${id}`).style.display = 'block';
  document.getElementById(`editPostForm${id}`).style.display = 'none';
  document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
  document.getElementById(`imgPost${id}`).style.display = 'block';
}



  return (

    <>
    { posts.map((post,index) => {
      return (
    <div className="post" key={index}>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={require(`../image/icon.png`)}
              alt=""
            />
            <span className="postUsername">
            {post.name}
            </span>
            <span className="postDate">{post.created_at}</span>
          </div>
          <div className="postTopRight">
          {(post.user_id === current_ID) ?
            <div>
              <button onClick={() => {deletePost(post.post_id)}}>Delete Your Post</button>
              <button id={`editPostBTN${post.post_id}`} onClick={() => {editPost(post.post_id)}}><FaEdit /></button>
            </div>
            : null }
+          </div>
        </div>
        {(post.post_image !== 'a') ? 
        <div className="postCenter">
          <span className="postText" id={`post${post.post_id}`}>{post.content}</span>
          <form id={`editPostForm${post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>
          <textarea 
          style={{width: '50vw'}} 
          type="text" 
          defaultValue={post.content} 
          id={`editPostInput${post.post_id}`} onChange={() => handleEditPost(post.post_id)}/>

          <br />

          <input 
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}/>

          <button type='submit'>Update</button>
          <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(post.post_id)}} type='button'>Cancle</button>
      </form>
          <img className="postImg" src={require(`../image/${post.post_image}`)} alt="" id={`imgPost${post.post_id}`}/>
        </div>
          : 
          <div className="postCenter">

          <span className="postText" id={`post${post.post_id}`}>{post.content}</span>
          <form id={`editPostForm${post.post_id}`} action="" style={{display : 'none'}} onSubmit={handleEditPostSubmit}>

          <textarea 
            style={{width: '50vw'}} 
            type="text" 
            defaultValue={post.content} 
            id={`editPostInput${post.post_id}`} 
            onChange={() => handleEditPost(post.post_id)}/>

          <input 
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}/>

          <br />

          <button type='submit'>Update</button>
          <button style={{background : 'red' , color : 'white'}} onClick={()=>{canclePostEdit(post.post_id)}}  type='button'>Cancle</button>

      </form>

          </div>
    }
        <div className="postBottom">
          <div className="postBottomLeft">
            {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
            <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span> */}
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
    )})}
    </>
  )
}