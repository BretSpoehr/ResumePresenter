CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

/* My starting applicantContactTable */
CREATE TABLE applicantContactTable(
    applicant_id SERIAL PRIMARY KEY,
    applicantName VARCHAR(100) NOT NULL,
    applicantPhone CHAR(11) NOT NULL,
    applicantEmail VARCHAR(50) NOT NULL
);

/* I used this to update the applicantContactTable */
ALTER TABLE applicantContactTable 
ADD applicantLastName VARCHAR(100) NOT NULL DEFAULT '',
ADD jobTitle1 VARCHAR(50) NOT NULL DEFAULT '',
ADD jobDesc1 VARCHAR(500),
ADD jobTitle2 VARCHAR(50) NOT NULL DEFAULT '',
ADD jobDesc2 VARCHAR(500),
ADD jobTitle3 VARCHAR(50) NOT NULL DEFAULT '',
ADD jobDesc3 VARCHAR(500),
ADD educationTitle VARCHAR(100) NOT NULL DEFAULT '',
ADD educationYear CHAR(4),
ADD certificationTitle VARCHAR(100) NOT NULL DEFAULT '';


/* I used this to update the applicantContactTable */
ALTER TABLE applicantContactTable 
DROP COLUMN IF EXISTS applicantLastName,
DROP COLUMN IF EXISTS jobTitle1,
DROP COLUMN IF EXISTS jobDesc1,
DROP COLUMN IF EXISTS jobTitle2,
DROP COLUMN IF EXISTS jobDesc2,
DROP COLUMN IF EXISTS jobTitle3,
DROP COLUMN IF EXISTS jobDesc3,
DROP COLUMN IF EXISTS educationTitle,
DROP COLUMN IF EXISTS educationYear,
DROP COLUMN IF EXISTS certificationTitle;


/* updated applicantContactTable */
CREATE TABLE applicantContactTable(
    applicant_id SERIAL PRIMARY KEY,
    applicantFirstName VARCHAR(100) NOT NULL,  
    applicantLastName VARCHAR(100) NOT NULL,
    applicantPhone CHAR(11) NOT NULL,
    applicantEmail VARCHAR(50) NOT NULL,
    jobTitle1 VARCHAR(50) NOT NULL,
    jobDesc1 VARCHAR(500),
    jobTitle2 VARCHAR(50) NOT NULL,
    jobDesc2 VARCHAR(500),
    jobTitle3 VARCHAR(50) NOT NULL,
    jobDesc3 VARCHAR(500),
    educationTitle VARCHAR(100) NOT NULL,
    educationYear INT(4),
    certificationTitle VARCHAR(100) NOT NULL
);


/* rough drafts for seperated tables */
CREATE TABLE applicantEduTable(
    education_id SERIAL PRIMARY KEY,
    educationTitle VARCHAR(100) NOT NULL,
    educationYear INT(4)
);

CREATE TABLE applicantCertTable(
    certificatoin_id SERIAL PRIMARY KEY,
    certificationTitle VARCHAR(100) NOT NULL
);

/* 
PURPOSE OF THIS PAGE:
This page is copy-pasted into the CLI to build the database and then the table we are using.
It is not referenced inside the API after that. 
Again, this is purely for easy of contruction as CLI is a krangled nightmare to write this out.  

SERIAL is very handy (mandatory?) to put in a table's primary key, since it increments the ID for each new post or put.  
*/