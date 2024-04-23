import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import CustomerViewPlaceMap from "./Admin/Map";
import { useNavigate } from "react-router-dom";

function Critical() {
  const [critical, setcritical] = useState([]);


  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("medialogid") == null) {
      Navigate("/home");
    }
  }, []);


  useEffect(() => {
    axiosInstance
      .post(`/viewCriticalIssuesByMedia/${localStorage.getItem("medialogid")}`)
      .then((res) => {
        console.log(res, "view critical issues");
        if (res.data.data != undefined) {
          setcritical(res.data.data);
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

  return (
    <div className="main" style={{ minHeight: "400px", padding:"40px" }}>
      <div className="container">
        <div className="row">
          {critical.length ? (
            critical.map((a) => {
              return (
                <div className="col-4">
                  {" "}
                  <div class="card">
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body">
                      <div class="alert alert-danger" role="alert">
                        <h2 style={{ textAlign: "center" }} class="card-title">
                          {a.msg}
                        </h2>
                      </div>
                      <div class="alert alert-danger" role="alert">
                        <h class="card-title">{a.date}</h>
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
          ) : (
            <div className="col-12">
              {" "}
              <div class="card">
                <div class="card-body">
                  <div class="alert alert-success" role="alert">
                    <h5> No new Critical Requests</h5>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Critical;
