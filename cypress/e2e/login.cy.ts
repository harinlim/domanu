describe('Login Page', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('http://localhost:3000/login');
  });

  it('should display the login form', () => {
    // Check that the form elements are present
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[name="submit"]').should('be.visible');
  });

  it('should show an error for empty fields on submit', () => {
    // Submit without filling in the form
    cy.get('button[name="submit"]').click();

    // Assert that error messages are displayed
    cy.contains('Please enter a username or email').should('be.visible');
    cy.contains('Please enter a password').should('be.visible');
  });

  it('should successfully submit with valid credentials', () => {
    cy.intercept('POST', '/api/auth/sign-in', {
      statusCode: 200,
      body: { message: 'User signed in' },
    }).as('loginRequest');

    // Fill in the form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[name="submit"]').click();

    // Wait for the API request
    cy.wait('@loginRequest');

    // Assert redirection to the homepage
    cy.url().should('eq', "http://localhost:3000/");
  });

  it('should display an error on failed login', () => {
    // Stub the login API to simulate a failure
    // Stub the login API to simulate a failure
    cy.intercept('POST', '/api/auth/sign-in', {
      statusCode: 401,
      body: { message: 'Invalid credentials' },
    }).as('loginRequest');

    // Fill in the form with incorrect credentials
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[name="submit"]').click();

    // Wait for the API request
    cy.wait('@loginRequest');

    // Assert that the error message is displayed
    cy.contains('Invalid credentials').should('be.visible');
  });

  it('should allow toggling the "Remember me" checkbox', () => {
    // Check the initial state of the checkbox
    cy.get('input[name="remember"]').should('not.be.checked');

    // Toggle the checkbox
    cy.get('input[name="remember"]').check();
    cy.get('input[name="remember"]').should('be.checked');

    // Uncheck the checkbox
    cy.get('input[name="remember"]').uncheck();
    cy.get('input[name="remember"]').should('not.be.checked');
  });
});
