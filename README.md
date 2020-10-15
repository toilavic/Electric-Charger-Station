# Electric-Charger-Station
Electric Charger Station build with ReactJS and ExpressJS

Website: http://pluggers-dupham-thangnguyen-123.s3-website-us-east-1.amazonaws.com/

## What is it?

You are to use ReactJs and Express to implement a web application for an imaginary electric car charger network provider. The business of this company is to provide electric car chargers across the country. They need an application which their customers can use.

The basic functionality of the application is to provide information of the charger locations, status and pricing to the customers. The customer can use the application to start and stop the charging of his car when plugged in and then be billed of the charge.

---

## Table of Contents

- [Function](#Function)
- [Instruction](#Instruction)

---

## Function

· User login system which authenticates and authorizes users to access the system

  - User should be able browse the charger locations, status and general information without logging in

  - Login is required to start the charging process

· Start charging once the user has connected his car to a charger

  - The charge process is started by entering a four digit string to the system to indicate which charger the customer wants to use (“A4CV” for example). The application should display this four digit code and the code would be visible in the charge station as well.

· Monitor the ongoing charge and its costs

· Stop charging

· Browse available chargers ideally on a map (alternatively as a list of some sort) - Display at least 20 charging locations in Finland

  - In both cases there should be a search functionality by the location / charger name

  - Information of the charger type and its status should be visible easily to the user

§ Status (Free, Taken)

· View previous charges and their costs

  - Display date and time information, charger location, its information, charge time, energy used and cost

  - The actual payment of the charges is not covered by this application

## Instruction

after clone the project then change those files below:
- constant.js (Client)
- db.js (Server)
