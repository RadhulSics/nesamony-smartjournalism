import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function AdminPublic() {
  const [Publicdata, setpublic] = useState([]);

  const Navigate = useNavigate();

 useEffect(()=>{
  if(localStorage.getItem('adminlog')==null){
    Navigate("/admin")
  }
 },[])

  useEffect(() => {
    axiosInstance
      .post(`/viewPublic`)
      .then((res) => {
        console.log(res, "Public data");
        if (res.data.data != undefined) {
            setpublic(res.data.data);
        } else {
            setpublic([]);
        }
      })
      .catch((err) => {
        console.log(err, " Media error");
      });
  }, []);
  return (
    <div style={{padding:"40px"}}>
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
              View All Public 
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
                  {/* Publicdata map starts here */}
                  {Publicdata.length ? (
                    Publicdata.map((a) => {
                      return (
                        <div class="col-4">
                          <div class="card" >
                            <div class="card-body">
                              <h5 class="card-title">Name : {a.name}</h5>
                              <p class="card-text">Age: {a.age}</p>
                              <p class="card-text">Gender: {a.gender}</p>
                              <p class="card-text">Email : {a.email}</p>
                            
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
                  {/* Publicdata map ends here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPublic;
