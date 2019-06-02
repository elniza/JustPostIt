# JustPostIt

This project is a comments system which logged-in users can write posts and others can comment.

## Technologies and main dependencies

* MEAN stack (MongoDB, Express.js, Angular, Node.js)
* jsonwebtoken - Authorization token
* bcryptjs - Password hashing

## Prerequisites

You need to install first:
* Node.js and npm - https://nodejs.org/en/ (preferable 8.11.3)
* Angular - run this command:
```
npm install -g @angular/cli@7.2.0
```
* MongoDB - 'https://www.mongodb.com/download-center'

## Get the code
You can download the zip file from this repository, or otherwise download & install Git from https://git-scm.com/ and use those commands: 
```
git clone https://github.com/elniza/JustPostIt.git justPostIt  
cd justPostIt
```

## Run

run these commands:
```
npm install
```
it will install the dependencies in package.json.
```
node app.js
```
it will run the Backend server.

Open another terminal and run:
`npm start` or `ng serve` - runs the dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.


