import React, { useEffect, useState } from "react";

import Content from "./Content";
import axiosInstance from "../baseurl";


function JournalistHome() {
  const [mediatype, setmediatype] = useState("all");
  const [mediaid, setmediaid] = useState("allmedia");
  const [allmedia, setallmedia] = useState([]);

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
  }, []);
  return (
    <div className="home">
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          background: "white",
          padding: "20px",
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
              setmediatype(e.target.value)
            }}
            value="all"
            name="mediatype"
            id="btnr1"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnr1">
            All Category
          </label>

          <input
            type="radio"
            class="btn-check"
            onChange={(e) => {
              setmediatype(e.target.value)
            }}
            value="Politics"
            name="mediatype"
            id="btnr2"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnr2">
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
            id="btnr3"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnr3">
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
            id="btnr4"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnr4">
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
            id="btnr5"
            autocomplete="off"
          />

          
          <label class="btn btn-danger" for="btnr5">
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
            id="btnr6"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnr6">
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
            id="btnr7"
            autocomplete="off"
          />
          <label class="btn btn-danger" for="btnr7">
            Sports
          </label>
        </div>
      </div>
      {/* <hr/> */}
      <div class="container text-center">
        <div class="row">
          <div class="col-2 mt-3"
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
          <div class="col-10">
            <Content
              mediatype={mediatype}
              mediaid={mediaid}
              publicLog={false}
            />
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default JournalistHome;
