import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
// import Sidebar from "../../components/sidebar/sidebar2";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";


import "./home.css"

export default function Home() {

  const CurrentID = JSON.parse(localStorage.getItem('id'));


  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        {/* <Header/> */}
        <Feed/>
        <Rightbar/>
      </div>
    </>
  );
}