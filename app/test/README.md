## API Testing

### Auth Testing

To test the authentication database and test what it looks like to create and access user details, make sure that the terminal is in the project directory.

Run this command `export PYTHONPATH="{path}/domanu:$PYTHONPATH"` where path is the lcoation of the project repository on your computer.

Then run `pytest app/test/test_auth.py`

The testing of the authentication APIs will create a new user, attempt to log them into the database, retrieve all of their data, and then specifically retrieve their user id. At the start of the testing, if the test user already exists the account will be deleted and then tests will be run. This user will remain in the database when testing concludes and the process will restart when testing occurs again. 

There is also testing for trying to log in a user that does not exist and trying to create a new user that already exists.