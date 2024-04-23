import React, { useEffect, useState } from "react";
import axiosInstance from "../baseurl";
import { useNavigate } from "react-router-dom";

function PostMedia() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem(`journalistid`) == null) {
      navigate("/home");
    }
  },[]);

  const [news, setnews] = useState({
    title: "",
    loc: "",
    content: "",
    jid: localStorage.getItem("journalistid"),
    category: "",
    image: null,
    freelancer: (localStorage.getItem("journalistjobstatusandmid"))?JSON.parse(localStorage.getItem("journalistjobstatusandmid")).jobstatus:null,
    mid: (localStorage.getItem("journalistjobstatusandmid"))?JSON.parse(localStorage.getItem("journalistjobstatusandmid")).mid:null,
  });

  const [vnews, setvnews] = useState({
    title: "",
    loc: "",
    content: "",
    category: "",
    video: null,
    jid: localStorage.getItem("journalistid"),
    freelancer: (localStorage.getItem("journalistjobstatusandmid"))?JSON.parse(localStorage.getItem("journalistjobstatusandmid")).jobstatus:null,
    mid: (localStorage.getItem("journalistjobstatusandmid"))?JSON.parse(localStorage.getItem("journalistjobstatusandmid")).mid:null,
  });

  const changefn = (e) => {
    if (e.target.name == "image") {
      setnews({ ...news, image: e.target.files[0] });
    } else {
      setnews({ ...news, [e.target.name]: e.target.value });
    }
  };
  const changefn2 = (e) => {
    console.log(vnews);
    if (e.target.name == "video") {
      setvnews({ ...vnews, video: e.target.files[0] });
    } else {
      setvnews({ ...vnews, [e.target.name]: e.target.value });
    }
  };
  const submitfn1 = (e) => {
    console.log(news, "news data");
    console.log(JSON.parse(localStorage.getItem("journalistjobstatusandmid")).jobstatus, ' job status')
    console.log(JSON.parse(localStorage.getItem("journalistjobstatusandmid")).mid, ' mid')
    e.preventDefault();
    console.log( localStorage.getItem("journalistid"));
    axiosInstance
      .post(`/addNews`, news, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Added a new post");
          window.location.reload(false);
        }
        else{
          alert(`couldn't post. Please choose a new plan`)
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong.");
        // alert("Couldn't post. Please try again.")
      });
  };
  const submitfn2 = (e) => {
    e.preventDefault();

    console.log(vnews, "v news data");
    axiosInstance
      .post(`/addvNews`, vnews, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Added a new post");
          // window.location.reload(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ padding: "50px", minHeight: "450px" }}>
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
              Add News
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div
                class="page-wrapperlog bg-gra-02 p-t-130 p-b-100 font-poppins"
                style={{
                  backgroundImage:
                    "url('https://cdn.dribbble.com/users/925704/screenshots/6513438/scrolling.gif')",
                  backgroundSize: "45%",
                  minHeight: "900px",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="formcontainer">
                  <div class="wrapperlog wrapper--w680">
                    <div class="card card-4">
                      <div class="card-body">
                        <form onSubmit={submitfn1}>
                          <div class="row row-space">
                            <div class="col-6">
                              <div class="input-group">
                                <label class="label"> Title</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="title"
                                  onChange={changefn}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="input-group">
                                <label class="label">Location</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="loc"
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
                                  Content
                                </label>
                                <textarea
                                required
                                  name="content"
                                  onChange={changefn}
                                  class="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="15"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={changefn}
                              name="category"
                              required
                            >
                              <option value="">Select a Category</option>
                              <option>Politics</option>
                              <option>Kerala</option>
                              <option>India</option>
                              <option>World</option>
                              <option>Business</option>
                              <option>Sports</option>
                              <option>Entertainment</option>
                              <option>Fashion</option>
                            </select>
                          </div>
                          <div class="col-12">
                            <div class="mb-3">
                              <br />
                              <input
                                class="form-control"
                                name="image"
                                onChange={changefn}
                                type="file"
                                id="formFile"
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
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Post Video
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div
                class="page-wrapperlog bg-gra-02 p-t-130 p-b-100 font-poppins"
                style={{
                  backgroundImage:
                    "url('https://cdn.dribbble.com/users/925704/screenshots/6513438/scrolling.gif')",
                  backgroundSize: "45%",
                  minHeight: "900px",
                  backgroundPosition: "left",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="formcontainer">
                  <div class="wrapperlog wrapper--w680">
                    <div class="card card-4">
                      <div class="card-body">
                        <form onSubmit={submitfn2}>
                          <div class="row row-space">
                            <div class="col-6">
                              <div class="input-group">
                                <label class="label"> Title</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="title"
                                  onChange={changefn2}
                                  required
                                />
                              </div>
                            </div>
                            <div class="col-6">
                              <div class="input-group">
                                <label class="label">Location</label>
                                <input
                                  class="input--style-4"
                                  type="text"
                                  name="loc"
                                  onChange={changefn2}
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
                                  Content
                                </label>
                                <textarea
                                  name="content"
                                  onChange={changefn2}
                                  class="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="15"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="col-12">
                            <select
                              class="form-select"
                              aria-label="Default select example"
                              onChange={changefn2}
                              name="category"
                            >
                              <option value="">Select a Category</option>
                              <option>Politics</option>
                              <option>Kerala</option>
                              <option>India</option>
                              <option>World</option>
                              <option>Business</option>
                              <option>Sports</option>
                            </select>
                          </div>
                          <div class="col-12">
                            <div class="mb-3">
                              <br />
                              <input
                                class="form-control"
                                name="video"
                                onChange={changefn2}
                                type="file"
                                id="formFile"
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

export default PostMedia;
