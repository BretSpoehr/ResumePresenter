                        // Purpose of this page --> Primary data entry (POST method)

                                                    // requirements
import React, { Fragment, useState } from "react";
import './WelcomeParagraph.css'


                                                    // main function
const WelcomeParagraph = () => {

                                                    // Welcome HTML then <InputApplicants />
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light py-3">
                <a className="btn btn-outline-success hoverHighlight" href="http://www.spoehrsworkshop.com/">Back to Bret's Resume</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <div className="navbar-text pl-3 pr-1"> Additional Portfolio:</div>
                        </li>
                        <li className="nav-item mr-1 mb-1 mb-lg-0">
                            <a className="navbar-text btn btn-outline-info" href="http://www.spoehrsworkshop.com/DodgeGun/DodgeMainPage.html">HTML/CSS/JS</a>
                        </li>
                        <li className="nav-item">
                            <a className="navbar-text btn btn-outline-info" href="https://storeforkitties.spoehrsworkshop.com/">WordPress</a>
                        </li>
                    </ul>
                </div>
            </nav>
            
            <div className="borderWelcome pb-1">

                <div className="p-1 text-center titleBackground">
                    <h1 className="">Welcome!</h1>
                    <h4>to Bret's Resume Processor</h4> 
                    <h6>Written in PostgreSQL, Express, React, and Node</h6>
                </div>
                <div>
                    <div className="text-center">
                        <h3 className="mt-2">
                            A potential employer asked me create an API which would: 
                        </h3>
                        <ul className="list-unstyled mt-2">
                            <li>1. POST a person's resume details to a DB.</li>
                            <li>2. GET that person's name on the screen.</li>
                            <li>3. Show the resume as a popup onClick of that name.</li>
                        </ul>
                        <h5>
                            My son's arrival put all of this on hold.
                            <br></br>
                            When he got bigger I finished up and added:   

                        </h5>
                        <ul className="list-unstyled mt-2">
                            <li>- Both client and server-side field input validation.</li>
                            <li>- Alphabetical sorting on-click of "Applicants" header.</li>
                        </ul>
                        <h5 className="mt-2">
                            Extended, working Goals:
                        </h5>
                        <ul className="list-unstyled mt-2"> 
                            <li>- Give applicants capacity to add/remove additional sections before submission.</li>
                            <li>- Delete functionality: specific, multi, or all (with confirmation).</li>
                            <li>- Editable note section for reviewing manager.</li>
                        </ul>

                    </div>
                </div>

                <div className="mt-4 mb-1 text-center borderDirections">
                    <div className="text-danger my-1">
                        <h2>For Users / Employers:</h2>
                        <div className="font-weight-bold">
                            Hosting a fullstack API using Node.js requires dedicated or VPS hosting, which is prohibitively expensive. <br></br>
                            For a demonstration of this fully functional API's working features, please contact me via my resume.  Thank you.  
                        </div>
                    </div>
                    <h2>Directions:</h2>
                    <div className="">
                        Please submit your entirely made up but entry-field-appropriate resume below.  
                    </div>
                </div>
            </div>



        </Fragment>
    )
};

export default WelcomeParagraph;   // sent to app.js for client