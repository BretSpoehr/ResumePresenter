const express = require("express");
const app = express();
const cors = require("cors");   // standard inter-page security package
const pool = require("./db");
const bodyParser = require('body-parser');
const { body, validationResult, check } = require('express-validator');
const { response } = require("express");



                                    // MIDDLEWARE
app.use(cors());
app.use(express.json()); // <-- "gives access to "request body" or "req.body" which gets us json data...
// full stack API requires data from the client side and you get it through --> app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





                                    // ROUTES //
            // POST, get all, get one, PUT, DELETE... todo table, then applicantTable
                                    // POST
                                    // todo POST
app.post("/todos", async (req, res) => {
    // the pathway name is totally arbritrary.  IT ONLY HAS TO MATCH THE FRONT END PATH TO WORK.
    try {
        // console.log(req.body);   <-- used with f12 to check console output of the webpage (purely for debugging)
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );
        // INSERT INTO is how we add anything in PostgreSQL
        // INSERT, UPDATE, DELETE you can use RETURNING * to see, then possibly manipulate, what you just did.  
        res.json(newTodo.rows[0]);  // "means accessing the first element in the array"
        // .rows is used to specify you JUST want rows, not a ton of other things that are in the newTodo object.
    } catch (err) {
        console.error(err.message);
    }
});
/* 
const validate = validations => {
    
    return async (req, res, next) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (result.errors.length) break;
      }
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      res.status(400).json({ errors: errors.array() });
    };
  };

      validate([
        // when I put in the checks it crashes the server... which is express
        // body(emailInput).isEmail()
        // above the error is that aEmail is "not defined"... how do i get it to be defined?
    ])
*/
                                    // applicantTable POST



const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            myLocation: error.location,
        };
    },
});

app.post("/pathToContactTable", 
    [
        check('aName')
            .trim().exists({checkFalsy: true}).withMessage('Name must be at least two letters long.').bail()
            .isLength({ min: 2 }).withMessage('Name must be at least two letters long.').bail()
            .isString().withMessage('Name must be letters with apostrophe or dash.'),
        check('aLastName')
            .trim().exists({checkFalsy: true}).withMessage('Name must be at least two letters long.').bail()
            .isLength({ min: 2 }).withMessage('Name must be at least two letters long.').bail()
            .isString().withMessage('Name must be letters with apostrophe or dash.'),
        check('aPhone')
            .isNumeric().withMessage('Phone number must be 10 digits.').bail()
            .isLength({min: 10, max: 10}).withMessage('Phone number is required and must be 10 digits.').bail(),
        check('aEmail')
            .trim().notEmpty().withMessage('Please enter your email.').bail()
            .isEmail().withMessage("Please enter a valid email.").bail(),
        check('job1')
            .not().isEmpty().trim().escape().withMessage("Please enter first (most recent) Work History Title Section.").bail(),
        check('jobDesc1')
            .not().isEmpty().trim().escape().withMessage("Please enter first (most recent) Work History Responsibilities Section.").bail(),
        check('job2')
            .trim().escape().bail(),
        check('jobDesc2')
            .trim().escape().bail(),
        check('job3')
            .trim().escape().bail(),
        check('jobDesc3')
            .trim().escape().bail(),
        check('edu')
            .exists({checkFalsy: true}).trim().escape().withMessage("Please enter highest degree and type.").bail(),
        check('eduYear')
            .isNumeric().withMessage('Numbers only please.').bail()
            .isLength({min: 4, max: 4}).withMessage('Four digits please.').bail(),
        check('certTitle')
            .trim().escape()
    ],
    async (req, res, next) => {
        const { aName, aLastName, aPhone, aEmail, job1, jobDesc1, job2, jobDesc2, job3, jobDesc3, edu, eduYear, certTitle } = req.body;
        console.log(req.body.aName);  // prints out exactly what it should
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("next line from server");
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });


        } else {

            try {

                const newApplicant = await pool.query(`INSERT INTO applicantContactTable 
                ( applicantName, applicantLastName, applicantPhone, applicantEmail, jobTitle1, jobDesc1, jobTitle2, jobDesc2, jobTitle3, jobDesc3, educationTitle, educationYear, certificationTitle) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
                    [aName, aLastName, aPhone, aEmail, job1, jobDesc1, job2, jobDesc2, job3, jobDesc3, edu, eduYear, certTitle]
                );
                
                res.json(newApplicant.rows[0]);  // "means accessing the first element in the array"
                // .rows is used to specify you JUST want rows, not a ton of other things that are in the response object.
            } catch (err) {
                console.error(err.message);
            }
        }
});



                                    // GET (all)
                                    // todo 
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);            // this is the line that is being awaited on the front end (ListTodos.js)
    } catch (err) {
        console.error(err.message);
    }
});
                                    // applicantTable
app.get("/pathToContactTable", async(req, res) => {
    try {
        const allApplicants = await pool.query("SELECT * FROM applicantContactTable");
        res.json(allApplicants.rows);            // this is the line that is being awaited on the front end (ListTodos.js)
    } catch (err) {
        console.error(err.message);
    }
});


                                    // GET a specific target
                                    // todo 
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;      // { id : number } <--- id is in code path, number is from the web page URL
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});
                                    // applicantTable
app.get("/pathToContactTable/:id", async (req, res) => {
    try {
        const { id } = req.params;      // { id : number } <--- id is in code path, number is from the web page URL
        const applicant = await pool.query("SELECT * FROM applicantContactTable WHERE applicant_id = $1", [id]);
        res.json(applicant.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});

                                    // PUT (update) request from EditTodo
                                    // todo
app.put ("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;          // so for { id : number } ... this line should equal number
                                            // IE, we could name id anything we want, as long as it was consistent
        const { description } = req.body;   // description PUT out in the req.body from EditTodo and deconstructed out here
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", 
            [description, id]
        );
        res.json("Todo was updated");   // this is for testing via Postman
    } catch (err) {
        console.error(err.message)
    }
});
                                    // applicantTable 
                                    // THIS MUST BE UPDATED WHEN NEEDED
app.put ("/pathToContactTable/:id", async (req, res) => {
    try {
        const { id } = req.params;          // so for { id : number } ... this line should equal number
                                            // IE, we could name id anything we want, as long as it was consistent
        const { aName, aPhone, aEmail } = req.body;   // description PUT out in the req.body from EditTodo and deconstructed out here
        const updateApplicant = await pool.query(`UPDATE applicantContactTable SET applicantName = $1, 
            applicantPhone = $2, applicantEmail = $3 WHERE applicant_id = $4`, 
            [aName, aPhone, aEmail, id]
        );
        res.json("Applicant has updated");   // this is for testing via Postman
    } catch (err) {
        console.error(err.message)
    }
});

                                    // DELETE
                                    // todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // const { description } is not needed because are deleting, not adding or updating
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
            [id]
        );
        res.json("Todo was deleted!");  // this is for testing via Postman
    } catch (err) {
        console.log(err.message)
    }
});
                                    // applicantTable
app.delete("/pathToContactTable/:id", async (req, res) => {
    try {
        const { id } = req.params;
        // const { description } is not needed because are deleting, not adding or updating
        const deleteApplicant = await pool.query("DELETE FROM applicantContactTable WHERE applicant_id = $1", 
            [id]
        );
        res.json("Applicant was deleted!");  // this is for testing via Postman
    } catch (err) {
        console.log(err.message)
    }
});



                                    // SERVER
app.listen(5000, () => {
    console.log("server has started on port 5000");
});