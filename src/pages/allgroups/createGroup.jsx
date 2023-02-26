import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { useState , useEffect } from 'react';


export default function CreateGroup(props) {
//     const current_ID = JSON.parse(localStorage.getItem('id'));

//     const [text, setText] = useState("");
// const [file, setFile] = useState(null);

// const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("text", text);
//     formData.append("user_id", current_ID);
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         "http://localhost:80/frontend/back_end/groups.php",
//         formData
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  return (
    <>


    <h1>createGroup</h1>
    <div className='form-wrapper mb-5' >
    <form onSubmit={props.handleSubmit}>
      <div>
        <label htmlFor="text">Text</label>
        <input
          type="text"
          id="text"
          value={props.text}
          onChange={(e) => props.setText(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="file">File</label>
        <input
          type="file"
          id="file"
          onChange={(e) => props.setFile(e.target.files[0])}
        />
      </div>
      <button type="submit">Submit</button>
    </form>

    </div>
    
    </>
  )
}
