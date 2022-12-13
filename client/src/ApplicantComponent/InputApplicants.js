                        // Purpose of this page --> Entering new resumes (POST method)

// requirements
import React, { Fragment, useEffect, useState } from "react";
import ModalApplicants from "./ModalApplicants";  // to use this as a component in the JSX... gotta import it here.
import "./InputApplicants.css"


                                                    // main function
const InputApplicants = () => {
                                                    //useStates
    const [aName, setAName] = useState("John");
    const [aLastName, setALastName] = useState("Doe");
    const [aPhone, setAPhone] = useState("9047875252");
    const [aEmail, setAEmail] = useState("JohnDoe@site.com");
    const [job1, setJob1] = useState("Web Developer");
    const [jobDesc1, setJobDesc1] = useState("Multiple bullet points of excellence");
    const [job2, setJob2] = useState("Physical Therapist");
    const [jobDesc2, setJobDesc2] = useState("Multiple bullet points of excellence");
    const [job3, setJob3] = useState("Gamer");
    const [jobDesc3, setJobDesc3] = useState("Multiple bullet points of excellence");
    const [edu, setEdu] = useState("Doctorate in Being Fantastic");
    const [eduYear, setEduYear] = useState("1908");
    const [certTitle, setCertTitle] = useState("Certified in Amazon Web Wizard Magic");
    
    const [applicants, setApplicants] = useState([]);
    const [errors, setErrors] = useState({errors: []});

    const [order, setOrder] = useState("ASC");
    const [arrow, setArrow ] = useState("↓")
    const [isChecked, setIsChecked] = useState([]); // --> start from 6:44 in https://www.youtube.com/watch?v=FuXRhUmRxGQ&ab_channel=DevOpsDeveloper


// VALIDATION functions
function validateName(nameInput) {
    var re = /^([ \u00c0-\u01ffa-zA-Z'\-])+$/;       
    return re.test(nameInput);
}

// phone --> ALTER TABLE TO ALLOW only ten CHARACTERS TO PHONE NUMBER
function validatePhoneNumber(input_str) {
    var re = /^\d{10}$/;
    return re.test(input_str);
}
//email 
function validateEmail(emailInput){
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    // NOTE: email validation is correctly done through confirmation emails.  This is an exercise in consistency of error displays.  
    return re.test(emailInput);
}

// year
function validateYear(yearInput){
    const yearLength =  yearInput.toString().length;
        // console.log(`${yearLength} yearLength digits`);  <-- error checking
    if (yearInput >= 0 && yearInput <= 2500 && yearLength === 4 ) {
        console.log(`validateYear() output is  ${yearInput} true.  logged at validateYear()`);
        return true;
    } else {
        console.log(`validateYear() output is  ${yearInput} false.  logged at validateYear()`);
        return false;
    }
}
    
                                                    // POST - Client Side
    const onSubmitForm = async (e) => {     // This is the Event Handler.  The listener is the onChange in the JSX below.
        e.preventDefault();     //this prevents this submission from "refreshing" + only appears with PUT and POST routes


                                            //PROBLEM --> THIS IS REPETATIVE --> SIMPLIFY.//
//ERROR CHECKS with error messages on screen prior to POST sending
//name first
        var firstName = document.getElementById('firstNameInput').value;
        if (validateName(firstName)) {
            document.getElementById('firstName_error').classList.add('hidden');
        } else if (!validateName(firstName)){
            document.getElementById('firstName_error').classList.remove('hidden');
        }
//name last
        var lastName = document.getElementById('lastNameInput').value;
        if (validateName(lastName)) {
            document.getElementById('lastName_error').classList.add('hidden');
        } else if (!validateName(lastName)){
            document.getElementById('lastName_error').classList.remove('hidden');
        }
//phone
        var phone = document.getElementById('phoneInput').value;
        if (validatePhoneNumber(phone)) {
            document.getElementById('phone_error').classList.add('hidden');
        } else if (!validatePhoneNumber(phone)){
            document.getElementById('phone_error').classList.remove('hidden');
        }
//email
        var email = document.getElementById('emailInput').value;
        if (validateEmail(email)) {
            document.getElementById('email_error').classList.add('hidden');
        } else if (!validateEmail(email)){
            document.getElementById('email_error').classList.remove('hidden');
        }
//year
        var year = document.getElementById('yearInput').value;
        if (validateYear(year)){
            document.getElementById('year_error').classList.add('hidden');
        } else if (!validateYear(year)){
            document.getElementById('year_error').classList.remove('hidden');
        }
        //submit error message next to submit button
        if (!validatePhoneNumber(phone) || !validateYear(year) || !validateEmail(email) || !validateName(firstName) || !validateName(lastName)){
            document.getElementById('submit_error').classList.remove('hidden');
            setErrors({errors: []}); // set backend errors to null, no worries, they'll respawn on the POST submit
            return console.log("POST submission invalidated by a client side check.  logged at submit button JS sequence.")
        } else {
            document.getElementById('submit_error').classList.add('hidden');
        }
    //actual POST sending placed here
    try {
        const body = { aName, aLastName, aPhone, aEmail, job1, jobDesc1, job2, jobDesc2, job3, jobDesc3, edu, eduYear, certTitle };
        const response = await fetch("http://localhost:5000/pathToContactTable", {     //without putting in the await you get --> Promise {<pending>}
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }).then(response => {
            // check if received an OK response, throw error if not
            if (!response.ok) {
                return response.json();
            } 
        }).then(jsonData => {
            console.log("Error response object is:", jsonData);    //  {errors: Array(2)}
            setErrors(jsonData);                                    
        });

        getApplicants();


        } catch (err) { 
            console.log('this line fires in catch block of client POST')
            console.error(err.message);
        }   
    };



    const deleteApplicant = async (id) => {
        try {
            const deleteApplicant = await fetch(`http://localhost:5000/pathToContactTable/${id}`, {
                method: "DELETE"
            });
            // notice that you can put const deleteX INSIDE const deleteX and they AREN'T the same due to scope. 
            // avoid that.
            // This requires a refresh of the page to be seen to take effect... fortunately, setState does that -->
            setApplicants(applicants.filter(applicant => applicant.applicant_id !== id));
            // you use filter() so applicants is set to all applicant NOT matching the id you want to delete

            //console.log(deleteX); //<-- debug check
        } catch (err) {     // standard catch caboose --> pops out standard error messages like 200, 404, etc.
            console.error(err.message);   
        }
    }   

    const getApplicants = async() => {
        try {
            // fetch does a get request by default
            const response = await fetch("http://localhost:5000/pathToContactTable")
            //this is going to return json data, so we have to parse it, which also takes time (await) -->
            const jsonData = await response.json(); // this gives us back the array of doom I couldn't solve before
            // ERROR SOLVE: if f12 shows promise pending on the return you forgot to use "await"

            setApplicants(jsonData);
            

        } catch (err) {
            console.error(err.message)
        }
    };
    
    useEffect(() => {
        getApplicants();
        setApplicants(                          //sam lama's video
            applicants.map(applicant => {
              return {
                select: false,
                id: applicant.applicant_id
              };
            })
          );
    }, []);     // the [] on the end means only one proc occurs per change, not infinite.
    // useEffect makes a fetch request to the RESTful API every time the page is rendered... with [] just once each.


    // Table Sorting Function
    const sorting = (col) => {
        
        if (order === "ASC"){
            const sorted = [...applicants].sort((a,b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setArrow('↓');
            setApplicants(sorted);
            setOrder("DSC");
            
        }
        if (order === "DSC"){
            const sorted = [...applicants].sort((a,b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setArrow('↑');
            setApplicants(sorted);
            setOrder("ASC");
        }
    };


    {/*sam lama's youtube video... I couldn't make this work*/}
    const handledeletechecked = (applicant) => {
        if (applicant) {
            deleteApplicant(applicant.applicant_id);
        }
    };

        //Devops Developer youtube video
    const handlecheckbox = (e) => {
        //value = applicant.applicant_id
        //checked = applicant.isChecked
        const { value, checked } = e.target;
        if (checked) {
            setIsChecked([...isChecked, value]);
        } else {
            setIsChecked(isChecked.filter((e) => e !== value));
        }
    };

    const handleAllDelete = async() => {
        console.log(isChecked);
        getApplicants();

        for (let i =0; i < isChecked.length; i++) {
            console.log(isChecked[i]);
        }
    };

     


                                                    // Inputs + Table readout below
    return (
        <Fragment>
{/* RESUME INPUT */}
            <form id="resumeEntryForm" className="container-fluid resumeInputGlobal" onSubmit={onSubmitForm}>
                <h3>Contact Information</h3>

                <div className="inputSections">
                    <div className="row">                
                        <div className="col">
                            <h6 className="text-dark">First Name:</h6>
                            <input 
                                id="firstNameInput"
                                type="text" 
                                className="form-control inputFields" 
                                minLength="1"
                                maxLength="50"
                                value={aName} 
                                onChange={e => setAName(e.target.value)}
                                required
                            />
                        <div id="firstName_error" className="error hidden">Only letters, dash, apostrophe, and spaces in name please.</div>
                        </div>
                        <div className="col">
                            <h6 className="text-dark">Last Name:</h6>
                            <input 
                                id="lastNameInput"
                                type="text" 
                                className="form-control inputFields" 
                                minLength="1"
                                maxLength="50"
                                value={aLastName} 
                                onChange={e => setALastName(e.target.value)}
                                required
                            />
                        <div id="lastName_error" className="error hidden">Only letters, dash, apostrophe, and spaces in name please.</div>
                        </div>
                    </div>

                    <div className="">
                        <h6 className="text-dark">Phone:</h6>
                        <input 
                            id="phoneInput"
                            type="" 
                            className="form-control inputFields" 
                            minLength="10" maxLength="10"
                            value={aPhone} 
                            onChange={e => setAPhone(e.target.value)}
                            required
                        />
                        <div id="phone_error" className="error hidden">Please enter a valid phone number.</div>
                    </div>

                    <div className="">
                        <h6 className="text-dark">Email:</h6>
                        <input 
                            id="emailInput"
                            name="emailInput"
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="50"
                            value={aEmail} 
                            onChange={e => setAEmail(e.target.value)}
                            required
                        />
                        <div id="email_error" className="error hidden">Please enter a valid email.</div>
                    </div>
                </div>

                <h3>Work History</h3>
                <h6>Most recent to least, please:</h6>
                <div className="inputSections">
                    <h6 className="text-dark">Title:</h6>
                        <input 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="50"
                            value={job1} 
                            onChange={e => setJob1(e.target.value)}
                        />

                    <h6 className="text-dark">Responsibilities:</h6>
                        <textarea 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="500"
                            value={jobDesc1} 
                            onChange={e => setJobDesc1(e.target.value)}
                            rows={4}
                        /> 

                    <h6 className="text-dark">Title:</h6>
                        <input 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="50"
                            value={job2} 
                            onChange={e => setJob2(e.target.value)}
                        />

                    <h6 className="text-dark">Responsibilities:</h6>
                        <textarea 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="500"
                            value={jobDesc2} 
                            onChange={e => setJobDesc2(e.target.value)}
                            rows={4}
                        /> 
                
                    <h6 className="text-dark">Title:</h6>
                        <input 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="50"
                            value={job3} 
                            onChange={e => setJob3(e.target.value)}
                        />

                    <h6 className="text-dark">Responsibilities:</h6>
                        <textarea 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="1"
                            maxLength="500"
                            value={jobDesc3} 
                            onChange={e => setJobDesc3(e.target.value)}
                            rows={4}
                        /> 
                </div>


                <h3>Education</h3>
                <div className="inputSections">
                    <h6 className="text-dark">Highest Degree and Type:</h6>
                    <input 
                        type="text" 
                        className="form-control inputFields" 
                        minLength="1"
                        maxLength="100"
                        value={edu} 
                        onChange={e => setEdu(e.target.value)}
                        required
                    /> 
                <h6 className="text-dark">Year:</h6>
                    <input 
                        id="yearInput"
                        type="text" 
                        className="form-control inputFields" 
                        maxLength="4"
                        value={eduYear} 
                        onChange={e => setEduYear(e.target.value)}
                        required
                    /> 
                    <div id="year_error" className="error hidden">Please enter a valid year.</div>
                </div>
                

                <h3 className="">Certifications and Skills</h3>
                <div className="inputSections">
                    <h6 className="text-dark">Certifications:</h6>
                        <input 
                            type="text" 
                            className="form-control inputFields" 
                            minLength="0"
                            maxLength="100"
                            value={certTitle} 
                            onChange={e => setCertTitle(e.target.value)}
                        /> 
                </div>
                
                <div className="d-flex">
                    <button className="btn btn-success my-1 p-2" type="submit">Submit</button>
                    <div>
                        <div id="submit_error" className="error hidden ml-2 align-middle">Submission not Accepted.  Please resolve errors to continue.</div>
                        <div className="error pl-2">
                            {errors && errors.errors.map((err, index) => (
                                <div key={index}>
                                    {err.msg}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </form>




{/* TABLE */}

            <table className="table table-sm table-hover text-center mt-5 tableBorder">
                <thead className="anchorStyle">
                    <tr>
{/* Devops Developer video, button -- working on checkboxes for deletions*/}
                        <th>
                            <button className="btn btn-warning" onClick={handleAllDelete}>Delete Selected</button>
                        </th>
                        
                        <th 
                            className="ButtonForTableSort" 
                            onClick={() => sorting("applicantlastname")}
                        >
                            Applicant {arrow}
                        </th>
                        <th 
                            className="columnHeaderForRemove"
                        >
                            Delete 
                        </th>
                        <th>
                            {/*sam lama's video -- working on checkboxes for deletions
                            <input
                                type="checkbox"
                                onChange={e => {
                                    let checked = e.target.checked;
                                    setApplicants(
                                        applicants.map(applicant => {
                                            applicant.select = checked;
                                        return applicant;
                                        })
                                    );
                                }}
                            ></input>
                            <button 
                                className="btn btn-danger" 
                                onClick={() => handledeletechecked()}
                            >
                                Mass Delete
                            </button>
                            */}
                        </th>
                    </tr>
                </thead>


                <tbody className="">
                    {/* 
                        In a map, each data point must be unique, thus a key must be assigned.  So, we use applicant_id.
                        applicant_id is the primary key of the table we are using and its name is such for communication.  It could be named TomatoSheep but its purpose would be harder to deduce.  
                        applicant = each object in the array of objects which is applicants, 
                        which is (jsonData) returned from getTodos... made into an array in the .map() below.  
                        This map function sets each object in the array to its own row.  
                    */}
                    {applicants.map(applicant => (
                        <tr key={applicant.applicant_id}> 
                            <td>
{/*    Devops Developer youtube channel   -- working on checkboxes for deletions */}
                                <input 
                                    type='checkbox' 
                                    value={applicant.applicant_id} 
                                    checked={applicant.isChecked} 
                                    onChange={(e)=>handlecheckbox(e)}
                                >
                                </input>
                            </td>


                            <td>
                                <ModalApplicants applicant={applicant}/>
                                
                                {/*
                                Placing EditApplicants here as a component is a HUGE chunk of code.  It is the entire EditApplicants page.
                                We plop this in an a component because it holds a modal, which is an absolute monster of a code chunk.
                                This line adds applicant as a property to EditApplicants, 
                                and thereby allows its use as a parameter of EditApplicants on EditApplicants.js. 
                                */}
                            </td>

                            <td>
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => deleteApplicant(applicant.applicant_id)}
                                >
                                    Remove
                                </button>
                            </td>
{/*sam lama's youtube video -- working on checkboxes for deletions
                            <td>
                                <input
                                    onChange={event => {
                                        let checked = event.target.checked;
                                        setApplicants(
                                            applicants.map(applicantSpecific => {
                                                if (applicant.applicant_id === applicantSpecific.applicant_id) {
                                                    applicantSpecific.select = checked;
                                                }
                                                return applicantSpecific;
                                            })
                                        );
                                    }}
                                    type="checkbox"
                                    checked={applicant.select}
                                ></input>
                            </td>
*/}

                        </tr>
                    ))}
                </tbody>
            </table>    
        </Fragment>
    )
};

export default InputApplicants;   // sent to InputTodo.js for client side