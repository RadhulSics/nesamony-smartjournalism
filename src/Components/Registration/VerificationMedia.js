import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function VerificationMedia() {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [data, setdata] = useState("");

  useEffect(() => {
    // axiosInstance
    //   .post(`/sendKeyMedia/${id}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const subfn = (e) => {
    e.preventDefault();
    console.log(data);
    // axiosInstance
    //   .post(`/verifyKeyMedia/${id}`, { key: data })
    //   .then((res) => {
    //     console.log(res, "key approved");
    //     if (res.data.status == 200) {
    //       alert("Verified");
    //       Navigate("/home");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    Navigate("/home");
  };
  return (
    <div style={{ height: "450px" }}>
      <div
        // class="page-wrapper bg-gra-02 p-t-130 p-b-100 font-poppins"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/originals/4c/3a/6e/4c3a6eec97c681c938b172c0ae28860c.gif')",
          backgroundSize: "25%",
          backgroundPosition: "left top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-3"></div>
            <div
              className="col"
              style={{
                border: "2px solid black",
                margin: "20px",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <form onSubmit={subfn}>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    {" "}
                    Key{" "}
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter the key"
                    onChange={(e) => {
                      setdata(e.target.value);
                    }}
                  />
                </div>

                <button className="btn btn-primary"> Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerificationMedia;
