import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function AddJournalistbyMedia() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("medialogid") == null) {
      Navigate("/home");
    }
  },[]);
  const [data, setdata] = useState({
    name: "",
    gender: "",
    city: "",
    contact: "",
    email: "",
    password: "",
    empid: "",
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
      .post(
        `/addJournalistByMedia/${localStorage.getItem("medialogid")}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          // Navigate(`/Verification/${res.data.data._id}`);
          Navigate("/home")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div style={{ minHeight: "1500px" }}>
      <div className="container">
        <div className="row">
          <div className="col-5">
            <img 
            width={510}
            height={450}
              src={` https://img.freepik.com/premium-vector/tv-reporter-operator-illustration_107173-14273.jpg`}
            />
            <img
            width={510} 
            height={600}
            style={{objectFit:'cover'}}
              src={`https://cdn.dribbble.com/users/1119336/screenshots/8195178/media/07c277b3748fe9f0c128ddde9fe14590.png?resize=1000x750&vertical=center`}
            />
          </div>
          <div className="col-7
          ">
            <div className="formcontainer">
              <div class="wrapper wrapper--w680">
                <div class="card card-4">
                  <div class="card-body">
                    <h2 class="title text-danger ">Add a new Journalist</h2>
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
                            <label class="label"> Employee ID</label>
                            <input
                              class="input--style-4"
                              type="number"
                              name="empid"
                              onChange={changefn}
                              required
                            />
                          </div>
                        </div>
                        <div class="col-12">
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
                          <div class="input-group">
                            <select
                              class="form-select"
                              name="highesteducation"
                              required
                              onChange={changefn}
                            >
                              <option value="">
                                Educational Qualification
                              </option>
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
      </div>
    </div>
  );
}

export default AddJournalistbyMedia;
