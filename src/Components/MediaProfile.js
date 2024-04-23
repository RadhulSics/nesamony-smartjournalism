import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import { ContextWrap } from "../App";

function MediaProfile() {

  const url=useContext(ContextWrap)

  
  let navigate = useNavigate();
  const [plan, setplan] = useState({
    planid: { name: "" },
    expiry: "",
  });
  const [data, setdata] = useState({
    name: "",
    contact: "",
    email: "",
    regNo: "",
    web: "",
    address: "",
    img: { filename: "" },
  });

  useEffect(() => {
    if (localStorage.getItem(`medialogid`) == null) {
      navigate(`/home`);
    }
  },[]);

  useEffect(() => {
    axiosInstance
      .post(`/viewMediaById/${localStorage.getItem("medialogid")}`)
      .then((res) => {
        console.log(res, "media data");
        if (res.data.data != undefined) {
          setdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewSubByMId/${localStorage.getItem("medialogid")}`)
      .then((res) => {
        console.log(res, "view sub by Media id");
        if (res.data.data != undefined) {
          setplan(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const changefn = (e) => {
    if (e.target.name == "img") {
      setdata({ ...data, img: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  const subfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/editMediaById/${localStorage.getItem("medialogid")}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          navigate("/home");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="main" style={{ minHeight: "400px" }}>
      <h2 style={{ textAlign: "center" }}>
        {" "}
        Hi {data.name}. Welcome to your profile.
      </h2>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <div class="card card-body">
              <div className="main">
                <div class="card">
                  <div class="card-body">
                    <h1 class="card-title">
                      <span>
                        {" "}
                        <img
                          height={80}
                          width={80}
                          src={`${url}/${data.img.filename}`}
                        />{" "}
                      </span>
                      {data.name}{" "}
                      {data.verified ? (
                        <span>
                          {" "}
                          <img
                            height={100}
                            src="data:image/png;base64,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"
                          />{" "}
                        </span>
                      ) : null}
                    </h1>
                    <a href={data.web}>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/1006/1006771.png"
                          height={20}
                        />
                      </span>{" "}
                      {data.web}
                    </a>
                    <h4 class="card-text">Email : {data.email}</h4>
                    <h4> Contact : {data.contact}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="card card-body">
            <div className="main">
                {plan.length ? (
                  plan.map((a) => {
                    return (
                      <div class="card">
                        <div class="card-body">
                          <h1 class="card-title">Plan : {a.planid.name}</h1>
                          <h3 class="card-text">
                            <span class="badge bg-secondary">
                              Expiry Date : {a.expiry.slice(0, 10)}
                            </span>
                          </h3>
                        </div>
                       
                      </div>
                    );
                  })
                ) : (
                  <div class="card-body">
                    <h1 class="card-title">No Subscribed Plans</h1>
                    <Link
                      class="btn btn-danger"
                      aria-current="page"
                      to="/Media/Plan"
                    >
                      Choose a Plan
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-7">
            <div>
              <div class="page-wrapper font-poppins">
                <div className="formcontainer">
                  <div class="wrapper wrapper--w680">
                    <div class="card card-4">
                      <div class="card-body">
                        <h2 class="title">Edit your Profile</h2>
                        <form onSubmit={subfn}>
                          <div class="row row-space">
                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Name</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="name"
                                  value={data.name}
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Contact</label>
                                <input
                                  class="input--style-4"
                                  type="tel"
                                  minLength="10"
                                  maxLength="10"
                                  name="contact"
                                  value={data.contact}
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Email</label>
                                <input
                                  class="input--style-4"
                                  type="email"
                                  name="email"
                                  value={data.email}
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="input-group">
                              <label class="label">Website </label>
                              <input
                                class="input--style-4"
                                type="url"
                                name="web"
                                value={data.web}
                                onChange={changefn}
                                required
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="mb-3">
                              <label
                                for="exampleFormControlTextarea1"
                                class="form-label"
                              >
                                Address
                              </label>
                              <textarea
                                class="form-control"
                                name="address"
                                onChange={changefn}
                                required
                                value={data.address}
                                id="exampleFormControlTextarea1"
                                rows="3"
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="mb-3">
                              <label for="formFile" class="form-label">
                                Upload your Image
                              </label>
                              <input
                                class="form-control"
                                type="file"
                                id="formFile"
                                name="img"
                                onChange={changefn}
                                
                              />
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default MediaProfile;
