import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../baseurl";

function ViewNews({url}) {
  const { id } = useParams();
  const [news, setnews] = useState({ date: "21323123123", reviews: [1, 2, 3] });
  const [comment, setcomment] = useState("");
  const [test, settest] = useState(false);

  

  useEffect(() => {
    axiosInstance
      .post(`/viewNewsById/${id}`)
      .then((res) => {
        console.log(res, "news by id data ");
        if (res.data.data != undefined) {
          setnews(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [test]);

  const postcomment = (id) => {
    axiosInstance
      .post(`/addComment/${id}`, { comments: comment })
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
        Back to home
      </Link>
      <div className="container ">
        <div className="row">
          <h1 class="card-title">{news.title}</h1>
          <h5 class="card-title"> {news.date.slice(0, 15)}</h5>
          <hr />
          <div className="col-5">
            <div class="card">
              <img
                src={`${url}/${news.image}`}
                class="card-img-top"
                alt="..."
                width={400}
              />
            </div>
          </div>
          <div className="col-7">
            <div class="card-body">
              <p style={{ fontSize: "20px" }} class="card-text">
                {news.loc}: {news.content}
              </p>
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Add your comment here"
                  style={{
                    borderRadius: "40px",
                    height: "40px",
                    margin: "10px",
                  }}
                  aria-describedby="button-addon2"
                  onChange={(e) => {
                    setcomment(e.target.value);
                  }}
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  style={{ margin: "10px", borderRadius: "40px" }}
                  onClick={() => {
                    postcomment(news._id);
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
                      style={{ padding: "4px" }}
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
                      {news.reviews.length ? (
                        news.reviews.map((a) => {
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
  );
}

export default ViewNews;
