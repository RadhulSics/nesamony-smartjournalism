import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function AdminJournalistPlans() {
  const { id } = useParams();
  const [viewplan, setviewplan] = useState({});


  const Navigate = useNavigate();

 useEffect(()=>{
  if(localStorage.getItem('adminlog')==null){
    Navigate("/admin")
  }
 },[])


  useEffect(() => {
    axiosInstance
      .post(`/viewSubByJId/${id}`)
      .then((res) => {
        console.log(res, " JID package");
        if (res.data.data != undefined) {
          setviewplan(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ padding: "40px" }}>
      <div className="container">
        <div className="row">
          {viewplan.length ? (
            viewplan.map((a) => {
              return (
                <div className="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">{a.planid.name}</h5>
                      <p class="card-text">
                        Expiry Date : {a.expiry.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">No Plan</h5>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminJournalistPlans;
