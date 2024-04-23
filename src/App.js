import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";


import "./Assets/Styles/bootstrap.css";
import "./Assets/Styles/font-awesome.min.css";

import "./Assets/Styles/responsive.css";
import "./Assets/Styles/colors.css";

import "./Assets/Styles/formpage.css";
import "./Assets/Styles/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Main from "./Components/Main";
import LogJournalist from "./Components/Login/LogJournalist";
import LogMediaAdmin from "./Components/Login/LogMediaAdmin";
import RegJournalist from "./Components/Registration/RegJournalist";
import RegMediaAdmin from "./Components/Registration/RegMediaAdmin";
import About from "./Components/About";
import Profile from "./Components/Profile";
import AdminLog from "./Components/Admin/Admin";
import Adminpage from "./Components/Admin/Adminpage";
import AdminJournalist from "./Components/Admin/AdminJournalist";
import AdminMediaAdmin from "./Components/Admin/AdminMediaAdmin";
import AdminPublic from "./Components/Admin/AdminPublic";
import RegPublic from "./Components/Registration/RegPublic";
import LogPublic from "./Components/Login/LoginPublic";
import ManageJournalists from "./Components/ManageJournalists";

import Verification from "./Components/Registration/Verification";
import Plans from "./Components/Registration/Plans";
import VerificationMedia from "./Components/Registration/VerificationMedia";
import MediaProfile from "./Components/MediaProfile";
import MediaPlans from "./Components/Registration/MediaPlans";



const ContextWrap=createContext()


function App() {
  const [auth, setauth] = useState(0);
  const [username, setusername] = useState("");

  const url='http://localhost:4001'

  // const url='http://hybrid.srishticampus.in:4015'

  useEffect(() => {
    if (localStorage.getItem("adminlog") == 1) {
      setauth(4);
      setusername("Admin");
    } else if (localStorage.getItem("journalistid") != null) {
      setauth(1);
      setusername("Journalist");
    } else if (localStorage.getItem("medialogid") != null) {
      setauth(2);
      setusername("Media Admin");
    } else if (localStorage.getItem("publiclogid") != null) {
      setauth(3);
      setusername("Public");
    } else {
      setauth(0);
      setusername("no log")
    }
  });


  return (
   
      <BrowserRouter basename="smart_journalism">
      <div className="App">
        {/* <h1> {username}</h1>
        <button onClick={()=>{setauth(0)}}> Logout </button>
        <button onClick={()=>{setauth(1)}}> Journalist</button>
        <button onClick={()=>{setauth(2)}}> Media Admin</button>
        <button onClick={()=>{setauth(3)}}> Public</button>
        <button onClick={()=>{setauth(4)}}> Admin</button> */}
 <ContextWrap.Provider value={url}>
        <Navbar auth={auth} />
        <Routes>
          <Route path="/" element={<Main auth={auth} url={url} />} />
          <Route path="/home" element={<Main auth={auth} />} />
          <Route path="/Admin" element={<AdminLog />} />
          <Route path="/Admin/Adminpage" element={<Adminpage />} />
          <Route path="/admin/Journalist" element={<AdminJournalist />} />

         

          <Route path="/admin/MediaAdmin" element={<AdminMediaAdmin />} />
          
          <Route path="/admin/Public" element={<AdminPublic />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Register/MediaAdmin" element={<RegMediaAdmin />} />
          <Route path="/Register/Public" element={<RegPublic />} />
          <Route path="/Register/Journalist" element={<RegJournalist />} />
          <Route path="/Verification/:id" element={<Verification />} />
          <Route path="/VerificationMedia/:id" element={<VerificationMedia />} />
          
          <Route path="/Plans" element={<Plans />} />
          <Route path="/Media/Plan" element={<MediaPlans />} />

          <Route path="/Login/Journalist" element={<LogJournalist />} />
          <Route path="/Login/Public" element={<LogPublic />} />
          <Route path="/Login/MediaAdmin" element={<LogMediaAdmin />} />
          <Route path="/Media/ManageJournalists" element={<ManageJournalists />}/>
          <Route path="/Media/Profile" element={<MediaProfile />} />
          


        



        
         
          <Route path="/*" element={<div style={{minHeight:"500px", backgroundImage:"url('https://saturnvpn.com/wp-content/uploads/2017/10/fix-HTTP-404-Not-found-Error.jpg')", backgroundRepeat:"no-repeat"}}> No such page</div>}/>
        </Routes>
        <Footer auth={auth} />
        </ContextWrap.Provider>
      </div>
    </BrowserRouter>    
  );
}

export default App;
export {ContextWrap}
