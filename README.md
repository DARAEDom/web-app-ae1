# web-app-ae1
Assessment 1 Web application Development
Point of interests Assessment

Coding Part:
To start the project from the scratch using Node.js, developer has to start with command ``npm init``.
It will quickly set up the basic files including package-lock.json and package.json.
The last JSON file will keep track of all installed dependencies.
Afterwards app.js file is created to managed the back-end and be the heart of the project.
To keep file structure clean, additional directories can be created such as template/ or public/.
Moving to app.js, since it is the modules responsible for handling all the external and internal calls, it will require several modules to be imported such as express, mysql and body-parser.
mysql/mariadb by default offers two accounts, guest and root, they are always created if installed.
In this case, to prevent possible easy password breach, linux by default sets root password to "toor" or "root".
To avoid situation when someone breaks into database, the administrator credentials are changed, as well as new account for users newly made.
Firstly to connect to the database we need mysql connection query with details containing the following: host, user, database and in for the purpose of security password.
This is where dotenv module comes handy offering special layer of security where the password can be stored in different file so it does not have to be exposed to others.
Next step is to assign web addresses and methods they use.
