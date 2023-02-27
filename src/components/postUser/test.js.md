// {posts.map((post, index) => {
    // return (
    //   <div key={index}>
        // <div className="post" >
        //   <div className="postWrapper">
            // <div className="postTop">
            //   <div className="postTopLeft">
            //     <img
            //       className="postProfileImg"
            //       src={require(`../image/icon.png`)}
            //       alt=""
            //     />
            //     <span className="postUsername">
            //       {post.name}
            //     </span>
            //     <span className="postDate">{post.created_at}</span>
            //   </div>
            //   <div className="postTopRight">
            //     {(post.user_id === current_ID) ?
            //       <div className="postBottun">
            //         <Button variant="danger" onClick={() => { deletePost(post.post_id) }}><MdDeleteForever /></Button>
            //         <Button variant="success" id={`editPostBTN${post.post_id}`} onClick={() => { editPost(post.post_id) }}><BiEdit /></Button>
            //       </div>
            //       : null}
            //   </div>
            // </div>
            {(post.post_image !== 'a') ?
              <div className="postCenter">
                <span className="postText" id={`post${post.post_id}`}>{post.content}</span>
                <form id={`editPostForm${post.post_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditPostSubmit}>
                  <textarea
                    style={{ width: '50vw' }}
                    type="text"
                    defaultValue={post.content}
                    id={`editPostInput${post.post_id}`} onChange={() => handleEditPost(post.post_id)} />

                  <br />

                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])} />

                  <button type='submit'>Update</button>
                  <button style={{ background: 'red', color: 'white' }} onClick={() => { canclePostEdit(post.post_id) }} type='button'>Cancle</button>
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
              {/* <div className="postBottomLeft"> */}
                {/* <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
        <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
        <span className="postLikeCounter">{like} people like it</span> */}

              {/* </div> */}
          
  {/* <Dropdown.Toggle variant="success" id="dropdown-basic"> */}
    {/* <Dropdown>
              <div className="postBottomRight">
                <span className="postCommentText">{post.comment} comments</span>
              </div>
              </Dropdown.Toggle>
            
            </div>
      
        </div> */}
        <Dropdown.Menu>
        <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}>
          <div className="w-100">
            {
            comments.map((comment, index) => 
            {
              if (comment.post_id === post.post_id) {
                return (
                  <div key={index}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div>
                        <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
                        <span>{comment.name}</span>
                      </div>
                      {(comment.user_id === current_ID) ?
                        <div>
                          <button onClick={() => { deleteComment(comment.comment_id) }}>Remove comment</button>
                          <button id={`editCommentBTN${comment.comment_id}`} onClick={() => { editComment(comment.comment_id) }}><FaEdit /></button>
                        </div> : (post.user_id === current_ID) ?
                          <div>
                            <button onClick={() => { deleteComment(comment.comment_id) }}>Remove comment</button>
                          </div>
                          : null}
                    </div>
                    <br />
                    <div className="form-outline w-100">
                      <p id={`comment${comment.comment_id}`}>{comment.comment_content}</p>
                      <form id={`editCommentForm${comment.comment_id}`} action="" style={{ display: 'none' }} onSubmit={handleEditCommentSubmit}>
                        <input type="text" defaultValue={comment.comment_content} id={`editCommentInput${comment.comment_id}`} onChange={() => handleEditComment(comment.comment_id)} />
                        <button type='submit'>Update</button>
                        <button style={{ background: 'red', color: 'white' }} onClick={() => { cancleCommentEdit(comment.comment_id) }} type='button'>Cancle</button>
                      </form>

                      <p>{comment.comment_created_at}</p>
                    </div>
                    <hr />
                  </div>
                )
              }
            })}
          </div>
          {/* <div className="card-footer py-3 border-0" style={{ backgroundColor: '#f8f9fa' }}> */}
            {/* <div className="d-flex flex-start w-100"> */}
              <img className="rounded-circle shadow-1-strong me-3" src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width={40} height={40} />
              <form className="form-outline w-100" onSubmit={handleCreateComment}>
                <textarea className="form-control" id={post.post_id} name={current_ID} rows={4} style={{ background: '#fff' }} onChange={handleChange} />
                <button type="submit" className="btn btn-primary btn-sm">Post comment</button>
              </form>
            </div>
          </div>
          </div> 
        </div>
      </div>
      
    
     ) 
  }
  )
  }
  )
  }