# Database Integration Documentation

To test the API routes manually run this command in the terminal: `uvicorn app.api.main:app --reload`

Then open this address in the browser: `http://127.0.0.1:8000/docs`

Depending on the port the application is running out of the url may change, but any changes to the address will generate when the uvicorn server is started.

The database for Domanu is hosted using Supabase. This platform has built in authentication and allows for implementation across multiple languages, including Python - which is what Domanu's backend is built in. The existing databases have been constructed using the console in Supabase and the current version of Domanu has API's necessary for authentication, user profiles, marketplaces, and services.

## Authentication

The authentication API's are stored in auth.py and allow the application to communicate with the auth users database stored on Supabase. Various permissions for user data will be limited to the admin profile. 

`create_user` allows for the creation of new users via email and stores their email and password. Users receive a unique id and this id will follow them across the entire platform to create their profiles and manage anything that pertains to their account on the site. This function will also send a confirmation email to registrants from the domanu.com email.

`sign-in` allows the user to log into their account and their session data will persist to allow users to perform actions on the site.

`get_session` retrieves the data for the session that can be used for retrieving logged in user data as needed.

`sign_out` allows the user to end their session and log out.

`user_data` retrieves all the data about the user that is logged in at the time the function is called.

`user_id` returns the id of the logged in user. This will be used throughout the application to retrieve data that is related to the user.

`update_email` allows the user to change the email attached to their account.

`update_password` gives the user the ability to change their account password.

## Profiles

The `Profiles` database holds all the user's account information that does not pertain to login information. This includes the user's first name, last name, username, whether they are a designer or not, and the marketplaces the user is a member of. More details may need to be added as the application grows in complexity. For a basic implementation of a user profile, logging, in, and basic functionality of joining marketplaces and creating services, these are all that are needed.

`update_profile` allows the user to update their first name, last name, and username.

`make_designer` will change the designer permissions of the user.

`get_username` returns the username the user created.

`get_first_name` will return the user's first name.

`get_last_name` will return the user's last name.

`get_designer_value` returns whether the user has designer permissions or not.

`get_user_profile` returns all the data related to a user's profile.

`get_marketplaces` retrieves all the marketplaces a user has joined.

`join_marketplaces` allows users to join different public marketplaces that will get stored with their profile.

## Marketplaces

The `Marketplaces` database contains all of the marketplaces that have been created and added to Domanu. The entites in the database each represent a unique marketplace that users can join and sell services on. A single entity has a marketplace title, a description of the marketplace audience and purpose, the unique id of the designer, whether bidding will be a process of selling services, whether bargaining will be allowed, and whether the marketplace is private.

As a default, each marketplace is private, and allows both bargaining and bidding. The designer ID is pulled from the session data of the logged in user at the time of creation and will only permit marketplace creation if that user has a valid designer value in their profile.

`create_marketplace` will allow designers to develop a new marketplace and change default values to be specific to their preferences.

`get_marketplace` will return the marketplaces specific to one designer.

`get_all_marketplaces` will return all the marketplaces on Domanu without any authentication.

## Services

The `Services` database is where all actual services created by users will be stored. These services are what the users are attempting to sell on a certain marketplace. To create a service, a user must be a member of that marketplace they wish to sell on. Each service has a text name and description, a price, and a boolean value indicating whether it is available still or not. Each service will also contain two foreign attributes. First will be the unique id of the seller and the other will be the id of the marketplace they are attempting to sell this service on.

`create_service` allows a user to create a service in any marketplace they are a member of.

`get_services` will return all the services associated with a user.

`update_service_name` will allow a user to update the name of services they own.

`update_service_description` will allow a user to update the description of a service they own.

`update_service_price` will allow a user to update the price of a service they own.

`delete service` allows a user to delete services they are the owner of.