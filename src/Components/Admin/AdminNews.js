import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function AdminNews({url}) {

  const Navigate = useNavigate();


  useEffect(()=>{
    if(localStorage.getItem('adminlog')==null){
      Navigate("/admin")
    }
  },[])


  const [AllNewsreq, setNewsreq] = useState([]); // by freelance
  const [AllVNewsReq, setVNewsreq] = useState([]); // by freelance

  const [AllFNews, setNews] = useState([]);
  const [AllFVNews, setVNews] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllNews`)
      .then((res) => {
        console.log(res, "Approved News data");
        if (res.data.data != undefined) {
          setNews(res.data.data);
        } else {
          setNews([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });

    axiosInstance
      .post(`/viewVideoNewses`)
      .then((res) => {
        console.log(res, "Approved Video News data");
        if (res.data.data != undefined) {
          setVNews(res.data.data);
        } else {
          setVNews([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });

    // freelance news requests - admin approve requests                              - Ok
    axiosInstance
      .post(`/viewFreelancerNewsReqAdmin`)
      .then((res) => {
        console.log(res, "News req data - freelance");
        if (res.data.data != undefined) {
          setNewsreq(res.data.data);
        } else {
          setNewsreq([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });

    // freelance video news requests - Admin approve requests                         - ok
    axiosInstance
      .post(`/viewFreelancervNewsReqsAdmin`)
      .then((res) => {
        console.log(res, "Video News req data - Freelance");
        if (res.data.data != undefined) {
          setVNewsreq(res.data.data);
        } else {
          setVNewsreq([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });
  }, []);

  const approvenewsfn = (id) => {
    console.log(id, " news id");
    axiosInstance
      .post(`/approveNewsByAdmin/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Approved");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approvevideofn = (id) => {
    console.log(id, "video id");
    axiosInstance
      .post(`/approveVNewsReqsByAdmin/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Approved");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{padding:"40px"}}>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              News to be Approved
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container text-center">
                <div class="row">
                  <h1> News Requests</h1>
                  {AllNewsreq.length ? (
                    AllNewsreq.map((a) => {
                      return (
                        <div class="col-6">
                          <div class="card" style={{ width: "35rem" }}>
                            <div class="card-body">
                              <h3 class="card-title">
                                {a.title}{" "}
                                <span class="badge bg-secondary">
                                  {a.category}
                                </span>
                              </h3>
                              <p class="card-text">
                                {a.loc}, {a.date}{" "}
                              </p>
                              <p class="card-text">{a.content}</p>
                              <img
                                src={`${url}/${a.image}`}
                                height="200px"
                              />
                              <hr/>
                              <button
                                class="btn btn-primary"
                                onClick={() => {
                                  approvenewsfn(a._id);
                                }}
                              >
                                Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Data to display</h5>
                        </div>
                      </div>
                    </div>
                  )}

                  <h1> Video Requests</h1>

                  {AllVNewsReq.length ? (
                    AllVNewsReq.map((a) => {
                      return (
                        <div class="col-6">
                          <div class="card" style={{ width: "35rem" }}>
                            <div class="card-body">
                              <h3 class="card-title">
                                {a.title}{" "}
                                <span class="badge bg-secondary">
                                  {a.category}
                                </span>
                              </h3>
                              <p class="card-text">
                                {a.loc}, {a.date}{" "}
                              </p>
                              <p class="card-text">{a.content}</p>
                              <video
                                src={`${url}/${a.video.filename}`}
                                width="100%"
                                height="550px"
                                controls
                              ></video>
                              <button
                                class="btn btn-primary"
                                onClick={() => {
                                  approvevideofn(a._id);
                                }}
                              >
                                Approve
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Data to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approved Freelance news and video */}

        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              Approved News
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container text-center">
                <div class="row">
                  <h1> Approved News</h1>

                  {AllFNews.length ? (
                    AllFNews.map((a) => {
                      return (
                        <div class="col-6">
                          <div class="card" style={{ width: "35rem" }}>
                            <div class="card-body">
                            <h3 class="card-title">
                                {a.title}{" "}
                                <span class="badge bg-secondary">
                                  {a.category}
                                </span>
                              </h3>
                              <p class="card-text">
                                {a.loc}, {a.date}{" "}
                              </p>
                              <p class="card-text">{a.content}</p>
                              <img
                                src={`${url}/${a.image}`}
                                height="200px"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Data to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div class="row">
                  <br/>
                  <hr/>
                  <h1> Approved Video</h1>
                  {AllFVNews.length ? (
                    AllFVNews.map((a) => {
                      return (
                        <div class="col-6">
                          <div class="card" style={{ width: "35rem" }}>
                            <div class="card-body">
                              <h3 class="card-title">
                                {a.title}{" "}
                                <span class="badge bg-secondary">
                                  {a.category}
                                </span>
                              </h3>
                              <p class="card-text">
                                {a.loc}, {a.date}{" "}
                              </p>
                              <video
                                src={`${url}/${a.video.filename}`}
                                width="100%"
                                height="550px"
                                controls
                              ></video>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Data to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminNews;
