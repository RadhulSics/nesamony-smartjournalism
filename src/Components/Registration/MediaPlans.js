import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function MediaPlans() {
  const navigate = useNavigate();
  const [plans, setplans] = useState([]);
  const [Media, setMedia] = useState({});

  const Navigate = useNavigate();

 useEffect(()=>{
  if(localStorage.getItem('medialogid')==null){
    Navigate("/home")
  }
 },[])

 
  useEffect(() => {
    axiosInstance
      .post(`/viewMediaById/${localStorage.getItem(`medialogid`)}`)
      .then((res) => {
        console.log(res, "Media");
        setMedia(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
    axiosInstance
      .post(`/viewPlans`)
      .then((res) => {
        console.log(res,'view plans');
        if (res.data.data != undefined) {
          setplans(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const subplan = (id) => {
    axiosInstance
      .post(`/subscribePlan`, {
        planid: id,
        usrType: "Media",
        mid: Media._id,
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Subscribed");
          // navigate(`/home`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ minHeight: "400px" }}>
      <h1 style={{ textAlign: "center" }}> Select a plan</h1>
      <div className="container">
        <div className="row">
          {plans.length
            ? plans.map((a) => {
                return (
                  <div className="col-4">
                    <div class="card" >
                      <div class="card-body">
                        <h5 class="card-title">Plan : <b>{a.name}</b></h5>
                        <h6 class="card-text">
                          Price : {a.cost}₹
                        </h6>
                        <p class="card-text">
                          Plan validity : {a.days} days
                        </p>
                        <p class="card-text">
                          Posting limit per plan : {a.maxCount} posts
                        </p>
                           <button
                          type="button"
                          class="btn btn-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          Subscribe
                        </button>

                        <div
                          class="modal fade"
                          id="exampleModal"
                          tabindex="-1"
                          aria-labelledby="exampleModalLabel"
                          aria-hidden="true"
                        >
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h1
                                  class="modal-title fs-5"
                                  id="exampleModalLabel"
                                >
                                  Select a payment method
                                </h1>
                                <button
                                  type="button"
                                  class="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div class="modal-body">
                                <form onSubmit={()=>{subplan(a._id)}}>
                                  <div class="container">
                                    <div class="row">
                                      <div
                                        class="col-12"
                                        style={{ margin: "-10px" }}
                                      >
                                        <p>
                                          <a
                                            class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                                            data-bs-toggle="collapse"
                                            href="#collapseExample"
                                            role="button"
                                            aria-expanded="true"
                                            aria-controls="collapseExample"
                                          >
                                            <span class="fw-bold">
                                              Credit Card
                                            </span>
                                          </a>
                                        </p>
                                        <div
                                          class="collapse"
                                          id="collapseExample"
                                        >
                                          <div class="row">
                                            <div class="col-1"></div>
                                            <div class="col-11">
                                              <div class="row">
                                                <div class="col-12">
                                                  <div class="form__div">
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Card Number"
                                                      minLength="16"
                                                      maxLength="16"
                                                      required
                                                    />
                                                    <hr />
                                                  </div>
                                                </div>

                                                <div class="col-6">
                                                  <div class="form__div">
                                                    <input
                                                      type="date"
                                                      class="form-control"
                                                      placeholder="MM/YY"
                                                      required
                                                    />
                                                    <hr />
                                                  </div>
                                                </div>

                                                <div class="col-6">
                                                  <div class="form__div">
                                                    <input
                                                      type="password"
                                                      class="form-control"
                                                      placeholder="CVV"
                                                      minLength="3"
                                                      maxLength="3"
                                                      required
                                                    />
                                                    <hr />
                                                  </div>
                                                </div>
                                                <div class="col-12">
                                                  <div class="form__div">
                                                    <input
                                                      type="text"
                                                      class="form-control"
                                                      placeholder="Name on the Card"
                                                      required
                                                    />
                                                    <label
                                                      for=""
                                                      class="form__label"
                                                    ></label>
                                                  </div>
                                                </div>
                                                <div class="col-12">
                                                  <button class="btn btn-primary">
                                                    Confirm purchase
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}

export default MediaPlans;
