import Post from "../postUser/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";

export default function Feed(props) {

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post user_id={props.user_id}/>
        
      </div>
    </div>
  );
}