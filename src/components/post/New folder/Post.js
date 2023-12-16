import React from 'react'
import "../post.css"
import axios from 'axios'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';

export default function Post({ post }) {



  const {profile_id} = useParams();


    const current_ID = JSON.parse(localStorage.getItem('id'));
  
  const [inputs , setInputs] = useState("")
  const [posts , setPosts] = useState([]);
  const [comments , setComments] = useState([]);
  const [likes , setLikes] = useState([]);
  const [file, setFile] = useState(null);





    useEffect(()=>{
        getPosts();
        getComments();
        getLikes();
    } , [])



    

    // Posts

    



    async function getPosts(){
        await axios.get(`http://localhost:80/WE_SHARE/back_end/posts.php/`)
        .then(response => {
          console.log(response.data);
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
          "http://localhost:80/WE_SHARE/back_end/posts.php", formData
        );
        console.log(response.data);
        window.location.assign(`/profile/${profile_id}`);
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
      console.log(id)
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
          "http://localhost:80/WE_SHARE/back_end/postEdit.php", formEditData
        );
        console.log(response.data);
        window.location.assign(`/profile/${profile_id}`);
      } catch (error) {
        console.error(error);
      }
    };

    const deletePost = async (id) => {
      await axios.delete(`http://localhost:80/WE_SHARE/back_end/posts.php/${id}`).then(function(response){
        window.location.assign(`/profile/${profile_id}`);
      })
    }








    // Comments




    async function getComments(){
      await axios.get(`http://localhost:80/WE_SHARE/back_end/comments.php/`)
      .then(response => {
          setComments(response.data);
      })
  }

    const handleCreateComment = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:80/WE_SHARE/back_end/comments.php/' , inputs).then(document.getElementById(inputs.post_id).value = "").then(
          getPosts()
        )
    }

    const deleteComment = (id) => {
      axios.delete(`http://localhost:80/WE_SHARE/back_end/comments.php/${id}`).then(function(response){
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

    const handleEditCommentSubmit = async (e) => {
      e.preventDefault();
      await axios.put('http://localhost:80/WE_SHARE/back_end/comments.php/' , inputs).then(
        getPosts()
      )
    }

    const foucsOnComment = (id) => {
      document.getElementById(id).focus();
    }

    const canclePostEdit = (id) => {
      document.getElementById(`post${id}`).style.display = 'block';
      document.getElementById(`editPostForm${id}`).style.display = 'none';
      document.getElementById(`editPostBTN${id}`).style.display = 'inline-block';
      document.getElementById(`imgPost${id}`).style.display = 'block';
    }

    const cancleCommentEdit = (id) => {
      document.getElementById(`comment${id}`).style.display = 'block';
      document.getElementById(`editCommentForm${id}`).style.display = 'none';
      document.getElementById(`editCommentBTN${id}`).style.display = 'inline-block';

    }







    // Likes


    const getLikes = async () => {
      await axios.get(`http://localhost:80/WE_SHARE/back_end/likes.php/`)
      .then(response => {
          setLikes(response.data);
      })
    }

    const handleLikePost = async (id) => {
      const post_id = id;
      const user_id = current_ID;
      setInputs({'user_id': user_id , 'post_id' : post_id})
    }

    const likePost = async (e) => {
      e.preventDefault();
      console.log(inputs)
        await axios.post('http://localhost:80/WE_SHARE/back_end/likes.php/' , inputs).then(
          getPosts()
        )
    }
    const removeLikePost = async (e) => {
      e.preventDefault();
      console.log(inputs)
        await axios.post('http://localhost:80/WE_SHARE/back_end/likeDelete.php/' , inputs).then(
          getPosts()
        )
    }





    var flagLike = false;
    var like_count = 0;


  return (
    <>

{posts.map((post, index) => {
        return (
          <div key={index}>
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft flex">
              <div>
                <img className='postProfileImg'
                 src={require(`../../image/${post.image}`)} 
                alt="" />
                <span className="postUsername">
                      {post.first_name} {post.last_name}
                  </span>
                <span className="postDate">{post.created_at}</span>
              </div>
              <div>
              {(post.user_id == current_ID) ?
                    <div>
                      <button onClick={() => {deletePost(post.post_id)}}>Delete Your Post</button>
                      <button id={`editPostBTN${post.post_id}`} onClick={() => {editPost(post.post_id)}}>edit</button>
                    </div>
                    : null }
                  </div>

                  
                  {(post.post_image != 'a') ? 

                  <div>
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
                  </div>

                  : 
                  
                  <div>
                
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
              </div>
            </div>
            <div className="postTopRight">
            </div>
        </div>
        <div className="postCenter">
          <span id={`post${post.post_id}`} className="postText">{post.content}</span>
          {(post.post_image) != 'a' ? 
          <img className='postImg' src={require(`../../image/${post.post_image}`)} alt="" />
        : null 
        }
          </div>
        <div className="postBottom">
          <div className="postBottomLeft">
                    {
                    likes.map((like , index_like) => {
                      if (like.user_id == current_ID && like.post_id == post.post_id){
                        return ( flagLike = true )
                      }})}

                      {( flagLike == true ) ?
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
              if(count.post_id == post.post_id){
                like_count++;
              }
            })}
            <span className="postLikeCounter">{like_count} people like it</span>
          </div>
          <div className="postBottomRight">
            <a href={`/profile/${profile_id}/post/${post.post_id}`}><span className="postCommenttext">comments</span></a>
          </div>
        </div>
      </div>
      </div>
        )
      }
      )
      }
    </>
  )
}
