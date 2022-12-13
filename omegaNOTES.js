/*
RESUME PRESENTER
What is backend validation? --> either self-written JS to ensure data is clean and appropriate...
or you just use a validator package already written out by somebody else, which is 1000x faster. 


SECURITY CONCERNS
If the form has a name field, you want to make sure that it’s not empty, it’s a string, and that it meets a minimum length requirement.

NOTE: sanitization is best done before outputting back to the screen.
NOTE: input sanitizaton risks altering data into an unusable state.  


*/