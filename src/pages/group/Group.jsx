import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbargroup from "../../components/rightbargroup/Rightbargroup";
import Button from 'react-bootstrap/Button';
import "./group.css"

export default function Group() {
  return (
    <>
      <Topbar />
      <div className="groupContainer">
        <Sidebar />
        <div className="groupRight">
          <div className="groupRightTop">
            <div className="groupCover">
              <img
                className="groupCoverImg"
                src="assets/wateen.png"
                alt=""
              />
            </div>
            <div className="groupInfo">
            <h4 className="groupInfoName"> Safak Kocaoglu</h4>
            <Button className="groupInfoDesc" variant="success">Join Group</Button>  
            </div>
          </div>
          <div className="groupRightBottom">
            <Feed />
        
        <Rightbargroup/>
      </div>
      </div>
        </div>
    </>
  );
}