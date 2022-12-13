                                          //
import React, { Fragment } from "react";
import './App.css';


                                          // COMPONENTS
import WelcomeParagraph from "./components/WelcomeParagraph";
// NOTE: this is used below as if it is a react component... its actually a const with an arrow function assigned...
import InputApplicants from "./ApplicantComponent/InputApplicants";


function App() {
  return (
    <Fragment>
      <div className="container">
        <WelcomeParagraph /> 
        <InputApplicants/>

      </div>
    </Fragment>
  )
}

export default App; // sent to index.js for client
