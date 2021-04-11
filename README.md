# web-app-ae1
Assessment 1 Web application Development
Point of interests Assessment

Coding Part:
- To start the project from the scratch using Node.js, developer has to start with command ``npm init``.
- It will quickly set up the basic files including package-lock.json and package.json.
- The last JSON file will keep track of all installed dependencies.
- Afterwards app.js file is created to managed the back-end and be the heart of the project.
- To keep file structure clean, additional directories can be created such as template/ or public/.
- Moving to app.js, since it is the modules responsible for handling all the external and internal calls, it will require several modules to be imported such as express, mysql and body-parser.
- mysql/mariadb by default offers two accounts, guest and root, they are always created if installed.
- In this case, to prevent possible easy password breach, linux by default sets root password to "toor" or "root".
- To avoid situation when someone breaks into database, the administrator credentials are changed, as well as new account for users newly made.
- Firstly to connect to the database we need mysql connection query with details containing the following: host, user, database and in for the purpose of security password.
- This is where dotenv module comes handy offering special layer of security where the password can be stored in different file so it does not have to be exposed to others.
- Next step is to assign web addresses and methods they use.

After week 8 session:
- I have decided to change the layout from having one app.js to app.js including mysqlconn.js and users.js
- This required to change the current work a bit, split parts into 3 and apply code appriopiately.
- more env values, to keep them secure
- for testing purposes, there are endpoints which belong in app.js and others are located in the router to test capabilities of the Middleware.

** Database Set up **:
- Add new database by using command `CREATE DATABASE <db_name>`
- Add data to the database by typing in the following `mysql -u <username> -p <db_name> < <sql filename>` use -p argument if you have password set up on your account

- This database seems to be a little bit broken, if we copy paste the entire contents of it, mariadb does not print any erorr, I will have to analyse the code itself by comparing it to previous sessions, in this cases it's ht_users.sql
- I decided to try spliting the database into 3 by CREATE TABLE, I have realised I made a mistake whenever I import poi_users poi_reviews table is being dropped, I noticed the code issue imidately, afterwards I was able to have 3 tables in one database, Database name webAE, in the code I had to change the code to `use webAE;` 
Database with 3 tables is created and imported at this point

**Part A**
- Add Create app.get with address ``/poi/find/:region`` and create connection with database, in this case we need region that will be recieved from req.params.region and passed to the connetcion query
- ``/poi/add`` will create new record to pointsofinterest and if it is successful, repsond with message
- Recommendation will be based on post request where one of the value is going to be increased by 1

**Part B**
- Firstly using the resources from week 3 I will implement asynchronus ajax calls, the web page will include table with ajax, so the user can input region and click submit, this is going to trigger script and make a call to the server 2without any need of reloading
- While trying to get ajax to work I have experienced issues with JavaScript addEventListener to submit button which is activateing the script, the issue is probably caused by page loading and making a call with null value which auto breaks the script
- Skipping the issues with the previous task, I will have to prepare a table containing all the fields that are required to meet all the requirements
- Task 5 requires sending post request through ajax which is different than regular GET request.

** Part B ** - task 5 and 6 working
- task 5, Add users points of interests into the database, Firstly we need to collect all the required data from the user: name, region, type, country, longitude, latitude and description (ID is going to be auto-generated and recommendation will start from 0),
- The ajax is responsible for collecting all the data from the inputs, and pack them into one variable, later on it is going to be asynchronously fetch to the API access point and added to the database in JSON format. 
- task 6, it will require table to display all the data, at the time of writing this sentence, my plan is to make table witihn hidden div, and whenever user will search for the result, div is going to be make visiable, with all the results in it. This requires working search algorithm (which for the time being I do not possess), however, I was able to build working add recommendation button, which works. 

**Change of the plan**:
- Knowing that html can be used to display contents, I decided to change my direction and instead use ejs technology to use back-end to render the pages and display data, I find it more comfortable
ejs is included in npm as a additional module, which has to be installed


*Things to think about*:
- The same-origin policy (with CORS)
- Promises
- aync/await calls 
