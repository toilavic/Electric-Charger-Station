import React  from 'react';
import '../css/styles.css'
export default class Index extends React.Component {  
  constructor(props) {
    super(props);
    }
    render() {
        return (
            <div>
              <meta charSet="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
              <meta name="description" content />
              <meta name="author" content />
              <title>Grayscale - Start Bootstrap Theme</title>
              <link rel="icon" type="image/x-icon" href="assets/img/favicon.ico" />
              {/* Font Awesome icons (free version)*/}
              {/* Google fonts*/}
              <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet" />
              <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />
            
              
              {/* Masthead*/}
              <header className="masthead">
                <div className="container d-flex h-100 align-items-center">
                  <div className="mx-auto text-center">
                    <h1 className="mx-auto my-0 text-uppercase">Electric Charger</h1>
                    <h2 className="text-white-50 mx-auto mt-2 mb-5">The Public registy of electric vehical charging based in Oulu</h2>
                    <a className="btn btn-primary js-scroll-trigger" href="Map">Open Map</a>	&#160;
                    <a className="btn btn-primary js-scroll-trigger" href="#about">Get Started</a>
                  </div>
                </div>
              </header>
              {/* About*/}
              <section className="about-section text-center" id="about">
                <div className="container">
                  <div className="row">
                        <div className="col-lg-8 mx-auto">
                      <h2 className="text-white mb-4">A web application for an imaginary electric car charger network provider</h2>
                      <p className="text-white-50">
                      Car chargers across the country, an application which their customers can use.
                      <img className="" src="../assets/img/bg-masthead.jpg" alt="" />
                      </p>
                    </div>
                  </div>
                  
                </div>
              </section>
              {/* Projects*/}
              <section className="projects-section bg-light" id="projects">
                <div className="container">
                  {/* Featured Project Row*/}
                  <div className="row align-items-center no-gutters mb-4 mb-lg-5">
                    <div className="col-xl-8 col-lg-7"><img className="img-fluid mb-3 mb-lg-0" src="assets/img/bg-masthead.jpg" alt="" /></div>
                    <div className="col-xl-4 col-lg-5">
                      <div className="featured-text text-center text-lg-left">
                        <h4>Guide to EV charging</h4>
                        <p className="text-black-50 mb-0">Electric vehicle (EV) charging is an important aspect of EV ownership. We have created this guide to EV charging; a series of step-by-step guides that cover all key issues related to electric vehicle charging, including public networks, charging at home and work, charge point speeds, and model-specific charging guides.</p>
                      </div>
                    </div>
                  </div>
                  {/* Project One Row*/}
                  <div className="row justify-content-center no-gutters mb-5 mb-lg-0">
                    <div className="col-lg-6"><img className="img-fluid" src="assets/img/demo-image-01.jpg" alt="" /></div>
                    <div className="col-lg-6">
                      <div className="bg-black text-center h-100 project">
                        <div className="d-flex h-100">
                          <div className="project-text w-100 my-auto text-center text-lg-left">
                            <h4 className="text-white">Public EV charging networks</h4>
                            <p className="mb-0 text-white-50">Oulu has a large number of public EV charging networks. All public points require ad-hoc access, and most networks offer access via an app and/or RFID card. Contactless bank card access is common on rapid chargers.</p>
                            <hr className="d-none d-lg-block mb-0 ml-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Project Two Row*/}
                  <div className="row justify-content-center no-gutters">
                    <div className="col-lg-6"><img className="img-fluid" src="assets/img/demo-image-02.jpg" alt="" /></div>
                    <div className="col-lg-6 order-lg-first">
                      <div className="bg-black text-center h-100 project">
                        <div className="d-flex h-100">
                          <div className="project-text w-100 my-auto text-center text-lg-right">
                            <h4 className="text-white">Charging your electric car</h4>
                            <p className="mb-0 text-white-50">Map’s EV guides cover all aspects of charging your electric car, including vehicle range, charging inlets, charging times & costs, and how to charge each model.</p>
                            <hr className="d-none d-lg-block mb-0 mr-0" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* Signup*/}
              <section className="signup-section" id="signup">
                <div className="container">
                  <div className="row">
                    <div className="col-md-10 col-lg-8 mx-auto text-center">
                      <i className="far fa-paper-plane fa-2x mb-2 text-white" />
                      <h2 className="text-white mb-5">Subscribe to receive updates!</h2>
                      <form className="form-inline d-flex">
                        <input className="form-control flex-fill mr-0 mr-sm-2 mb-3 mb-sm-0" id="inputEmail" type="email" placeholder="Enter email address..." />
                        <button className="btn btn-primary mx-auto" type="submit">Subscribe</button>
                      </form>
                    </div>
                  </div>
                </div>
              </section>
              {/* Contact*/}
              <section className="contact-section bg-black">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="card py-4 h-100">
                        <div className="card-body text-center">
                          <i className="fas fa-map-marked-alt text-primary mb-2" />
                          <h4 className="text-uppercase m-0">Address</h4>
                          <hr className="my-4" />
                          <div className="small text-black-50">Oulu, 90570 Finland</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="card py-4 h-100">
                        <div className="card-body text-center">
                          <i className="fas fa-envelope text-primary mb-2" />
                          <h4 className="text-uppercase m-0">Email</h4>
                          <hr className="my-4" />
                          <div className="small text-black-50"><a href="#!">t9ngth00@students.oamk.fi</a></div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                      <div className="card py-4 h-100">
                        <div className="card-body text-center">
                          <i className="fas fa-mobile-alt text-primary mb-2" />
                          <h4 className="text-uppercase m-0">Phone</h4>
                          <hr className="my-4" />
                          <div className="small text-black-50">+358 41 749 9487</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="social d-flex justify-content-center">
                    <a className="mx-2" href="#!"><i className="fab fa-twitter" /></a>
                    <a className="mx-2" href="#!"><i className="fab fa-facebook-f" /></a>
                    <a className="mx-2" href="#!"><i className="fab fa-github" /></a>
                  </div> */}
                </div>
              </section>
              {/* Footer*/}
              <footer className="footer bg-black small text-center text-white-50"><div className="container">Copyright 2020</div></footer>
              {/* Bootstrap core JS*/}
              {/* Third party plugin JS*/}
              {/* Core theme JS*/}
            </div>
          );
}}
