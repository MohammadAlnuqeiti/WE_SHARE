import "./post.css";
import { MdOutlineMoreVert } from 'react-icons/md';
import { Users } from "../../dummyData/dummyData";
import axios from 'axios';
import { useState, useEffect, useParams } from 'react'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { CgBorderStyleDotted } from "react-icons/cg";
import { MdDeleteForever } from "react-icons/md";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import { async } from "q";





export default function Post({ post }) {
 


  const current_ID = JSON.parse(localStorage.getItem('id'));

  const [inputs, setInputs] = useState("")
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [likes , setLikes] = useState([]);
  const [file, setFile] = useState(null);
  const [showCommentsForm, setCommentsForm] = useState(false);


  useEffect(() => {
    getPosts();
    getComments();
    getLikes();

  }, [])
  // Posts



  function getPosts() {
    axios.get(`http://localhost:80/frontend/back_end/posts.php/`)
      .then(response => {
        // console.log(response.data);
        setPosts(response.data);
        getComments();
        getLikes();
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
    
      getPosts();
      // window.location.assign('/');
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
    setInputs({ 'comment_content': value, 'post_id': post_id, 'user_id': user_id })
  }








  const editPost = (id) => {
    document.getElementById(`post${id}`).style.display = 'none';
    document.getElementById(`editPostForm${id}`).style.display = 'block';
    document.getElementById(`editPostBTN${id}`).style.display = 'none';
  }

  const handleEditPost = (id) => {
    const post_id = id;
    const value = document.getElementById(`editPostInput${id}`).value;
    setInputs({ 'post_content': value, 'post_id': post_id })
  }

  const handleEditPostSubmit = async (e) => {
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









  const deletePost = async (id) => {
    await axios.delete(`http://localhost:80/frontend/back_end/posts.php/${id}`).then(function (response) {
      // window.location.assign('/');
      getPosts();
      getComments();
    })
  }


  const canclePostEdit = (id) => {
    document.getElementById(`post${id}`).style.display = 'block';
    document.getElementById(`editPostForm${id}`).style.display = 'none';
    document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
    document.getElementById(`imgPost${id}`).style.display = 'block';
  }

  // Comments




  async function getComments() {
    await axios.get(`http://localhost:80/frontend/back_end/comments.php/`)
      .then(response => {
        console.log(response.data);
        setComments(response.data);
      })
  }

  const handleCreateComment = async (e) => {
    e.preventDefault();
    
    await axios.post('http://localhost:80/frontend/back_end/comments.php/', inputs).then((res) => {
      console.log(res);
      getPosts();
      // window.location.assign('/')
    }
    )
    getPosts();
    getComments();
  }

  const deleteComment = (id) => {
    // console.log(id);
    axios.delete(`http://localhost:80/frontend/back_end/comments.php/${id}`).then(function (response) {
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
    setInputs({ 'comment_content': value, 'comment_id': comment_id })
  }

  const handleEditCommentSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:80/frontend/back_end/comments.php/', inputs).then(()=>{

      getComments();
      getPosts();
    }
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

  const ShowComments = (id) => {
    document.getElementById(`commentsForPost${id}`).style.display = 'block';

    // { showCommentsForm ? setCommentsForm(false) : setCommentsForm(true) }


  }


  // like


  const getLikes = () => {
    axios.get(`http://localhost:80/frontend/back_end/likes.php/`)
    .then(response => {
      console.log(response.data);
        setLikes(response.data);
    })
  }

  const handleLikePost =  (id) => {
    const post_id = id;
    const user_id = current_ID;
    setInputs({'user_id': user_id , 'post_id' : post_id})
  }

  const likePost = async (e) => {
    e.preventDefault();
    console.log(inputs)
      await axios.post('http://localhost:80/frontend/back_end/likes.php/' , inputs).then(()=>{

        getPosts();
        getComments();
        getLikes();
      }

        )
  }
  const removeLikePost = async (e) => {
    e.preventDefault();
    console.log(inputs)
      await axios.post('http://localhost:80/frontend/back_end/likeDelete.php/' , inputs).then(()=>{

        getPosts();
        getComments();
        getLikes();
      }
        // window.location.assign('/')
        )
  }

  var flagLike = false;
  var like_count = 0;
  // 
  return (

    <>
      {posts.map((post, index) => {
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
                    {(post.user_id === current_ID) ?
                      <div className="postBottun">
                        <Dropdown>
                          <Dropdown.Toggle variant="text-dark" id="dropdown-basic" bsPrefix >
                            <CgBorderStyleDotted />
                          </Dropdown.Toggle >

                          <Dropdown.Menu>
                            <div >
                              <Dropdown.Item variant="success" id={`editPostBTN${post.post_id}`} onClick={() => { editPost(post.post_id) }}><BiEdit />Edit</Dropdown.Item>
                            </div>
                            
                            <div >
                              <Dropdown.Item  variant="danger" onClick={() => { deletePost(post.post_id) }}><MdDeleteForever />Delete</Dropdown.Item>
                            </div>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      : null}
                  </div>
                </div>
                {(post.post_image !== 'a') ?
                  <div className="postCenter">
                    <span className="postText" id={`post${post.post_id}`}>{post.content}</span>
                    <form id={`editPostForm${post.post_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditPostSubmit}>
                      <textarea className="form-control" style={{width:'28rem'}}
                       
                        type="text"
                        defaultValue={post.content}
                        id={`editPostInput${post.post_id}`} onChange={() => handleEditPost(post.post_id)} />

                      <br/>
                       
                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])} />

                      <Button  variant="success" type='submit' size="sm">Confirm</Button>
                      <Button style={{ background: 'red', color: 'white',marginLeft:'1%' }} size="sm" onClick={() => { canclePostEdit(post.post_id) }} type='button'>Cancle</Button>
                    </form>
                    <img className="postImg" src={require(`../image/${post.post_image}`)} alt="" id={`imgPost${post.post_id}`} />
                  </div>
                  :
                  <div className="postCenter">

                    <span className="postText" id={`post${post.post_id}`}>{post.content}</span>
                    <form id={`editPostForm${post.post_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditPostSubmit}>

                      <textarea 
                        style={{ width: '50vw' }}
                        type="text"
                        defaultValue={post.content}
                        id={`editPostInput${post.post_id}`}
                        onChange={() => handleEditPost(post.post_id)} />

                      <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])} />

                      <br />

                      <button type='submit'>Update</button>
                      <button style={{ background: 'red', color: 'white' }} onClick={() => { canclePostEdit(post.post_id) }} type='button'>Cancle</button>

                    </form>

                  </div>
                }
               
                <div className="postBottom">
                <div className="postBottomLeft">
                          {
                          likes.map((like , index_like) => {
                            if (like.user_id === current_ID && like.post_id === post.post_id){
                              return ( flagLike = true )
                            }})}

                            {( flagLike === true ) ?
                                    <form action="" onSubmit={removeLikePost}>
                                      <button type='submit' style={{background : 'none' , border : 'none' , color : '#0d6efd' , textDecoration : 'underLine' }} onClick={()=>handleLikePost(post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                        <i className="far fa-thumbs-up me-2" />
                                        <p className="mb-0" style={{color : 'blue' , fontWeight : 'bold'}}>Liked</p>
                                      </button>
                                    </form>
                            :
                                    <form action="" onSubmit={likePost}>
                                        <button type='submit' style={{background : 'none' , border : 'none' , color : '#0d6efd' , textDecoration : 'underLine' }} onClick={()=>handleLikePost(post.post_id)}  href="#!" className="d-flex align-items-center me-3">
                                          <i className="far fa-thumbs-up me-2" />
                                          <p className="mb-0">Like</p>
                                        </button>
                                    </form>
                            }
                            {likes.map((count)=>{
                              if(count.post_id === post.post_id){
                                like_count++;
                              }
                            })}
                            <span className="postLikeCounter">{like_count} people like it</span>
                  </div>
                  <div className="postBottomRight">
                    <a className="postCommentText" onClick={() =>ShowComments(post.post_id)}>comments</a>
                  </div>
                </div>
              </div>
            </div>
          {/* {showCommentsForm ? */}
              <div className="card-footer py-3 border-0 shadow-2-strong" style={{ backgroundColor: '#f8f9fa',display:"none" }} id={`commentsForPost${post.post_id}`}>
                <div className="w-100">
                  {comments.map((comment, index) => {
                    if (comment.post_id === post.post_id) {
                      return (
                        <div key={index}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div>
                              <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                              <span>{comment.name}</span>
                            </div>
                            {(comment.user_id === current_ID) 
                            ?
                              <div>
                                <a style={{ marginLeft: "-15%", color: 'red', cursor: 'pointer' }} onClick={() => { deleteComment(comment.comment_id) }}><MdDeleteForever /></a>
                                <a style={{ color: 'green', cursor: 'pointer' }} id={`editCommentBTN${comment.comment_id}`} onClick={() => { editComment(comment.comment_id) }}><BiEdit /></a>
                              </div> 
                              : 
                              (post.user_id === current_ID) ?
                                <div>
                                  
                                  <button onClick={() => { deleteComment(comment.comment_id) }}>Remove comment</button>
                                </div>
                                : 
                                null
                                }
                          </div>
                          <br />
                          <div className="form-outline w-100" style={{ marginLeft: "2%" }}>
                            <Card style={{ border: 'none', width: '90%' }}>
                              <p style={{ paddingLeft: "2%", paddingTop: "2%" }} id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                            </Card>
                            <form id={`editCommentForm${comment.comment_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditCommentSubmit}>
                              <textarea style={{ width: '90%' }} className="form-control" type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)} />
                              <div style={{ marginLeft: "2%", marginTop: "2%", display: "flex" }}>
                                <div>
                                  <Button variant="success" type='submit'>Confirm</Button>
                                </div>
                                <div style={{ marginLeft: "1%" }}>
                                  <Button variant="danger" style={{ color: 'white' }} onClick={() => { cancleCommentEdit(comment.comment_id) }} type='button'>Cancle</Button>
                                </div>
                              </div>
                            </form>

                            <p style={{ marginLeft: "2%", marginTop: "1%" }}>{comment.comment_created_at}</p>
                          </div>
                          <hr />
                        </div>
                      )
                    }
                  })}
                </div>
                
                <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa', marginLeft: "1%" }}>
                
                  <div className="d-flex flex-start w-100">
                    <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                    <form className="form-outline " onSubmit={handleCreateComment}>
                      <textarea className="form-control" id={post.post_id} name={current_ID} rows={4} style={{ background: '#fff', width: '28rem' }} onChange={handleChange} />
                      <Button variant="success" style={{ marginTop: "2% " }} type="submit" className="btn btn-primary btn-sm">Comment</Button>
                    </form>
                  </div>
                </div>

              </div>
          {/* // : "" } */}
          </div>
        )
      }
      )
      }

    </>
  )
}