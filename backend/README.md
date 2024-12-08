# Backend Structure

## `backend` folder

Holds all of the APIs for the project. These APIs are run out of a main file that will allow them to all be started and run on the same client session of the database.

## `test` folder

Holds all the testing for the backend APIs. The only tests that are currently fully developed are for the authentication APIs.

## `db` file

Contains the necessary functions to create a Supabase client. Will use the information provided in the config.py file to create the database server.

## `config.py` file 

Holds the details to create and start a Supabase client.