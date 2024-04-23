import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AdminJournalist() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      Navigate("/admin");
    }
  }, []);

  const [journalists, setjournalists] = useState([]);
  const [viewalljournalists, setalljournalist] = useState([]);

  const [plan, setplan] = useState({
    name: "",
    maxCount: "",
    cost: "",
    days: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      navigate("/home");
    }
  });

  const approveFreelancer = (id) => {
    axiosInstance
      .post(`/approveFreelancer/${id}`)
      .then((res) => {
        console.log(res, "approve freelancer");
        alert("Approved");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err, "approve freelancer err");
      });
  };

  const changefn = (e) => {
    setplan({ ...plan, [e.target.name]: e.target.value });
  };

  const subfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/registerPlan`, plan)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Plan added");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axiosInstance
      .post(`/viewFreelancerReqs`)
      .then((res) => {
        console.log(res, "journalist req");
        if (res.data.data != undefined) {
          setjournalists(res.data.data);
        } else {
          setjournalists([]);
        }
      })
      .catch((err) => {
        console.log(err, " journalist error");
      });

    axiosInstance
      .post(`/viewJournalists`)
      .then((res) => {
        console.log(res, "journalist data");
        if (res.data.data != undefined) {
          setalljournalist(res.data.data);
        } else {
          setalljournalist([]);
        }
      })
      .catch((err) => {
        console.log(err, " journalist error");
      });
  }, []);

  const blockfn = (id) => {
    axiosInstance
      .post(`/blockFreelancer/${id}`)
      .then((res) => {
        console.log(res, "blocked Journalist");
        alert("Blocked");
        window.location.reload(false);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  const unblock = (id) => {
    axiosInstance
      .post(`/unBlockFreelancer/${id}`)
      .then((res) => {
        console.log(res, "Unblock Journalist");
        alert("UnBlocked");
        window.location.reload(false);
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
              View All Freelance Journalist requests
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
                  {/* Journalist map starts here */}
                  {journalists.length ? (
                    journalists.map((a) => {
                      return (
                        <div class="col-6">
                          <div class="card">
                            <div class="card-body">
                              <h2 class="card-title">
                                {a.name}{" "}
                                <span class="badge bg-secondary">
                                  {a.mid ? "Media" : "Freelance"}
                                </span>
                              </h2>
                              <p class="card-text">City: {a.city}</p>
                              <p class="card-text">Contact : {a.contact}</p>
                              <p class="card-text">Email : {a.email}</p>

                              <button
                                onClick={() => {
                                  approveFreelancer(a._id);
                                }}
                                class="btn btn-primary"
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
                  {/* Journalist map ends here */}
                </div>
              </div>
            </div>
          </div>
        </div>
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
              View All Journalists
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
                  {/* Journalist map starts here */}
                  {viewalljournalists.length ? (
                    viewalljournalists.map((a) => {
                      return (
                        <div class="col-4">
                          <div class="card">
                            <div class="card-body">
                              <h2 class="card-title">
                                {a.name}
                                <span class="badge bg-secondary">
                                  {a.mid ? "Media" : "Freelance"}
                                </span>
                              </h2>
                              <p class="card-text">City: {a.city}</p>
                              <p class="card-text">Contact : {a.contact}</p>
                              <p class="card-text">Email : {a.email}</p>
                            </div>
                            <Link
                              to={`/admin/Journalist/Viewplan/${a._id}`}
                              className="btn btn-primary"
                            >
                              {" "}
                              View Plan
                            </Link>

                            {a.mid ? null: (
                              a.blocked ? (
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
                              )
                            ) }
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
                  {/* Journalist map ends here */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              Add a Plan
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
              <div className="row">
              <div className="col-6"
                style={{
                  backgroundImage:
                    "url('https://i.pinimg.com/originals/5a/dc/ae/5adcae5e3af5cdba2bb417b92e6d05bc.gif')",
                  backgroundSize: "100%",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                  
              </div>
              <div className="col-6">
              <div class="card card-4">
                      <div class="card-body">
                        <h2 class="title">Add a plan</h2>
                        <form onSubmit={subfn}>
                          <div class="row row-space">
                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Name</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="name"
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>

                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Max Post Count</label>
                                <input
                                  class="input--style-4"
                                  type="number"
                                  min="1"
                                  name="maxCount"
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Cost</label>
                                <input
                                  class="input--style-4"
                                  type="number"
                                  min="1"
                                  name="cost"
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-12">
                              <div class="input-group">
                                <label class="label"> Days</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="days"
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

export default AdminJournalist;
