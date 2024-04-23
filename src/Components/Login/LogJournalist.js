import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
function LogJournalist() {
  const mainnavigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (localStorage.getItem("journalistid") != null) {
      mainnavigate("/home");
    }
  },[]);
  const subfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/loginJournalist`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          window.location.reload(false);
        } else {
          alert("Error. Please try again");
        }
        console.log(res, "journalist login data");
        localStorage.setItem("journalistid", res.data.data._id);

        if (res.data.data.mid != undefined) {
          localStorage.setItem(
            "journalistjobstatusandmid",
            JSON.stringify({
              mid: res.data.data.mid,
              jobstatus: res.data.data.freelancer,
            })
          );
        } else {
          localStorage.setItem(
            "journalistjobstatusandmid",
            JSON.stringify({ mid: null, jobstatus: res.data.data.freelancer })
          );
        }
      })
      .catch((err) => {
        console.log(err);
        // alert("There's some error while loggin in.. Please check your network")
      });
  };
  return (
    <div>
      <div
        class="page-wrapperlog bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/5a/dc/ae/5adcae5e3af5cdba2bb417b92e6d05bc.gif')",
          backgroundSize: "25%",
          backgroundPosition: "relative",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="formcontainer">
          <div class="wrapperlog wrapper--w680">
            <div class="card card-2">
              <div class="card-body">
                <h2 class="title">Journalist Login Form</h2>
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
                <Link to="/Register/Journalist">
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

export default LogJournalist;
