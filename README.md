# GottaRunShoeTracker
# THIS IS NO LONGER BEING MAINTAINED
Developed a service to create, track and store history of shoe orders performed at all 4 store locations in South Carolina.
This service follows C.R.U.D principles and utilizes a front-end using React.js, CSS/HTML, a back-end on AWS through
lambda(Python). Lambda works with Cognito for user storage and authentication and communicates to DynamoDB to
create tables for shoe Brands, Models, Colors and order contents. This service was developed so the Employees at Gotta
Run could have a better way of managing and tracking orders as opposed to sticky notes which they were using before.

Ability to signup. Can't log in until you verify your email(check junk). Employee accounts can create orders, brands, models, colors and edit. Customers can only view their orders. 
If you create an account you will only have customer permissions. If you would like to use the main functionality please sign in with an employee account [[[***email: "dzfinge@clemson.edu" password: "Daniel123"***]]]
Test site currently using Github pages to access https://danielzfinger.github.io/GottaRunShoeTracker/ .
