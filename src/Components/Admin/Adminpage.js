import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
import CustomerViewPlaceMap from "./Map";

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

function Adminpage() {
  const Navigate = useNavigate();

  const [colwidth, setcw] = useState("col-12");
  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      Navigate("/admin");
    }
  }, []);

  const [critical, setcritical] = useState([]);
  const [journalistdata, setjdata] = useState([]);
  const [MediaData, setmdata] = useState([]);
  const [NewsData, setNdata] = useState([]);

  const [viewPublic, setPublic] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewCriticalIssues`)
      .then((res) => {
        console.log(res, "view critical issues");
        if (res.data.data != undefined) {
          setcritical(res.data.data);
          if (res.data.data.length) {
            setcw("col-12");
          } else {
            setcw("col-12");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewJournalists`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          setjdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewMedias`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          console.log(res, " view media");
          setmdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewAllNews`)
      .then((res) => {
        console.log(res, " all news");
        if (res.data.data != undefined) {
          setNdata(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewPublic`)
      .then((res) => {
        console.log(res, " all Public");
        if (res.data.data != undefined) {
          setPublic(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const confirm = (id) => {
    axiosInstance
      .post(`/confirmCriticalIssues/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Help sent");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [categoryLabel, setCLabel] = useState([
    "Journalists",
    "Media Admins",
    "News",
  ]);

  const chartData = {
    labels: categoryLabel,
    datasets: [
      {
        label: "Total",
        data: [journalistdata.length, MediaData.length, NewsData.length],
        backgroundColor: ["orange", "rgb(255,24,8)", "#fa8230"],
      },
    ],
  };

  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="logdiv" style={{ minHeight: "400px" }}>
        <div className="main">
          <h2 style={{ textAlign: "center" }}>
            Hi Admin, Welcome to the Admin Panel
          </h2>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-4">
                {" "}
                <Doughnut
                  data={chartData}
                  options={{
                    plugins: {
                      title: {
                        display: true,
                        text: "Details",
                      },
                    },
                  }}
                />
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-6">
                    <div class="alert alert-primary" role="alert">
                      <h3>
                        <span class="badge bg-secondary">
                          {journalistdata.length}
                        </span>{" "}
                        {journalistdata.length == 1 ? (
                          <span>Journalist </span>
                        ) : (
                          <span>Journalists </span>
                        )}
                        available
                      </h3>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="alert alert-primary" role="alert">
                      <h3>
                        {" "}
                        <span class="badge bg-secondary">
                          {MediaData.length}
                        </span>{" "}
                        {MediaData.length == 1 ? (
                          <span>Media </span>
                        ) : (
                          <span>Medias </span>
                        )}
                        available
                      </h3>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="alert alert-primary" role="alert">
                      <h3>
                        {" "}
                        <span class="badge bg-secondary">
                          {NewsData.length}
                        </span>{" "}
                        {NewsData.length == 1 ? (
                          <span>News </span>
                        ) : (
                          <span>News </span>
                        )}
                        Posted
                      </h3>
                    </div>
                  </div>
                  <div className="col-6">
                    <div class="alert alert-primary" role="alert">
                      <h3>
                        {" "}
                        <span class="badge bg-secondary">
                          {viewPublic.length}
                        </span>{" "}
                        {viewPublic.length == 1 ? (
                          <span>User </span>
                        ) : (
                          <span>Users </span>
                        )}
                        Registered
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr />
           {critical.length? <h1> View Critical Notifications</h1>:null}
            <br />
            <div className="row">
              {critical.length
                ? critical.map((a) => {
                    return (
                      <div className="col-4">
                        {" "}
                        <div class="card">
                          {/* <img src="..." class="card-img-top" alt="..." /> */}
                          <div class="card-body">
                            <div class="alert alert-danger" role="alert">
                              <h5 class="card-title">{a.msg}</h5>
                            </div>

                            <h5> Journalist name : {a.jid.name}</h5>
                            <h5> Contact : {a.jid.contact}</h5>
                            <h5> Age : {a.jid.age}</h5>
                            <h5> Blood Group : {a.jid.bloodgroup}</h5>
                            <button
                              onClick={() => {
                                confirm(a._id);
                              }}
                              className="btn btn-danger"
                            >
                              {" "}
                              Send Help{" "}
                            </button>
                            <CustomerViewPlaceMap
                              lat={a.latitude}
                              lon={a.longitude}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ minHeight: "400px" }}>
        <h1 style={{ textAlign: "center", position: "relative", top: "150px" }}>
          Please{" "}
          <Link style={{ fontSize: "50px" }} to="/Admin">
            log in{" "}
          </Link>
          to see admin panel{" "}
        </h1>
      </div>
    );
  }
}

export default Adminpage;
