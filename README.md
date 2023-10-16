

This is a Yelp Clone which I named Gulp. This site has a nice rotating splash landing page and has two full crud features: businesses and reviews. 

# Live Link
https://gulp-heh2.onrender.com


# List of techs/languages/plugins/APIs used:

### Backend:
Python
Flask
Django
PostgreSQL

### Frontend:
JavaScript
React
Redux

### Image Hosting:
AWS 

### Styling:
CSS
HTML
Font Awesome

# Images:

### Landing Page Splash:
![Didnt load](https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/landing1.png)

### Landing Page Recent Activity:
![Didnt load](https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Landing2.png)

### Business Page Details:
![Didnt load](https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Bus1.png)

### Post a Comment to Business Page:
![Didnt load](https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Bus2.png)

### Personal Page to Manage Business:
![Didnt load](https://gulp-bucket.s3.us-west-1.amazonaws.com/Gulp+Images/Personal1.png)

# Future Implementations

## Review Photos
* Users will be able to upload images with their reviews

## Search
* User will be able to search businesses by name, category and location.
* User will be able to search other users by name.

## AWS for picture uploads
* Images on site will be hosted by AWS.
* User uploads to site will be linked to an AWS bucket and persist.

## Following
* Logged in users can follow and unfollow other users.
* Logged in users can view their followers and who they follow.

## Ratings
* Logged in users can rate other users comments

# Technical implementation details:
* Really needed to think aobut store shape and state constantly and had many comonents that inter-tangled and took me a lot of console.logging. 
* CSS was a very weak point of mine as well but I managed to get a nice looking rotating splash page functional.

# Links: 
* https://github.com/Gdavidu/Gulp-Capstone/
* www.linkedin.com/in/david-gu-79ab311b5

# Endpoints:
## Users
#### GET <code>/api/users/</code>
* Returns the information for all users
#### GET <code>/api/users/:id</code>
* Returns the information for one user

## Sessions
#### GET <code>/api/auth/</code>
* Returns the information for the logged in user
#### POST <code>/api/auth/signup</code>
* Signs a new user up
#### POST <code>/api/auth/login</code>
* Logs in a user
#### DELETE <code>/api/auth/</code>
* Logs out a user

## Businesses
#### GET <code>/api/businesses</code>
* Returns the information for all businesses
#### POST <code>/api/businesses</code>
* Creates a new business
#### GET <code>/api/businesses/:id</code>
* Returns the information for one business
#### PUT <code>/api/businesses/:id</code>
* Edits the information for one business
#### DELETE <code>/api/businesses/:id</code>

* Deletes a business
## Reviews
#### GET <code>/api/reviews</code>
* Returns the information for all reviews
#### POST <code>/api/reviews</code>
* Creates a new review
#### GET <code>/api/reviews/:id</code>
* Returns the information for one review
#### PUT <code>/api/reviews/:id</code>
* Edits the information for one review
#### DELETE <code>/api/reviews/:id</code>
* Deletes a review
