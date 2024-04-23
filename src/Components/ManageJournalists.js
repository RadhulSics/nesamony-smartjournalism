import React, { useEffect, useState } from "react";
import AddJournalistbyMedia from "./Admin/AddJournalistbyMedia";
import axiosInstance from "../baseurl";
import MediaNewsManage from "./MediaNewsmanage";
import { useNavigate } from "react-router-dom";

function ManageJournalists() {
  const [journalists, setjournalists] = useState([]);

  
  const Navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('medialogid')==null){
      Navigate("/home")
    }
  },[])

  useEffect(() => {
    axiosInstance
      .post(`/viewJournalistByMId/${localStorage.getItem("medialogid")}`)
      .then((res) => {
        console.log(res, "journalist data");
        if (res.data.data != undefined) {
          setjournalists(res.data.data);
        } else {
          setjournalists([]);
        }
      })
      .catch((err) => {
        console.log(err, " journalist error");
      });
  }, []);

  return (
    <div style={{ minHeight: "300px", padding: "100px" }}>
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
              Add a new Journalist
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <AddJournalistbyMedia />
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              View All Journalist
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div class="container text-center">
                <div class="row">
                  {/* Journalist map starts here */}
                  {journalists.length ? (
                    journalists.map((a) => {
                      return (
                        <div class="col-4">
                          <div class="card" style={{ width: "19rem" }}>
                            <div class="card-body">
                              <h5 class="card-title">{a.name}</h5>
                              <p class="card-text">City: {a.city}</p>
                              <p class="card-text">Contact : {a.contact}</p>
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
                  {/* Journalist map ends here */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <h2> Manage Media News</h2>
          <MediaNewsManage />
        </div>
      </div>
    </div>
  );
}

export default ManageJournalists;
