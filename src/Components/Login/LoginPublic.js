import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
function LogPublic() {
  const mainnavigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("publiclogid") != null) {
      mainnavigate("/home");
    }
  },[]);
  const subfn = (e) => {
    e.preventDefault();
    console.log(data);
    axiosInstance
      .post(`/loginPublic`, data)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          localStorage.setItem("publiclogid", res.data.user._id);
          alert("Logged in successfully");
          window.location.reload(false);
        } else if(res.status==500){
          alert('Incorrect Password');
        }
      })
      .catch((err) => {
        console.log(err);
        alert("There's some error while loggin in.. Please check your network");
      });
  };
  return (
    <div>
      <div
        class="page-wrapperlog bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('http://www.animated-gifs.fr/category_communication/newspapers/24939820.gif')",
          backgroundSize: "25%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="formcontainer">
          <div class="wrapperlog wrapper--w680">
            <div class="card card-2">
              <div class="card-body">
                <h2 class="title">Public Login Form</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
                      <div class="input-group">
                        <label class="label"> Email</label>
                        <input
                          class="input--style-4"
                          type="email"
                          name="email"
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
                <br />
                <hr />
                <Link to="/Register/Public">
                  {" "}
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogPublic;
