
# Express Basic Passport

> Express example application with API secured with HTTP Basic Authentication 


## Installation

- Clone and install dependencies `npm install` 
- Additionally you need to have a MySQL service running and configure with a database + user to access it. See db.js for example username, password and database names. Change or adapt as needed. The application will create the necessary tables into the database.


### Startup

> Start the application 

```shell
$ node index.js
```

---

## Features

> Application offers the following API routes
- /users [GET, POST]
  * GET will retrieve the usernames and id's of the uses.
  * POST will create a new user with the provided username and password.
```javascript
{
  "username": "SomeUserName",
  "password": "PasswordForTheUser"
}
```

- /hello-protected [GET]
  * Will return "Hello Protected World!" text, but requires authentication headers be sent according to HTTP Basic scheme

- /hello-unprotected [GET]
  * Will return simple "Hello World!" text.
  
  
## Components and operations

> Applicaiton used API express JS. It is small project that the charge for car. How to calculate price and how to select the items which you want to use
I use all most end points which app. You can enjoy and help fun with my project.
