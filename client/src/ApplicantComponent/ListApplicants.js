                                                // NOTE
           // I added this page directly to InputApplicants.js for POST update onSubmit functionality

                                                //Page Purpose
// DELETE and GET are built below... they route the path from the front end, reply with a json object.
// the json object (array of objects) is set to a useState,
// then mapped to a table in the JSX via that useState.  
                                                
                                                // requirements
import React, { Fragment, useEffect, useState } from "react";
                                                // components
import ModalApplicants from "./ModalApplicants";  // to use this as a component in the JSX... gotta import it here.

                                                // 
const ListApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    // This line is the bridge to the JSX in the return... 
    // we use setTodos in the routes to determine todos, then todos is mapped in the JSX

                                                // DELETE FUNCTION (this is repeated on the inputApplicants page... not ok)
    const deleteApplicant = async (id) => {
        try {
            const deleteApplicant = await fetch(`http://localhost:5000/pathToContactTable/${id}`, {
                method: "DELETE"
            });
            setApplicants(applicants.filter(applicant => applicant.applicant_id !== id));

        } catch (err) {     // this entire catch error chunk seems like boilerplate --> standard error messages like 200, 404, etc.
            console.error(err.message);   
        }
    };   

                                                // GET FUNCTION
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
    }, []);     // the [] on the end means only one proc occurs per change, not infinite.
    // useEffect makes a fetch request to the RESTful API every time the page is rendered... with [] just once each.

    return (
    <Fragment>
        {""}
        <table className="table table-sm table-hover border mt-5 text-center">
            <thead className="thead-light">
                <tr>
                    <th>Applicant</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody className="">
                {applicants.map(applicant => (
                    <tr key={applicant.applicant_id}> 
                        <td>
                            <ModalApplicants applicant={applicant}/>
                        </td>

                        <td>
                            <button 
                                className="btn btn-danger"
                                onClick={() => deleteApplicant(applicant.applicant_id)}
                            >
                                Delete
                            </button>
                        </td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
    </Fragment>
    )
};

export default ListApplicants;   //sent to InputTodo.js before --- now sent to InputApplicants.js

