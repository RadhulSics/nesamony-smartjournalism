import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLog() {
  const navigate = useNavigate();

  const [data, setdata] = useState({
    name: "",
    password: "",
  });

  useEffect(() => {
    if (localStorage.getItem("journalistid") != null) {
      alert(
        "Please logout from your current account and login as an admin,if you want to access admin panel"
      );
      navigate("/home");
    }

    if (localStorage.getItem("adminlog") != null) {
      navigate("/admin/adminpage");
    }
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const subfn = (e) => {
    e.preventDefault();
    if (data.name == "admin" && data.password == "admin12345") {
      localStorage.setItem("adminlog", 1);
      alert("Logged in ");
      window.location.reload(false);
    }
  };

  return (
    <div style={{minHeight:"500px", padding:"50px"}}>
      <div className="container">
        <div className="row">
        <div class="col-6"
        style={{
          backgroundImage:
            "url('https://cdn.dribbble.com/users/76502/screenshots/5251755/jet_animation.gif')",
          backgroundSize: "85%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        
      </div>
      <div className="col-6">
      <div class="card card-4">
              <div class="card-body">
                <h2 class="title">Admin Login Form</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Name</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="name"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label">Password</label>
                        <input
                          class="input--style-4"
                          type="password"
                          name="password"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="p-t-15">
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
      </div>
        </div>
      </div>

     
    </div>
  );
}

export default AdminLog;
