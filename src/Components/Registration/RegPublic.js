import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function RegPublic() {
  const Navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/registerPublic`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert(res.data.msg);
          Navigate("/login/Public");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  return (
    <div>
      <div>
        <div
          class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
          style={{
            backgroundImage:
              "url('https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ea5d0476339699.5c6694d453222.gif')",
            backgroundSize: "45%",
            backgroundRepeat: "no-repeat",
            minHeight:'600px'
          }}
        >
          <div className="formcontainer">
            <div class="wrapper wrapper--w680">
              <div class="card card-4">
                <div class="card-body">
                  <h2 class="title text-danger ">Public Registration Form</h2>
                  <form onSubmit={submitfn}>
                    <div class="row row-space">
                      <div class="col-6">
                        <div class="input-group">
                          <label class="label"> Name</label>
                          <input
                            class="input--style-4"
                            type="text"
                            name="name"
                            onChange={changefn}
                            required
                          />
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="input-group">
                          <label class="label"> Email</label>
                          <input
                            class="input--style-4"
                            type="email"
                            name="email"
                            onChange={changefn}
                            required
                          />
                        </div>
                      </div>
                      <div
                        class="btn-group"
                        role="group"
                        aria-label="Basic radio toggle button group"
                      >
                        <input
                          type="radio"
                          class="btn-check"
                          name="gender"
                          id="btnradio1"
                          autocomplete="off"
                          onChange={changefn}
                          value="Male"
                        />
                        <label class="btn btn-outline-danger" for="btnradio1">
                          Male
                        </label>

                        <input
                          type="radio"
                          class="btn-check"
                          name="gender"
                          id="btnradio2"
                          autocomplete="off"
                          onChange={changefn}
                          value="Female"
                        />
                        <label class="btn btn-outline-danger" for="btnradio2">
                          Female
                        </label>

                        <input
                          type="radio"
                          class="btn-check"
                          name="gender"
                          id="btnradio3"
                          autocomplete="off"
                          onChange={changefn}
                          value="Other"
                        />
                        <label class="btn btn-outline-danger" for="btnradio3">
                          Other
                        </label>
                      </div>
                      <div class="col-6">
                        <div class="input-group">
                          <label class="label">Age</label>
                          <input
                            class="input--style-4"
                            type="number"
                            min="1"
                            name="age"
                            onChange={changefn}
                            required
                          />
                        </div>
                      </div>
                      
                      <div class="col-6">
                        <div class="input-group">
                          <label class="label">Password</label>
                          <input
                            class="input--style-4"
                            type="password"
                            name="password"
                            onChange={changefn}
                            required
                          />
                        </div>
                      </div>
                      
                    </div>
                    <div class="p-t-15">
                      <button class="btn btn-danger" type="submit">
                        Register
                      </button>
                    </div>
                  </form>
                  <br />
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegPublic;
