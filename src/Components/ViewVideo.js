import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function ViewVideo({url}) {
  const Navigate = useNavigate();


  useEffect(() => {
    if (
      localStorage.getItem("publiclogid") == null &&
      localStorage.getItem("journalistid") == null &&
      localStorage.getItem("medialogid") == null
    ) {
      Navigate("/home");
    }
  }, []);

  const { id } = useParams();
  const [comment, setcomment] = useState("");
  const [test, settest] = useState(false);

  const [vnews, setvnews] = useState({
    date: "21323123123",
    video: { filename: "" },
    reviews:[]
  });
  useEffect(() => {
    axiosInstance
      .post(`/viewVnewsById/${id}`)
      .then((res) => {
        console.log(res, "video news by id data ");
        if (res.data.data != undefined) {
          setvnews(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [test]);
  

  const postcomment = (id) => {
    console.log(id);
    axiosInstance
      .post(`/addCommentForVNews/${id}`, { comments: comment })
      .then((res) => {
        console.log(res);
        settest((prevstate) => !prevstate);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ margin: "100px" }}>
      <Link className="btn btn-primary" to="/home">
        {" "}
        Back to news
      </Link>
      <div className="container ">
        <div className="row">
          <div className="col-9" style={{ margin: "auto" }}>
            <div class="card" style={{ width: "100%" }}>
              <video
                src={`${url}/${vnews.video.originalname}`}
                width="100%"
                height="550px"
                controls
              ></video>

              <div class="card-body">
                <h4 class="card-title">{vnews.title}</h4>
                <p class="card-title"> {vnews.date.slice(0, 15)}</p>
                <hr />
                <p class="card-text">
                  {vnews.loc}: {vnews.content}
                </p>
                <div class="input-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Add your comment here"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    onChange={(e) => {
                      setcomment(e.target.value);
                    }}
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="button-addon2"
                    onClick={() => {
                      postcomment(vnews._id);
                    }}
                  >
                    Post Comment
                  </button>
                </div>
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
                        View comments
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      class="accordion-collapse collapse "
                      data-bs-parent="#accordionExample"
                    >
                      <div class="accordion-body">
                      {vnews.reviews.length ? (
                        vnews.reviews.map((a) => {
                          return (
                            <p
                              style={{
                                padding: "5px 15px",
                                border: "2px solid lightgrey",
                                borderRadius: "20px",
                              }}
                            >
                              {" "}
                              {a}
                            </p>
                          );
                        })
                      ) : (
                        <p> No Comments</p>
                      )}
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

export default ViewVideo;
