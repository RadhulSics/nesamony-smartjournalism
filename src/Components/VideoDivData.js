import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import { ContextWrap } from "../App";

function VideoDivData({ a, publicLog, category, mid }) {
  const url=useContext(ContextWrap)

  return (
    <div>
      <div className={`col-12`}>
        <Link to={`/ViewVideo/${a._id}`}>
          <div className="container">
            <div className="row">
              <div className="col-5">
                <video width="100%" height="190">
                  <source
                    src={`${url}/${a.video.filename}`}
                    type="video/mp4"
                  />
                  <source src="movie.ogg" type="video/ogg" />
                </video>
              </div>

              <div className="col-7 newsdiv">
                <h4>{a.title}</h4>
                <h5> {a.date.slice(3, 15)}</h5>
                <small>
                  <a href="blog-author.html" title="">
                    - {a.loc}
                  </a>
                </small>
                <p>{a.content.slice(0, 150) + "...read more"}</p>
              </div>
            </div>
          </div>
        </Link>

        <hr />
      </div>
    </div>
  );
}

export default VideoDivData;
