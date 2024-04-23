import React from "react";
import { Link } from "react-router-dom";
import logo from '../../Assets/images/LOGO2.gif'

function Navnolog() {
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
                  <Link class="btn btn-danger" aria-current="page" to="/home">
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link class="btn btn-danger" to="/About">
                    About
                  </Link>
                </li>
                <li class="nav-item dropdown">
                    <Link className="btn btn-danger" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{position:'relative', top:"0px"}}>
                        Login
                    </Link>
                    <ul class="dropdown-menu">
                        <li><Link class="dropdown-item" to="/login/Public">Public</Link></li>
                        <li><Link class="dropdown-item" to="/login/Journalist">Journalist </Link></li>
                        <li><Link class="dropdown-item" to="/login/MediaAdmin">Media Administrator</Link></li>
                    </ul>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navnolog;
