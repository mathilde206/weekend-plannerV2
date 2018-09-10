[![Build Status](https://travis-ci.org/mathilde206/weekend-planner-django-only.svg?branch=master)](https://travis-ci.org/mathilde206/weekend-planner-django-only)

# The Weekend Planner
 
## Overview
The application is deployed here: https://europe-weekend-planner.herokuapp.com/

### What is this app for?

This app will provide travel recommendations for short weekends and sell travel planning services.   

### What does it do?
Users will be able to see and search for itineraries.
They will have the possibility to contribute by adding their own recommendations.
Finally, they can buy travel planning services from myself. 

## Features

### Existing Features
Users are able to: 
- Search for itineraries and filter by name, duration of the trip and budget. 
- Register and login to the app. 
- Create and edit their profile.
- See profiles from other users. 
- Create, update and delete their own itineraries.
- Like Itineraries. 
- Order a planning service from the site. 

### Features to Implement
-To implement: 
  - send an email to confirm order
  - add a list of orders page 
  - option to delete an account
  - retrieve password

-Nice to have: 
  - Add a comment
  - See the list of itineraries that were liked
  - Add more filtering options: upvotes, number of views
  - See the list of recommendations created by a user. 

 
## Tech Used
### Some the tech used includes:
- [Django](https://www.djangoproject.com/)
    - **Django** handles the backend
- [Django](http://www.django-rest-framework.org/)
    - **Django Rest Framework** is used for the APIs
- [JWT] (https://jwt.io/introduction/)
    - **Json Web Token** is the technology used for authentication
- [ReactJS](https://reactjs.org/) and [Redux](https://redux.js.org/)
    - I use **ReactJS**, **Redux**, and their ecosystem for the frontend
- [ReactJS](https://reactjs.org/) and [Redux](https://redux.js.org/)
    - I use **ReactJS**, **Redux**, and their ecosystem for the frontend
- [React-Strap](https://reactstrap.github.io/)
    - **React-Strap** to support the design of the app and help with the responsiveness.
 

## Testing
- I included unit tests in my django apps whenever necessary ie custom functions
- I am using coverage to ensure that my test coverage is sufficient
- I am using Travis for continuous integration. 

## Contributing
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone https://github.com/mathilde206/weekend-planner``` command
2. Then you need to install all the dependencies from the requirements.txt file:
  ```
  pip install -r requirements.txt

  ```
3. You will need to generate a secret key for django to work
3. To start the application : ```python3 manage.py runserver```
4. To build the frontend, start by doing ```npm install``` to install the dependencies.
5. Then  ```npm run collect``` will build the bundle and do django collect. 
4. Make changes to the code and if you think it belongs in here then just submit a pull request

### Contribute to the content
Feel free to register to the site and start adding recommendations.
