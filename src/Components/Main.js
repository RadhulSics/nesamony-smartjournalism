import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JournalistHome from "./JournalistHome";
import axiosInstance from "../baseurl";
import PublicHome from "./PublicHome";
import pro8 from "../Assets/images/pro8.jpg";
import pro3 from "../Assets/images/pro3.jpg";
import pro4 from "../Assets/images/pro4.jpg";
import pro5 from "../Assets/images/pro5.jpg";
import pro9 from "../Assets/images/pro9.jpg";
import img11 from "../Assets/images/img11.jpg";
import About from "./About";
import { ContextWrap } from "../App";

function Main({ auth }) {
  const [homenews, sethnews] = useState([]);
  const url=useContext(ContextWrap)

  useEffect(() => {
    axiosInstance
      .post(`/viewNewsForHome`)
      .then((res) => {
        console.log(res, "home news");
        if (res.data.data != undefined) {
          sethnews(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (auth == 0) {
    console.log(homenews.length);
    if (homenews.length) {
      return (
        
        <div>
            
            <div id="carouselExampleCaptions" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={pro8} height="520" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block ">
              <h2 className="title">SMART JOURNALISM</h2>
              <h4 className="title">
                Journalism is always the art of the incomplete
              </h4>
            </div>
          </div>
          <div class="carousel-item">
            <img src={pro9} height="520" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>SMART JOURNALISM</h5>
              <p>Join with our smart journalism comunity</p>
            </div>
          </div>
          <div class="carousel-item">
            <img src={img11} height="520" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h5>SMART JOURNALISM</h5>
              <p>Join with our smart journalism comunity</p>
            </div>
          </div>
        </div>
       
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
            

            <br></br>

            <h3 className="ccc"> Latest News</h3>
            <br></br>
            <div class=" row row-cols-1 row-cols-md-3 g-4">
              {homenews.map((a) => {
                return (
                  <div class="col-4 mt-2">
                    <div class="card" className="hom1">
                      <img
                        src={`${url}/${a.image}`}
                        class="card-img-top"
                        alt="..."
                      />
                      <div class="card-body mt-4">
                        <h5 class="card-title mb-2">{a.title}</h5>
                        <p>
                          {a.content.slice(0, 350)}
                          <Link to={"/login/Public"}>...view more</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <br></br>
            <br></br>
            <h4 className="ddd">
              JOURNALISM IS ALWAYS THE ART OF THE INCOMPLETE
            </h4>
            <h5 className="ddd">
              "Journalism is printing what someone else does not want
              printed:everthing else is public relations"{" "}
            </h5>
            <br></br>
            <br></br>
            <About />
        </div>
      );
    } else {
      return (
        <div
          className="maindiv"
          style={{ padding: "30px", borderRadius: "40px" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-6">
                <img src="https://cdn.dribbble.com/users/925704/screenshots/6513438/scrolling.gif" />
              </div>
              <div className="col-6">
                <h1>
                  Newseeker
                  <hr />
                  Your Source for Timely and Reliable Online News
                </h1>
              </div>
            </div>
          </div>
        </div>
      );
    }
  } else if (auth == 3) {
    return <PublicHome />;
  } else {
    return <JournalistHome />;
  }
}

export default Main;
