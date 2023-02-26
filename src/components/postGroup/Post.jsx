import "./post.css";
import { MdOutlineMoreVert } from 'react-icons/md';
import axios from 'axios';
import { useState , useEffect , useParams } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";


export default function Post( props ) {
  // const [like,setLike] = useState(post.like)
  // const [isLiked,setIsLiked] = useState(false)

  // const likeHandler =()=>{
  //   setLike(isLiked ? like-1 : like+1)
  //   setIsLiked(!isLiked)
  // }


  const current_ID = JSON.parse(localStorage.getItem('id'));
  const group_id = props.group_id;
  const admin_group = props.admin_group;
  const current_Email = localStorage.getItem('email');

  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);

  const [file, setFile] = useState(null);

 
  useEffect(()=>{
    getPosts();
    getComments();
    console.log(props.group_id);
    console.log(props.admin_group);

  } , [])
 // Posts



 function getPosts(){
  axios.get(`http://localhost:80/frontend/back_end/postsGroup.php/${group_id}`)
  .then(response => {
    console.log(response.data);
      setPosts(response.data);
  })
}

const handleImagePost = async (e) => {
e.preventDefault();

const formData = new FormData();

formData.append("post", inputs);
formData.append("user_id", current_ID);
formData.append("file", file);
formData.append("group_id", group_id);

try {
  const response = await axios.post(
    "http://localhost:80/frontend/back_end/postsGroup.php", formData
  );
  console.log(response.data);
  getPosts();

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
    "http://localhost:80/frontend/back_end/postEditGroup.php", formEditData
  );
  console.log(response.data);
  getPosts();
  // window.location.assign('/');
} catch (error) {
  console.error(error);
}
};









const deletePost = (id) => {
axios.delete(`http://localhost:80/frontend/back_end/postsGroup.php/${id}`).then(function(response){
  getPosts();
  // window.location.assign('/');
})
}


const canclePostEdit = (id) => {
  document.getElementById(`post${id}`).style.display = 'block';
  document.getElementById(`editPostForm${id}`).style.display = 'none';
  document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
  document.getElementById(`imgPost${id}`).style.display = 'block';
}

   // Comments




   function getComments(){
    axios.get(`http://localhost:80/frontend/back_end/commentsGroup.php/`)
    .then(response => {
      console.log(response.data);
        setComments(response.data);
    })
}

  const handleCreateComment = (e) => {
      e.preventDefault();
      axios.post('http://localhost:80/frontend/back_end/commentsGroup.php/' , inputs).then((res)=> {
        console.log(res);
        getComments();

      }
      )
  }

  const deleteComment = (id) => {
    // console.log(id);
    axios.delete(`http://localhost:80/frontend/back_end/commentsGroup.php/${id}`).then(function(response){
      console.log(response);
      getComments();
    })
  }

  const editComment = (id) => {
    document.getElementById(`comment${id}`).style.display = 'none';
    document.getElementById(`editCommentForm${id}`).style.display = 'block';
    document.getElementById(`editCommentBTN${id}`).style.display = 'none';
  }

  const handleEditComment = (id) => {
    const comment_id = id;
    const value = document.getElementById(`editCommentInput${id}`).value;
    setInputs({'comment_content': value , 'comment_id' : comment_id})
  }

  const handleEditCommentSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:80/frontend/back_end/commentsGroup.php/' , inputs).then(()=>{

      getComments();
    }

      // window.location.assign('/')
    )
  }

  const foucsOnComment = (id) => {
    document.getElementById(id).focus();
  }

  
  const cancleCommentEdit = (id) => {
    document.getElementById(`comment${id}`).style.display = 'block';
    document.getElementById(`editCommentForm${id}`).style.display = 'none';
    document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';
    
  }

  return (

    <>
    { posts.map((post,index) => {
      return (
        <div key={index}>
    <div className="post" >
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
          {(post.user_id === current_ID) || (admin_group===current_ID) ?
            <div>
              <button onClick={() => {deletePost(post.post_id)}}>Delete Your Post</button>
              <button id={`editPostBTN${post.post_id}`} onClick={() => {editPost(post.post_id)}}><FaEdit /></button>
            </div>
            : null }
          </div>
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
 
      <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                  <div className="w-100">
                  { comments.map((comment,index) => {
                    if (comment.post_id === post.post_id){
                    return (
                    <div key={index}>
                        <div style={{display : 'flex' , justifyContent : 'space-between'}}>
                          <div>
                            <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                            <span>{comment.name}</span>
                          </div>
                          {(comment.user_id === current_ID) ||(admin_group===current_ID)? 
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                              <button id={`editCommentBTN${comment.comment_id}`} onClick={() => {editComment(comment.comment_id)}}><FaEdit /></button>
                          </div> : (post.user_id === current_ID) ?
                          <div>
                              <button onClick={() => {deleteComment(comment.comment_id)}}>Remove comment</button>
                          </div>
                          : null }
                        </div>
                        <br />
                        <div className="form-outline w-100">





                            <p id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                            <form id={`editCommentForm${comment.comment_id}`} action="" style={{display : 'none'}} onSubmit={handleEditCommentSubmit}>
                              <input type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)}/>
                              <button type='submit'>Update</button>
                              <button style={{background : 'red' , color : 'white'}} onClick={()=>{cancleCommentEdit(comment.comment_id)}}  type='button'>Cancle</button>
                            </form>






                            <p>{comment.comment_created_at}</p>
                        </div>
                        <hr />
                    </div>
                    )}})}
                  </div>
                  <div className="card-footer py-3 border-0" style={{backgroundColor: '#f8f9fa'}}>
                      <div className="d-flex flex-start w-100">
                        <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                        <form className="form-outline w-100" onSubmit={handleCreateComment}>
                          <textarea className="form-control" id={post.post_id} name={current_ID} rows={4} style={{background: '#fff'}} onChange={handleChange}/>
                          <button type="submit" className="btn btn-primary btn-sm">Post comment</button>
                        </form>
                      </div>
                  </div>
                  
                </div>
                  </div>
                  )})}
    </>
  )
}