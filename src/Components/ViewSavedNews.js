import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { Link, useNavigate } from "react-router-dom";

function ViewSavedNews({url}) {
  const [savednews, setsavednews] = useState([]);
  const [test, settest] = useState("");

  const Navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("publiclogid") == null) {
      Navigate("/home");
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`/viewSavedNewsByPid/${localStorage.getItem(`publiclogid`)}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          settest("hello");
          setsavednews(res.data.data)
        
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const remove = (id) => {
    axiosInstance
      .post(`/deleteSavedNews/${id}`)
      .then((res) => {
        console.log(res);
        if(res.data.status==200){
          alert("Remove from saved posts")
          window.location.reload(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ minHeight: "450px" }}>
      <div className="container">
        <div className="row">
          {test.length ? (
            savednews.length ? (
              savednews.map((a) => {
                return (
                  <div className="col-4" style={{margin:"15px 0px"}}>
                    <div class="card">
                      <img
                        src={`${url}/${a.nid.image}`}
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body">
                        <h6> Added by {a.pid.name}</h6>
                        <h5 class="card-title">{a.nid.title}</h5>
                        <p class="card-text">
                          {a.nid.loc}, {a.date.slice(0, 10)}
                          <hr />
                          {a.nid.content.slice(0, 300)}.....{" "}
                          <Link to={`/ViewNews/${a.nid._id}`}>
                            {" "}
                            <b> Click to see more</b>{" "}
                          </Link>
                        </p>

                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            remove(a._id);
                          }}
                        >
                          {" "}
                          Remove from saved{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12" style={{margin:"40px"}}>
                <div class="card">
                  <div class="card-body">
                    <h4 style={{ textAlign: "center"}} class="card-title">
                      {" "}
                      No saved News to display
                    </h4>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="col-4">
              <div class="card">
                <div class="card-body">
                  <h4> No saved News</h4>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewSavedNews;
