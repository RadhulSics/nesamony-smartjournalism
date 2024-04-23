import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
function LogMediaAdmin() {
	const Navigate= useNavigate()
	const [data,setdata] = useState({
		email:"",
		password:""
	})

	const changefn = (e)=>{
		setdata({...data, [e.target.name]:e.target.value})
	}

	useEffect(()=>{
		if(localStorage.getItem('medialogid')!=null){
			Navigate("/home")
		}
	},[])

	const subfn = (e)=>{
		e.preventDefault()
    console.log("data",data);
		axiosInstance.post(`/loginMedia`, data)
		.then((res)=>{
			console.log(res);
			if(res.data.status==200){
				localStorage.setItem('medialogid', res.data.data._id)
				alert("logged in")
				window.location.reload(false)
			}
			else{
				alert("Something went wrong. Please try again")
			}
		})
		.catch((err)=>{
			console.log(err);
		})
	}
  return (
    <div >
	      <div
        class="page-wrapperlog bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('https://cdn.dribbble.com/users/134487/screenshots/5489136/media/514ca2a361dbb3b81f6a5a2270caf29d.gif')",
          backgroundSize: "35%",
          backgroundPosition: "absolute",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="formcontainer">
          <div class="wrapperlog wrapper--w680">
            <div class="card card-2">
              <div class="card-body">
                <h2 class="title">Media Admin Login Form</h2>
                <form onSubmit={subfn}>
                  <div class="row row-space">
                    <div class="col-12">
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
                    <div class="col-12">
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
                    <button class="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
                <br />
                <hr />
                <Link to="/Register/MediaAdmin">
                  {" "}
                  Don't have an account? Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
  )
}

export default LogMediaAdmin