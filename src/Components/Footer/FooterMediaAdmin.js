import React from "react";
import { Link } from "react-router-dom";

function FooterMediaAdmin() {
  return (
    <div>
      <>
        <footer
          class="text-center text-lg-start text-white"
          style={{ backgroundColor: "#1c2331", margin:"5px 10px" }}
        >
          <section
            class="d-flex justify-content-center p-4"
            style={{ backgroundColor: "black", margin:"5px 10px" }}
          >
            <Link to="/home" style={{color:"white", margin:"5px 10px" }} alt="HOME">HOME</Link>
            <Link to="/About" style={{color:"white", margin:"5px 10px" }} alt="ABOUT">ABOUT</Link>
            <Link to="/Contact" style={{color:"white", margin:"5px 10px" }} alt="CONTACT">CONTACT</Link>
            <Link to="/Contact" style={{color:"white", margin:"5px 10px" }} alt="EDIT PROFILE">EDIT PROFILE</Link>
            <Link to="/Contact" style={{color:"white", margin:"5px 10px" }} alt="MANAGE JOURNALISTS">MANAGE JOURNALISTS</Link>


          </section>
          <div
            class="text-center p-3"
            style={{ backgroundColor: "black", marginTop:"40px" }}
          >
            © 2023 Copyright:
             Newseeker
            
          </div>
        </footer>
      </>
    </div>
  );
}

export default FooterMediaAdmin;
