/*
RESUME PRESENTER
What is backend validation? --> WHAT IS BACKEND VALIDATION?


SECURITY CONCERNS
If the form has a name field, you want to make sure that it’s not empty, it’s a string, and that it meets a minimum length requirement.


sanitization is best done before outputting back to the screen.
input sanitizaton risks altering data into an unusable state.  


BACKGROUND General
REST architectural style --> you can change server or client code without breaking the other side.  




INPUT VALIDATION
getApplicants() now functions.  
postApplicants() has issues.  
    ++ 
    Client side validation functions.  
    -- 
    Making a post crashes the server AND doesn't refresh the page.  


Confusion! --> input validation seems to show up either seperately from the app.post()... 
or inside of it with no reference to the SQL query INSERT to make the fucking POST.  
...unless that's what the create() function I keep seeing does.  



tactics --> 
...start over, bring in the entire library as a requirement?
...build validator function(s) and pass them in as parameters?  Is this mandatory for some under the hood reason not listed?


TEMPLATES
email --> .isEmail()
numbers --> .not().isEmpty().isInt().withMessage('numbers only please')




*/