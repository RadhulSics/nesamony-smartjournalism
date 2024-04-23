import React from "react";
import { Link } from "react-router-dom";
import logo from "../../Assets/images/LOGO2.gif";

function NavbarAdmin() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            {/* <h1 style={{fontSize:"40px", fontFamily:'Luckiest Guy, cursive'}}>  Smart Journalism</h1> */}
            <img src={logo} />
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
            <form
              class="d-flex"
              role="search"
              style={{ margin: "0px 150px 0px 0px" }}
            >
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link
                    class="btn  btn-danger"
                    aria-current="page"
                    to="/admin"
                  >
                    Home
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/admin/Public"
                    alt="Public"
                    class="btn  btn-danger"
                  >
                    Public
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/admin/Journalist"
                    alt="Journalist"
                    class="btn  btn-danger"
                  >
                    Journalist
                  </Link>
                </li>
                <li class="nav-item">
                  <Link
                    to="/admin/MediaAdmin"
                    alt="Media Admin"
                    class="btn  btn-danger"
                  >
                    Media Admin
                  </Link>
                </li>
               

                <button
                  className="btn  btn-danger"
                  onClick={() => {
                    localStorage.clear();
                    alert("Logged out");
                    window.location.reload(false);
                  }}
                >
                  {" "}
                  Logout
                </button>
              </ul>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
  return (
    <div className="navdiv">
      <div class="container indigo highlightTextOut">
        <section
          class="d-flex justify-content-center p-1"
          style={{ backgroundColor: "#6351ce", marginBottom: "20px" }}
        >
          <Link to="/home" id="headingnav" alt="Smart Journalism">
            Smart Journalism
          </Link>
        </section>
        <Link to="/admin/adminpage" alt="HOME">
          HOME
        </Link>
        <Link to="/admin/Journalist" alt="Journalist">
          Journalist
        </Link>
        <Link to="/admin/MediaAdmin" alt="Media Admin">
          Media Admin
        </Link>
        <Link to="/admin/Public" alt="Public">
          Public
        </Link>
       
        <button
          className="btn btn-dark"
          style={{ position: "relative", left: "300px", padding: "10px 20px" }}
          onClick={() => {
            localStorage.clear();
            alert("Logged out");
            window.location.reload(false);
          }}
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavbarAdmin;
