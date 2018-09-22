[![Build Status](https://travis-ci.org/mathilde206/weekend-planner-django-only.svg?branch=master)](https://travis-ci.org/mathilde206/weekend-planner-django-only)

# The weekend planner

When you live in Europe, you have the chance to be a few hours away to many great cities and places, making it possible and easy to frequently travel on the weekends. 
But it's not always easy to know where to go, and planning everything requires a lot of time: what to do, when, where to find ideas where to go.
This app is the solution. It provide travel recommendations for short weekends and offers travel planning services, for visitors who really don't want to spend too much time planning.
 
## UX

About the UX Process: 
The idea came from my own experience of traveling in Europe. I often end up looking for what to do at the last minute on the train or at the airport. 
There are many itineraries around the web, but usually not in one place. You can also never be sure if the activities are in your price range and you have to go throug several website before you find something you like. 
 
The website is targeting people living in Europe, who like to travel but don't have enough time to plan their trips.  
- As a traveler, I want discover cities, so that I can have ideas where to go. I want to select itineraries according to my budget and see the type of activities I can do so I can choose my next trip wisely.
- As a contributor, I want to share my knowledge about my cities and help people explore the cities I like and know, so that I can gain visibility (through likes and number of views). 
- As a buyer, I want to buy the planning services, so that I can save time and get a personalized trip. 

Designing the project: 
- I drew all the screens and mockups on regular paper (see [here](https://github.com/mathilde206/weekend-plannerV2/blob/master/Weekend%20Planner%20Design%20-%20mockups.pdf))
- I chose the colors with the help of [material color tool] (https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=B3E5FC&secondary.color=FFD180)
- I designed a first version of the form with all the fields to enter in one page, which I thought was a little overwhelming, hence my attempt to make the form in several screens.

## Features
 
### Existing Features
- Login and Register - allow a user to create an account and then login.
- Reset your password - allow a user to reset a password by requesting an email with a reset link.
- Exploring Itineraries - allows the user to see the list of itineraries and to filter it, through specific filters on the "Explore" page or with a generic search on the home page
- See the itinerary's details - allow a user to see the details, to like and unlike and see who wrote the itinerary.
- Create an itinerary - allow an authenticated user to create a new itinerary through a form, including adding an image.
- Update an itinerary - allow an authenticated user to edit the itinerary they previously created, by using a form with a similar look and feel as the creation form.
- Delete an itinerary - allow an authenticated user to delete a itinerary an he created by clikcing on a button on his itinerary.
- Update your profile - allow a user to add details about him/herself using the form on their own profile page. 
- Order - allow a user to select a product, confirm your cart and make a payment.
- See your Order - allow a user to retrieve orders they made in the past. 

### Features Left to Implement
- Add a comment - allow a user to leave comments on the itineraries. 
- See a user's itineraries - allow a user to see the list of itineraries created by a user on their profile page. 
- Order confirmation - send an email to confirm the order's details.

## Technologies Used

In this section, you should mention all of the languages, frameworks, libraries, and any other tools that you have used to construct this project. For each, provide its name, a link to its official site and a short sentence of why it was used.

- [Django](https://www.djangoproject.com/)
    - **Django** handles the backend
- [Django](http://www.django-rest-framework.org/)
    - **Django Rest Framework** is used for the APIs
- [JWT](https://jwt.io/introduction/)
    - **Json Web Token** is the technology used for authentication
- [ReactJS](https://reactjs.org/) and [Redux](https://redux.js.org/)
    - I use **ReactJS**, **Redux**, and their ecosystem for the frontend
- [ReactJS](https://reactjs.org/) and [Redux](https://redux.js.org/)
    - I use **ReactJS**, **Redux**, and their ecosystem for the frontend
- [React-Strap](https://reactstrap.github.io/)
    - **React-Strap** to support the design of the app and help with the responsiveness.


## Testing
- I included unit tests in my django apps for custom functions.
- I included JS unit tests for non-react and non-asyncronous functions
- The detailed UI/UX tests are to be found [here](https://github.com/mathilde206/weekend-plannerV2/blob/master/User%20Testing%20-%20Weekend%20Planner.pdf)
- I am using Travis for continuous integration. 

Link to the user testing can be found there : 

## Deployment
### Run the code locally
On my local machine, I am using an older version of npm preventing me to use the regular create-react-app. 
- I created a .bashrc file containing the following environment variables : SECRET_KEY, STRIPE_PUBLISHABLE, STRIPE_SECRET, EMAIL_ADDRESS, EMAIL_PASSWORD and DEVELOPMENT=1
- I created a static-cdn-local folder at the same level as scr and frontend (where the static files will be collected as if it was an actual CDN)
- In the frontend directory : ```npm run collect``` will build the frontend bundle and collect them to the static-cdn-file in development mode
- In the src directory : ```python3 manage.py makemigration```, then ```python3 manage.py migrate``` will setup the local database
- In the src directory: ```python3 manage.py runserver``` will run the server.
- The website should now be accessible on your local host. 

### Deployment 
The django part is deployed on heroku and the frontend part is deployed on AWS.
- I actually created a second [git directory](https://github.com/mathilde206/weekend-planner-django-only), which is a copy of the full directory with only the backend. That way, I am able to deploy automatically anytime I push on that branch.  
- On heroku, I set up the following environment variables: STRIPE_PUBLISHABLE, STRIPE_SECRET, EMAIL_ADDRESS, EMAIL_PASSWORD as well as AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY, S3_BUCKET and DATABASE_URL.
- I also set DISABLE_COLLECTSTATIC to 1 because the static files are not collected from there.
- On heroku I connected my app to a postgres data base. 
- In order to deploy the backend I click on deploy the backend on 
- In order to deploy the frontend, I disable set DEVELOPMENT=False on my bashrc and run ```npm run collect```


## Credits

### Content
- Most of the itineraries are written by me or friends
- Exceptions: [Strasbourg](https://adventurousmiriam.com/strasbourg-on-a-budget/)
   and [Paris](https://www.lonelyplanet.com/france/paris/travel-tips-and-articles/city-of-love-romantic-things-to-do-in-paris/40625c8c-8a11-5710-a052-1479d2761cd9)

### Media
- All the photos (added by me) come from unsplash and are free of rights. 

### Acknowledgements

- This article helped me greatly to build the authentication with JWT [Full stack Django](https://medium.com/netscape/full-stack-django-quick-start-with-jwt-auth-and-react-redux-part-i-37853685ab57)
- This video helped me setup my react/django project (especially npm scripts) [React & Django TUTORIAL Integration // REACTify Django](https://www.youtube.com/watch?v=AHhQRHE8IR8)
- I used reset css rules from [here](https://meyerweb.com/eric/tools/css/reset/)
