import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../baseurl";
import { useNavigate, Link } from "react-router-dom";

function RegJournalist() {
  const Navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    gender: "",
    city: "",
    contact: "",
    email: "",
    password: "",
    bloodgroup: "",
    age: "",
    address: "",
    highesteducation: "",
    img: null,
  });

  const changefn = (e) => {
    if (e.target.name == "img") {
      setdata({ ...data, img: e.target.files[0] });
    } else {
      setdata({ ...data, [e.target.name]: e.target.value });
    }
  };
  const subfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/registerJournalist`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          // alert(res.data.msg);
          // Navigate(`/Verification/${res.data.data._id}`);
          Navigate('/home')

        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  return (
    <div>
      <div
        class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/5a/dc/ae/5adcae5e3af5cdba2bb417b92e6d05bc.gif')",
          backgroundSize: "45%",
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="formcontainer"
          style={{ height: "900px", overflowY: "scroll", overflowX: "hidden" }}
        >
          <div class="wrapper wrapper--w680">
            <div class="card card-4">
              <div class="card-body">
                <h2 class="title text-danger">Journalist Registration Form</h2>
                <form onSubmit={subfn}>
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
                        <label class="label"> City</label>
                        <input
                          class="input--style-4"
                          type="text"
                          name="city"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group">
                        <label class="label"> Contact</label>
                        <input
                          class="input--style-4"
                          type="tel"
                          minLength="10"
                          maxLength="10"
                          name="contact"
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

                    <div class="col-6">
                      <div class="input-group">
                        <label class="label">Age</label>
                        <input
                          class="input--style-4"
                          type="number"
                          name="age"
                          min="1"
                          onChange={changefn}
                          required
                        />
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group">
                        <select
                          class="form-select"
                          name="highesteducation"
                          required
                          onChange={changefn}
                        >
                          <option value="">Educational Qualification</option>
                          <option value="High School">High School</option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="input-group">
                        <select
                          class="form-select"
                          name="bloodgroup"
                          required
                          onChange={changefn}
                        >
                          <option value="">Select your Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="col-12">
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                        >
                          Address
                        </label>
                        <textarea
                          class="form-control"
                          name="address"
                          onChange={changefn}
                          required
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                   
                    <div class="col-12">
                      <div class="mb-3">
                        <label for="formFile" class="form-label">
                          Upload your Image
                        </label>
                        <input
                          class="form-control"
                          type="file"
                          id="formFile"
                          name="img"
                          onChange={changefn}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="p-t-15">
                    <button class="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegJournalist;
