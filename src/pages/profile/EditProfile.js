import React from 'react'
import "../../components/post/post.css"
import axios from 'axios'
import { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar.jsx';
import Sidebar from '../../components/sidebar/Sidebar.jsx';
import Feed from '../../components/feed/Feed.jsx';


function EditProfile({ post }){

    const [like, setLike] = useState('')


    const {profile_id} = useParams();
    const {postID} = useParams();


    const current_Fname = localStorage.getItem('name');
    const current_ID = JSON.parse(localStorage.getItem('id'));
    const current_Email = localStorage.getItem('email');
  
    const [inputs , setInputs] = useState("")
    const [posts , setPosts] = useState([]);
    const [comments , setComments] = useState([]);
    const [likes , setLikes] = useState([]);
    const [file, setFile] = useState(null);
    const [user , setUser] = useState([]);





    useEffect(()=>{
        getUser();
    } , [])


    function getUser(){
        axios.get(`http://localhost:80/WE_SHARE/back_end/userProfile.php/${profile_id}`)
        .then(response => {
            setUser(response.data);
        })
    }


    const handleEditUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs( {...inputs , [name]: value})
      }
  
      const handleEditUserSubmit  = async (e) => {
        e.preventDefault();
    
        const formEditData = new FormData();
  
        formEditData.append("name", inputs['name']);
        formEditData.append("first_name", inputs['first_name']);
        formEditData.append("last_name", inputs['last_name']);
        formEditData.append("phone", inputs['phone']);
        formEditData.append("password", inputs['password']);
        formEditData.append("file", file);
      
        try {
          const response = await axios.post(
            `http://localhost:80/WE_SHARE/back_end/editUserProfile.php/${profile_id}`, formEditData
          );
          console.log(response.data);
          window.location.assign(`/profile/${profile_id}`);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div>
        <Topbar />
            <div className="profile">
                <Sidebar />
              
                <div className="profileRight">
                    <div className="profilerightTop">
                        
                            {user.map((Oneuser)=>{
                                return( <>
                        <div className="profileCover">
                            <img className='profileCoverImg' src="http://www.prodraw.net/fb_cover/images/fb_cover_52.jpg" alt="" />
                                {/* <img src={require(`../../components/image/${Oneuser.image}`)} style={{width : '20vw'}} alt="" />  */}
                                
                        </div>
                            <div>
                            <div className="container rounded bg-white mt-0">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" src={require(`../../components/image/${Oneuser.image}`)} width={90} /><span className="font-weight-bold">{Oneuser.name}</span><span className="text-black-50">{Oneuser.email}</span><span>{Oneuser.phone}</span></div>
          </div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex flex-row align-items-center back"><i className="fa fa-long-arrow-left mr-1 mb-1" />
                <a href={`/profile/${profile_id}`}><h6>Back to profile</h6></a>
                </div>
                <h6 className="text-right">Edit Profile</h6>
              </div>

              <form  id={`editUserForm${Oneuser.id}`} onSubmit={handleEditUserSubmit}>
              <div className="row mt-3">
                <div className="col-md-12"><input type="text" className="form-control" placeholder=" name" name="name" defaultValue={Oneuser.name} onChange={handleEditUser} /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><input type="password" className="form-control" placeholder="Email" name="password" defaultValue={Oneuser.password} onChange={handleEditUser} /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><input type="number" className="form-control" placeholder="phone"  name="phone" defaultValue={Oneuser.phone} /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><input type="file" className="form-control" placeholder="image"   name="file" id="file"onChange={(e) => setFile(e.target.files[0])}/></div>
              </div>
              <div className="mt-5 text-right"><button className="buttonn" type="submit">Save Profile</button></div>
            </form>
            </div>

          </div>
        </div>
      </div>
                            
                            </div>
                            </>
                            )
                        })}
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.name}</h4>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default EditProfile
