import Post from "../postGroup/Post";
import Share from "../shareGroup/Share";
import "./feed.css";
import { useEffect } from "react";

export default function Feed(props) {

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share group_id={props.group_id}/>
        <Post group_id={props.group_id} admin_group={props.admin_group}/>
        
      </div>
    </div>
  );
}