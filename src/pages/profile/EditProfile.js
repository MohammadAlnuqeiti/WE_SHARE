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
        axios.get(`http://localhost:80/frontend/back_end/userProfile.php/${profile_id}`)
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
            `http://localhost:80/frontend/back_end/editUserProfile.php/${profile_id}`, formEditData
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
                                <img src={require(`../../components/image/${Oneuser.image}`)} style={{width : '20vw'}} alt="" /> 
                                
                        </div>
                            <div>
                                <form style={{marginLeft : '30vw'}} id={`editUserForm${Oneuser.id}`} onSubmit={handleEditUserSubmit}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td><label htmlFor=""> Name</label></td>
                                                <td><input style={{width: '10vw'}} name="name" type="text" defaultValue={Oneuser.name} onChange={handleEditUser}/></td>
                                            </tr>
                                       
                                            <tr>
                                                <td><label htmlFor="">Password</label></td>
                                                <td><input style={{width: '10vw'}} name="password" type="password" defaultValue={Oneuser.password} onChange={handleEditUser}/></td>
                                            </tr>
                                            <tr>
                                                <td><label htmlFor="">Phone</label></td>
                                                <td><input style={{width: '10vw'}} name="phone" type="number" defaultValue={Oneuser.phone} onChange={handleEditUser}/></td>
                                            </tr>
                                            <tr>
                                                <td><label htmlFor="">Image</label></td>
                                                <td><input type="file" name="file" id="file"onChange={(e) => setFile(e.target.files[0])}/></td>
                                            </tr>
                                        </tbody>
                                    </table>                

                                    <button type='submit'>Update</button>
                                    <a href={`/profile/${profile_id}`}><button style={{background : 'red' , color : 'white'}} type='button'>Back To Profile</button></a>
                                </form>
                            </div>
                            </>
                            )
                        })}
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.first_name} {user.last_name}</h4>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default EditProfile
