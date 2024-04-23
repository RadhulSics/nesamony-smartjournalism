import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useNavigate, useParams } from "react-router-dom";
function ViewMediabyid() {
    const {id} = useParams()
    const [MediaJournalist, setmediajournalist] = useState([]);
    const Navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('adminlog')==null){
        Navigate("/admin")
      }
  
    },[])
    useEffect(() => {
      console.log(id, 'media id');
      axiosInstance
        .post(`/viewJournalistByMId/${id}`)
        .then((res) => {
          console.log(res, "Media journalists data");
          if (res.data.data != undefined) {
            setmediajournalist(res.data.data);
          } else {
            setmediajournalist([]);
          }
        })
        .catch((err) => {
          console.log(err, " Media error");
        });
    }, []);
  return (
    <div>
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
              View All Media Journalists
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container text-center">
                <div class="row">
                  {/* Media Admins map starts here */}
                  {MediaJournalist.length ? (
                    MediaJournalist.map((a) => {
                      return (
                        <div class="col-3">
                          <div class="card" style={{ width: "18rem" }}>
                            <div class="card-body">
                              <h5 class="card-title">{a.name}</h5>
                              <p class="card-text">City: {a.city}</p>
                              <p class="card-text">Contact : {a.contact}</p>
                              <p class="card-text">Email : {a.email}</p>
                              <Link to={`/admin/MediaAdmin/viewnews/${a._id}`} class="btn btn-primary">
                                View News
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="col-12">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Data to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Media Admins map ends here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewMediabyid