## Frontend Reliability/Stress Testing

### Install Cypress

Run this command to download cypress
```bash
pnpm add --save-dev cypress
```

Run this command to open cypress UI for testing
```bash
pnpm cypress open
```

### Testing Sign Up

1. Navigate to signup.cy.ts file
2. Once you open this file, automatic tests should run which check for
    - Display the signup form
    - Show validation errors for empty fields
    - Successfully create an account
    - Display an error on failed signup

### Testing Login

1. Navigate to login.cy.ts file
2. Once you open this file, automatic tests should run which check for 
    - Display the login form
    - Show an error for empty fields on submit
    - Successfully submit with valid credentials
    - Display an error on failed login
    - Allow toggling the "Remember me" checkbox

### Install Artillery

Run this command to download Artillery
```bash
npm install -g artillery
```

Run this command to run pre-made Artillery test
```bash
artillery run test.yaml
```

### Test Output Explanation
1. ```http.codes.404```
This metric represents the number of HTTP 404 (Not Found) responses received from the server during the test.
You will typically see 50 here as Artillery cannot run the backend, but the timing of the following metrics are still valid and useful.

2. ```http.request_rate``` 
This metric represents the rate of HTTP requests sent by virtual users (vusers) per second. 

3. ```http.requests```
This metric represents the total number of HTTP requests that have been sent during the test.

4. ```http.response_time```
This category tracks various statistics regarding the response time for the requests.
    - ```p95``` corresponds to the 95th percentile response time
    - ```p99``` corresponds to the 99th percentile response time

5. ```http.response_time.4xx```
This category represents the response time statistics for HTTP 4xx status codes, which indicate client-side errors.

6. ```http.responses```
This is the total number of responses received by the virtual users during the test.

7. ```vusers.completed```
This metric indicates the number of virtual users (vusers) that successfully completed their assigned tasks during the test.

8. ```vusers.created```
This metric indicates the number of virtual users (vusers) that have been created during the test.

9. ```vusers.created_by_name.0```
This shows how many virtual users were created for a specific scenario, typically listed by scenario name or identifier.

10. ```vusers.failed```
This metric tracks the number of virtual users that failed during the test. Failures can occur due to various reasons.

11. ```vusers.session_length```
This metric tracks the session duration for each virtual user.