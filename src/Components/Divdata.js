import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";
import { ContextWrap } from "../App";

function Divdata({ a, publicLog, category, mid }) {
  const Navigate = useNavigate();

  const url=useContext(ContextWrap)

  useEffect(() => {
    if (localStorage.getItem("publiclogid") == null) {
      Navigate("/home");
    }
  }, []);

  const savefn = (id) => {
    axiosInstance
      .post(`/saveNews/${localStorage.getItem("publiclogid")}`, { id: id })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("News Saved");
        }
        else{
          alert("News already saved.")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className={`col-12`}>
        <div className="container">
          <div className="row">
            
            <div className="col-5">
            <Link to={`/ViewNews/${a._id}`}>
              <img
                src={`${url}/${a.image}`}
                alt=""
                height={190}
                width={`100%`}
              />
              </Link>
            </div>

            <div className="col-7 newsdiv">
            <Link to={`/ViewNews/${a._id}`}>
              <h4>{a.title}</h4>
              
                <h5>
                  {a.mid ? (
                    <span class="badge bg-secondary">{a.mid.name}</span>
                  ) : null}
                  {a.jid.name}/{a.date.slice(3, 15)} - {a.loc}
                </h5>
              
              <p>{a.content.slice(0, 190) + "...read more"}</p>
             </Link>
            </div>

            {publicLog ? (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    style={{ width: "100%" }}
                    onClick={() => {
                      savefn(a._id);
                    }}
                  >
                    Save post
                  </button>
                </>
              ) : null}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default Divdata;
