import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useNavigate } from "react-router-dom";

function AdminMediaAdmin() {
  const [Mediaadmin, setmediaadmin] = useState([]);
  const [viewplan, setviewplan] = useState({});

  const [test, settest] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      Navigate("/admin");
    }
  },[]);

  useEffect(() => {
    axiosInstance
      .post(`/viewMedias`)
      .then((res) => {
        console.log(res, "Media data");
        if (res.data.data != undefined) {
          setmediaadmin(res.data.data);
        } else {
          setmediaadmin([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });
  }, []);

  const viewPlan = (id) => {
    axiosInstance
      .post(`/viewSubByMId/${id}`)
      .then((res) => {
        console.log(res, " JID package");
        if (res.data.data != undefined) {
          setviewplan(res.data.data);
          settest("hello");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const blockfn = (id) => {
    axiosInstance
      .post(`/blockMediaByAdmin/${id}`)
      .then((res) => {
        console.log(res, "blocked Media");
        alert("Blocked");
        window.location.reload(false)
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const unblock = (id) => {
    axiosInstance
      .post(`/unBlockMediaByAdmin/${id}`)
      .then((res) => {
        console.log(res, "Unblock Media");
        alert("UnBlocked");
        window.location.reload(false)

      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "40px" }}>
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
              View All Media Admins
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container ">
                <div class="row">
                  {/* Media Admins map starts here */}
                  {Mediaadmin.length ? (
                    Mediaadmin.map((a) => {
                      if (!a.blocked) {
                      }
                      return (
                        <>
                          <div class="col-4">
                            <div class="card">
                              <div class="card-body">
                                <h5 class="card-title">{a.name}</h5>
                                <p class="card-text">
                                  Register Number : {a.regNo}
                                </p>
                                <p class="card-text">Contact : {a.contact}</p>
                                <p class="card-text">Email : {a.email}</p>
                                <p class="card-text">Address : {a.address}</p>
                                <p class="card-text">
                                  Website : <a href={a.web}>{a.web}</a>
                                </p>

                                {a.blocked ? (
                                  <>
                                    <h1> Blocked by Admin</h1>{" "}
                                    <button
                                      className="btn btn-success"
                                      onClick={() => {
                                        unblock(a._id);
                                      }}
                                    >
                                      {" "}
                                      Unblock
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      blockfn(a._id);
                                    }}
                                  >
                                    {" "}
                                    Block{" "}
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col">
                            {test.length
                              ? viewplan.map((a) => {
                                  return (
                                    <>
                                      <h4> Plan : {a.planid.name}</h4>
                                      <p> Cost : {a.planid.cost}$</p>
                                      <p> Bought on : {a.date.slice(0, 10)}</p>
                                      <p>
                                        {" "}
                                        Expiry Date : {a.expiry.slice(0, 10)}
                                      </p>
                                    </>
                                  );
                                })
                              : null}
                          </div>
                        </>
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
                  {/* Media Admins map ends here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMediaAdmin;
