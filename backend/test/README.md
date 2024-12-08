## API Testing

### Auth Testing

To test the authentication database and test what it looks like to create and access user details, make sure that the terminal is in the project directory.

Run this command `export PYTHONPATH="{path}/domanu:$PYTHONPATH"` where path is the lcoation of the project repository on your computer.

Then run `pytest backend/test/test_auth.py`

The testing of the authentication APIs will create a new user, attempt to log them into the database, retrieve all of their data, and then specifically retrieve their user id. At the start of the testing, if the test user already exists the account will be deleted and then tests will be run. This user will remain in the database when testing concludes and the process will restart when testing occurs again. 

There is also testing for trying to log in a user that does not exist and trying to create a new user that already exists.

## Testing Marketplaces, Profiles, and Services

To test out these databases,instead of using pytest. These will be tested from the FastAPI interface. To get to this interface run this command in the terminal.

```bash
uvicorn backend.api.main:app --reload
```

### Before Testing Each Section

1. Navigate to `/auth/sign-in`. 
2. Click "Try it out"
3. In the email field enter "test@domanu.com" and for the password field enter "TestPassword" without the quotes
4. Click "Execute"
5. The response message should read `{"message": "User signed in"}`

If at any point in the testing of other endpoints the response says `{"message": {}}`, return to this step and relog in with the same details. This has to do with the session details and keeping an active log in status. Certain endpoints may not be accessible if there is no user currently logged in.

### Profiles

**Updating Profile**

1. Navigate to `/profiles/update-user`. 
2. Click "Try it out"
3. In the request body enter a first name, last name, and username. To match the expected output exactly use "Foo" - for first name, "Bar" - for last name, and "fooBar" - for username.
4. Click "Execute"
5. The response message should look like this depending on your input values `{"message": "data=[{'id': 'f3d53dbd-bda7-440a-8299-620880f47bd1', 'created_at': '2024-11-15T15:08:08.681516+00:00', 'first_name': 'Foo', 'last_name': 'Bar', 'designer': False, 'username': 'fooBar', 'member_marketplaces': [], 'email': None}] count=None"}`

**Make Designer**

1. Navigate to `/profiles/make-designer`. 
2. Click "Try it out"
3. Click "Execute"
4. The response message should look like this depending on your input values `{"message": "data=[{'id': 'f3d53dbd-bda7-440a-8299-620880f47bd1', 'created_at': '2024-11-15T15:08:08.681516+00:00', 'first_name': 'Foo', 'last_name': 'Bar', 'designer': True, 'username': 'fooBar', 'member_marketplaces': [], 'email': None}] count=None"}`

**Get First Name**

1. Navigate to `/profiles/get_first_name`. 
2. Click "Try it out"
3. Click "Execute"
4. The response message should look like this depending on your input values from the update profile test: `{"message": "fooBar"}`

**Get Last Name**

1. Navigate to `/profiles/get_last_name`. 
2. Click "Try it out"
3. Click "Execute"
4. The response message should look like this depending on your input values from the update profile test: `{"message": "Bar"}`

**Get Designer Value**

1. Navigate to `/profiles/get_designer`. 
2. Click "Try it out"
3. Click "Execute"
4. The response message should look like this if you have given designer permissions: `{"message": "True"}`

**Get User Profile**

1. Navigate to `/profiles/get_user_profile`. 
2. Click "Try it out"
3. Click "Execute"
4. The response message should look like this if you have given designer permissions: `{"message": "Foo Bar"}`

**Get Marketplaces**

1. Navigate to `/profiles/get_member_marketplace`. 
2. Click "Try it out"
3. Click "Execute"
4. The response message should look something like this if the user is a member of any marketplace: `{"message": "[2, 9]"}` otherwise the list will be empty and will populate after the 

**Join Marketplaces**

1. Navigate to `/profiles/join_marketplace`. 
2. Click "Try it out"
3. In the request body enter a number - for the purposes of testing try 2 or 12 as these are existing marketplaces that a user can join.
4. Click "Execute"
5. The response message should look like this if the user was not already a member: `{"message": "Marketplace joined"}`, otherwise it will return `{"message": "Already a member of this marketplace"}`
