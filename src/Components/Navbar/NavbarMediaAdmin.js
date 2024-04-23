import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Assets/images/LOGO2.gif'

function NavbarMediaAdmin() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <Link class="navbar-brand" to="/">
           {/* <h1 style={{fontSize:"40px", fontFamily:'Luckiest Guy, cursive'}}>  Smart Journalism</h1> */}
           <img src={logo}/>

          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <form class="d-flex" role="search" style={{margin:"0px 150px 0px 0px"}}>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="btn  btn-danger" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="btn  btn-danger" aria-current="page" to="/about">
                    About
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="btn  btn-danger" aria-current="page" to="/Media/Profile">
                    Profile
                  </Link>
                </li>
                
               
                <button className="btn  btn-danger" onClick={()=>{localStorage.clear(); alert("Logged out");window.location.reload(false);}}> Logout</button>

               
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavbarMediaAdmin;
