import React from 'react'
import news3 from "../Assets/images/news3.jpg";
// import img2 from '../Assets/Images/about-2.jpg'
function About() {
  return (
    <>
        {/* <div class="container-xxl py-5" style={{minHeight:"450px"}}>
        <div class="container">
            <div class="row g-5">
                <div class="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                    <h1 class="text-dark text-uppercase">About Us</h1>
                    <h2 class="mb-4">Welcome to Smart Journalism</h2>
                    <h6 class="mb-4">Your trusted source for intelligent and insightful news coverage. We are committed to delivering high-quality journalism that goes beyond the headlines, providing in-depth analysis, context, and diverse perspectives on the most important issues of our time.</h6>
                    
                  <h6> Join us in our quest for intelligent journalism that enlightens, inspires, and empowers. Together, let's stay informed and shape a better future.</h6>
                </div>
                <div class="col-lg-6 pt-4" style={{minHeight: "500px;"}}>
                    <div class="position-relative h-100 wow fadeInUp" data-wow-delay="0.5s">
                         <img class="position-absolute img-fluid w-100 h-100" src={img1} style={{objectFit: "contain", padding: "0 0 50px 100px;"}} alt=""/>
                       <img class="position-absolute start-0 bottom-0 img-fluid bg-white pt-2 pe-2 w-50 h-50" src={img2} style={{objectFit: "cover"}} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div> */}
    <div class="card mb-3" className="zzz">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src={news3}
              width="400px"
              height="300px"
              class="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
            <h4 className="ccc">About us</h4>
              <br></br>
              <p class="card-text" className="xyz">
                Welcome to our website, where innovation meets integrity in the
                pursuit of groundbreaking journalism. At Smart Journalism, we're
                driven by a passion for redefining the boundaries of traditional
                reporting through the seamless integration of cutting-edge
                technology, data analytics, and collaborative storytelling.At
                the heart of our mission is a commitment to elevating the
                standards of journalism in the digital age. We believe in
                harnessing the power of technology to empower journalists,
                engage audiences, and drive positive change in society. Through
                our innovative approaches and unwavering dedication to ethical
                journalism, we aim to inform, inspire, and connect people across
                the globe.
              </p>
              <h5 className="tit">Join Us:</h5>
              <p className="xyz">
                Whether you're a journalist, technologist, data enthusiast, or
                simply a passionate advocate for quality journalism, we invite
                you to join us on our journey. Together, we can redefine the
                future of journalism and create a world where information
                empowers, inspires, and unites us all.
              </p>
              <h5 className="tit">Featured Articles:</h5>
              <p>
                Dive deeper into the stories shaping our world with our
                collection of featured articles. From in-depth analyses to
                exclusive interviews, explore a range of topics and gain
                valuable insights from expert perspectives. Our curated
                selection of featured articles ensures that you're always
                informed and engaged with the issues that matter most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About