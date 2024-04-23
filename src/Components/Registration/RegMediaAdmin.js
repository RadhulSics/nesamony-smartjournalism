import React, { useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useNavigate } from "react-router-dom";

function RegMediaAdmin() {
  const Navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    regNo: "",
    contact: "",
    email: "",
    password: "",
    address:"",
    web:"",
    img:null
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
      .post(`/registerMedia`, data, { headers: {
        "Content-Type": "multipart/form-data"
      },})
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
           Navigate(`/login/MediaAdmin}`);
        } else {
          alert("Couldn't Register. Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong");
      });
  };
  return (
    <div
      class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
      style={{
        backgroundImage:
          "url('https://cdn.dribbble.com/users/134487/screenshots/5489136/media/514ca2a361dbb3b81f6a5a2270caf29d.gif')",
        backgroundSize: "33%",
        // backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="formcontainer">
        <div class="wrapper wrapper--w680">
          <div class="card card-4">
            <div class="card-body">
              <h2 class="title text-danger">Media Admin Registration Form</h2>
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
                      <label class="label">Registration Number</label>
                      <input
                        class="input--style-4"
                        type="number"
                        name="regNo"
                        onChange={changefn}
                        required
                      />
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="input-group">
                      <label class="label">Website </label>
                      <input
                        class="input--style-4"
                        type="url"
                        name="web"
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
  );
}

export default RegMediaAdmin;
