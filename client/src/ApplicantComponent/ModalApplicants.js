//Page Purpose --> PUT for Client Side + Modal support in the JSX

import React, { Fragment, useEffect, useState } from "react";

const ModalApplicants = ({ applicant }) => {
    // we can use todo here because it is a property of EditTodo on ListTodos page
    // remember! todo = each object in the object array (json object) returned from our SQL queries
    // todo_id is the PRIMARY KEY SERIAL column of our table
    // const [updated, setUpdated] = useState(applicant);
    const [aName, setAName] = useState(applicant.applicantname);
    const [aLastName, setALastName] = useState(applicant.applicantlastname);
    const [aPhone, setAPhone] = useState(applicant.applicantphone);
    const [aEmail, setAEmail] = useState(applicant.applicantemail);
    const [job1, setJob1] = useState(applicant.jobtitle1);
    const [jobDesc1, setJobDesc1] = useState(applicant.jobdesc1);
    const [job2, setJob2] = useState(applicant.jobtitle2);
    const [jobDesc2, setJobDesc2] = useState(applicant.jobdesc2);
    const [job3, setJob3] = useState(applicant.jobtitle3);
    const [jobDesc3, setJobDesc3] = useState(applicant.jobdesc3);
    const [edu, setEdu] = useState(applicant.educationtitle);
    const [eduYear, setEduYear] = useState(applicant.educationyear);
    const [certTitle, setCertTitle] = useState(applicant.certificationtitle);
    // description is in the req.body... With the default being the todo.description from ListTodos... passed in to the main function as a parameter
    // Remember, EditTodo is a component on ListTodo, meaning this whole page is read as being on THAT page


                                    //  PUT - Client Side
    const updateApplicant = async(e) => {     // our solo event handler for the page
        e.preventDefault();     // this line only appears with PUT and POST routes
        try {
            const body = { aName, aPhone, aEmail };
            const response = await fetch(`http://localhost:5000/pathToContactTable/${applicant.applicant_id}`, {
                method: "PUT",           // this object makes it a PUT.  A fetch alone is always a GET.  
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(body)
            });

        } catch (err) {
            console.error(err.message); 
        }
    };


    return (
        <Fragment>
            {/* 
            NOTE: You do JSX comments as JS inside {} like this.  
            NOTE: {`#id${todo.todo_id}`} === id's property.id --> this targets id below
            NOTE: Modals target via #idTHIS from the data-target line.  
            */}
            <button 
                type="button" 
                className="btn btn-info" 
                data-toggle="modal" 
                data-target={`#id${applicant.applicant_id}`}
            >
                {applicant.applicantlastname}, {applicant.applicantname}
            </button>

            <div 
                className="modal fade" 
                id={`id${applicant.applicant_id}`}
                onClick={() => setAName(applicant.applicantname)}
            >
            {/* 
                NOTE: id={`id${todo.todo_id}`} === id = idNumber... number is resolution of property.IDnumber
                NOTE: that onClick resets the input to what was there before you opened it,
                        if you click outside the modal to shut the window.  used for updating functionality
                NOTE: Can't just use numbers for an ID, have to have some letters in there.
            */}

                <div className="modal-dialog modal-lg" >
                    <div className="modal-content">

                    <div className="modal-header">
                        <h4 className="modal-title container-fluid text-center">Applicant Resume</h4>
                        {/* this Edit button summons the modal to the screen */}
                        <button 
                            type="button" 
                            className="close" 
                            data-dismiss="modal"
                            onClick={() => setAName(applicant.applicantname)}
                        >
                            &times;
                        </button>
                        {/* 
                            IE: &times is the X button
                            &times evaluates to x and is used as a placeholder for text in HTML or JSX. 
                            It exists because typing a solo x in HTML confuses the machine, which sees the multiplication symbol
                        */}
                    </div>

                    <div className="modal-header">
                        <h5 className="modal-title">Contact Information</h5>
                    </div>

                    <div className="modal-body text-left ml-3">
                        <div className="border p-1 mb-2">
                            <h6 className="">Name</h6>
                            <div className="">{aLastName}, {aName}</div>
                        </div>
                        
                        <div className="border p-1 mb-2">
                            <h6 className="">Phone</h6>
                            <div className="">{aPhone}</div>
                        </div>

                        <div className="border p-1">
                            <h6 className="">e-mail</h6>
                            <div className="">{aEmail}</div>
                        </div>
                    </div>

                    <div className="modal-header">
                        <h5 className="modal-title">Work History</h5>
                    </div>

                    <div className="modal-body text-left ml-3">
                        <div className="border p-1 mb-2">
                            <h6 className="">{job1}</h6>
                            <div className="">{jobDesc1}</div>
                        </div>
                        
                        <div className="border p-1 mb-2">
                            <h6 className="">{job2}</h6>
                            <div className="">{jobDesc2}</div>
                        </div>

                        <div className="border p-1 mb-2">
                            <h6 className="">{job3}</h6>
                            <div className="">{jobDesc3}</div>
                        </div>
                    </div>

                    <div className="modal-header">
                        <h5 className="modal-title">Education</h5>
                    </div>
                    
                    <div className="modal-body text-left ml-3">
                        <div className="border p-1 mb-2">
                            <h6 className="">{edu}</h6>
                            <div className="">{eduYear}</div>
                        </div>
                    </div>

                    <div className="modal-header">
                        <h5 className="modal-title">Certifications</h5>
                    </div>

                    <div className="modal-body text-left ml-3">
                        <h6 className="border p-1 mb-2">{certTitle}</h6>
                    </div>
                    

                    <div className="modal-footer">
                        {/* this Edit button holds the event listener --> updateApplicant */}
                        <button 
                            type="button" 
                            className="btn btn-warning" 
                            data-dismiss="modal"
                            onClick={e => updateApplicant(e)}
                        >
                            Save
                        </button>

                        <button 
                            type="button" 
                            className="btn btn-danger" 
                            data-dismiss="modal" 
                            onClick={() => setAName(applicant.applicantname)}
                        >
                            Close
                        </button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default ModalApplicants;  // sent to ListApplicants
