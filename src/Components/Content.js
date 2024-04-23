import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import Divdata from "./Divdata";
import VideoDivData from "./VideoDivData";

function Content({ mediatype, mediaid, publicLog }) {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("publiclogid") == null) {
      Navigate("/home");
    }
  }, []);

  const [homenews, setnews] = useState([]);
  const [homevnews, setvnews] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewAllNews`)
      .then((res) => {
        console.log(res, "all news");
        if (res.data.data != undefined) {
          setnews(res.data.data);
        } else {
          setnews([]);
        }
      })
      .catch((err) => {
        console.log(err, " all news error");
      });

    axiosInstance
      .post(`/viewVideoNewses`)
      .then((res) => {
        console.log(res, "all video news");
        if (res.data.data != undefined) {
          setvnews(res.data.data);
        } else {
          setvnews([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [mediaid, mediatype]);

  const savefn = (id) => {
    axiosInstance
      .post(`/saveNews/${localStorage.getItem("publiclogid")}`, { nid: id })
      .then((res) => {
        console.log(res, "saved news");
        if (res.data.status == 200) {
          alert("News Saved");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="postdiv">
      <section className="section first-section">
        <div className="container-fluid">
          <div className="masonry-blog clearfix">
            <h1 style={{ textAlign: "center", color: "black" }}>
              {" "}
              Featured news
            </h1>
            <hr />
            <div className="container text-center">
              <div className="row">
                {homenews.length ? (
                  homenews.map((a) => {
                    if (mediatype == "all" && mediaid == "allmedia") {
                      return <Divdata a={a} publicLog={publicLog} />;
                    } else if (
                      mediatype == a.category &&
                      mediaid == "allmedia"
                    ) {
                      return <Divdata a={a} publicLog={publicLog} />;
                    } else if (
                      mediatype == a.category &&
                      mediaid == "freelance"
                    ) {
                      if (a.mid == undefined) {
                        return <Divdata a={a} publicLog={publicLog} />;
                      }
                    } else if (mediatype == "all" && mediaid == "freelance") {
                      if (a.mid == undefined) {
                        return <Divdata a={a} publicLog={publicLog} />;
                      }
                    }

                    if (a.mid != undefined) {
                      if (mediatype == a.category && mediaid == a.mid) {
                        return <Divdata a={a} publicLog={publicLog} />;
                      } else if (mediatype == "all" && mediaid == a.mid) {
                        return <Divdata a={a} publicLog={publicLog} />;
                      }
                    }
                  })
                ) : (
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">No News to display</h5>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <h1 style={{ textAlign: "center", color: "black",marginTop:'25px' }}>
              Featured Videos
            </h1>
            <hr />
            <div className="container text-center" style={{ padding: "20px" }}>
              <div className="row">
                {homevnews.length ? (
                  homevnews.map((a, index) => {
                    if (mediatype == "all" && mediaid == "allmedia") {
                      return <VideoDivData a={a} publicLog={publicLog} />;
                    } else if (
                      mediatype == a.category &&
                      mediaid == "allmedia"
                    ) {
                      if (a.mid != undefined) {
                        return <VideoDivData a={a} publicLog={publicLog} />;
                      }
                    } else if (
                      mediatype == a.category &&
                      mediaid == "freelance"
                    ) {
                      if (a.mid == undefined) {
                        return <VideoDivData a={a} publicLog={publicLog} />;
                      }
                    } else if (mediatype == "all" && mediaid == "freelance") {
                      if (a.mid == undefined) {
                        return <VideoDivData a={a} publicLog={publicLog} />;
                      }
                    }

                    if (a.mid != undefined) {
                      if (mediatype == a.category && mediaid == a.mid) {
                        return <VideoDivData a={a} publicLog={publicLog} />;
                      } else if (mediatype == "all" && mediaid == a.mid) {
                        return <VideoDivData a={a} publicLog={publicLog} />;
                      }
                    }
                  })
                ) : (
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">No News to display</h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
