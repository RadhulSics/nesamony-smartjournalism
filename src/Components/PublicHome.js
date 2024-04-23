import React, { useEffect, useState } from "react";

import Content from "./Content";
import axiosInstance from "../baseurl";
import axios from "axios";
import { Link } from "react-router-dom";

function PublicHome() {
  const [mediatype, setmediatype] = useState("all");
  const [mediaid, setmediaid] = useState("allmedia");
  const [allmedia, setallmedia] = useState([]);

  const [topmedia, settopmedia] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewMedias`)
      .then((res) => {
        console.log(res, "media");
        if (res.data.data != undefined) {
          setallmedia(res.data.data);
        } else {
          setallmedia([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewNewseswithreviews`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          settopmedia(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="home">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "white",
          // padding: "20px",
        }}
      >
        <div
          class="btn-group"
          role="group"
          aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"all"}
            name="mediatype"
            id="btnradio1"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio1">
            All Category
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"Politics"}
            name="mediatype"
            id="btnradio2"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio2">
            Politics
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"Kerala"}
            name="mediatype"
            id="btnradio3"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio3">
            Kerala
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"India"}
            name="mediatype"
            id="btnradio4"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio4">
            India
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"World"}
            name="mediatype"
            id="btnradio5"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio5">
            World
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"Business"}
            name="mediatype"
            id="btnradio6"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio6">
            Business
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value);
            }}
            value={"Sports"}
            name="mediatype"
            id="btnradio7"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnradio7">
            Sports
          </label>
        </div>
      </div>
      {/* <hr/> */}
      <div class="container text-center">
        <div class="row">
          <div
            class="col-2 mt-4"
            style={{
              height: "700px",
              background: "white",
              position: "sticky",
              top: "0px",
              overflowY: "auto",
              overflowX: "hidden",
              borderRight: "1px solid grey",
            }}
          >
            <h3 style={{ color: "black" }}> Top Media</h3>
            <hr />
            <input
              type="radio"
              class="btn-check"
              name="medianame"
              id="all"
              autocomplete="off"
              value="allmedia"
              onChange={(e) => {
                setmediaid(e.target.value);
              }}
            />
            <label
              class="btn btn-danger"
              for="all"
              style={{ width: "150px" }}
            >
              All Media
            </label>

            {allmedia.map((a) => {
              return (
                <>
                  <input
                    type="radio"
                    class="btn-check btn-danger"
                    name="medianame"
                    id={a._id}
                    autocomplete="off"
                    value={a._id}
                    onChange={(e) => {
                      setmediaid(e.target.value);
                    }}
                  />
                  <label
                    class="btn btn-danger"
                    for={a._id}
                    style={{ width: "150px" }}
                  >
                    {a.name}
                  </label>
                </>
              );
            })}
            <input
              type="radio"
              class="btn-check"
              name="medianame"
              id="freelance"
              autocomplete="off"
              value="freelance"
              onChange={(e) => {
                setmediaid(e.target.value);
              }}
            />
            <label
              class="btn btn-danger"
              for="freelance"
              style={{ width: "150px" }}
            >
              Freelance{" "}
            </label>
          </div>
          <div class="col-10 mt-2">
            <Content mediatype={mediatype} mediaid={mediaid} publicLog={true} />
          </div>
          {/* <div
            class="col-2"
            style={{
              height: "700px",
              background: "black",
              position: "sticky",
              top: "0px",
              overflowY: "auto",
              overflowX: "hidden",
              borderRight: "1px solid grey",
            }}
          >
            <h3 style={{ color: "white" }}> Top News</h3>
            <hr />

            <div className="container">
              <div className="row">
                {topmedia.map((a) => {
                  return (
                    <div className="col-12">
                      <Link to={`/ViewNews/${a._id}`}>
                        <div class="card">
                          <img
                            src={`${url}/${a.image}`}
                            class="card-img-top"
                            alt="..."
                          />
                          <div class="card-body">
                            <h6 class="card-title">{a.title}</h6>
                            <p> {a.category}</p>
                          </div>
                        </div>
                        <br />
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default PublicHome;
