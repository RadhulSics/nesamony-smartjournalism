import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";
import { ContextWrap } from "../App";


function MediaNewsManage() {

  const url=useContext(ContextWrap)

  const [AllNewsreq, setNewsreq] = useState([]); // by freelance
  const [AllVNewsReq, setVNewsreq] = useState([]); // by freelance

  const [AllFNews, setNews] = useState([]);
  const [AllFVNews, setVNews] = useState([]);

  const Navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('medialogid')==null){
      Navigate("/home")
    }
  },[])

  useEffect(() => {
    axiosInstance
      .post(`/viewAllNews`)
      .then((res) => {
        // console.log(res, "Approved News data");
        if (res.data.data != undefined) {
          setNews(res.data.data);
        } else {
          setNews([]);
        }
      })
      .catch((err) => {
        // console.log(err, " Media error");/
      });

    axiosInstance
      .post(`/viewVideoNewses`)
      .then((res) => {
        // console.log(res, "Approved Video News data");
        if (res.data.data != undefined) {
          setVNews(res.data.data);
        } else {
          setVNews([]);
        }
      })
      .catch((err) => {
        // console.log(err, " Media error");
      });

    //  news requests - media approve requests                              - Ok
    axiosInstance
      .post(`/viewNewsReqMedia/${localStorage.getItem('medialogid')}`)
      .then((res) => {
        console.log(res, "News req data - media");
        if (res.data.data != undefined) {
          setNewsreq(res.data.data);
        } else {
          setNewsreq([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });

    //  video news requests -  media approve requests                         - ok
    axiosInstance
      .post(`/viewVnewsReqs/${localStorage.getItem('medialogid')}`)
      .then((res) => {
        console.log(res, "Video News req data - media");
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
    console.log(id, ' news id');
    axiosInstance
      .post(`/approveNewsByMedia/${id}`)
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
      .post(`/approveVnews/${id}`)
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
    <div>
      <div class="accordion" id="mediaaccortian">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMedianewsapprove"
              aria-expanded="true"
              aria-controls="collapseMedianewsapprove"
            >
              News to be Approved
            </button>
          </h2>
          <div
            id="collapseMedianewsapprove"
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
                          <div class="card" >
                          <img src={`${url}/${a.image}`} class="card-img-top" alt="..."/>
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
                          <div class="card" >
                           
                            <video width="100%" height="240" controls>
                              <source src={`${url}/${a.video.filename}`} type="video/mp4"/>
                              <source src="movie.ogg" type="video/ogg"/>
                            Your browser does not support the video tag.
                            </video>
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

        {/* <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseMedianewsapprovednews"
              aria-expanded="true"
              aria-controls="collapseMedianewsapprovednews"
            >
              Approved News
            </button>
          </h2>
          <div
            id="collapseMedianewsapprovednews"
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
                              <p class="card-text">Contact : {a.contact}</p>
                              <p class="card-text">Email : {a.email}</p>
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
                              <p class="card-text">{a.content}</p>
                              <p class="card-text">Contact : {a.contact}</p>
                              <p class="card-text">Email : {a.email}</p>
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
        </div> */}
      </div>
    </div>
  );
}

export default MediaNewsManage;
