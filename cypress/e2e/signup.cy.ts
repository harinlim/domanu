describe('Signup Page', () => {
  beforeEach(() => {
    // Visit the signup page
    cy.visit('http://localhost:3000/signup');
  });

  it('should display the signup form', () => {
    // Verify the form elements are present
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="username"]').should('be.visible');
    cy.get('input[name="first_name"]').should('be.visible');
    cy.get('input[name="last_name"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="terms"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('should show validation errors for empty fields', () => {
    // Submit without filling out the form
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    // Check for validation messages
    cy.contains('Please enter a valid email address').should('be.visible');
    cy.contains('Please enter a username').should('be.visible');
    cy.contains('Please enter a first name').should('be.visible');
    cy.contains('Please enter a last name').should('be.visible');
    cy.contains('Please enter a password').should('be.visible');
  });

  it('should successfully create an account', () => {
    // Stub the signup API
    cy.intercept('POST', '/api/auth/create-user', {
      statusCode: 200,
      body: {
        message: {
          user: { id: 'test-user-id' },
        },
      },
    }).as('createUserRequest');

    // Stub the login API
    cy.intercept('POST', '/api/auth/sign-in', {
      statusCode: 200,
      body: { message: 'User signed in' },
    }).as('loginRequest');

    // Stub the profile update API
    cy.intercept('POST', '/api/profiles/update-user', {
      statusCode: 200,
      body: { message: 'Profile updated' },
    }).as('updateUserRequest');

    // Fill out the form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="first_name"]').type('Test');
    cy.get('input[name="last_name"]').type('User');
    cy.get('input[name="password"]').type('securePassword123');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    // Wait for the signup request
    cy.wait('@createUserRequest').its('request.body').should('deep.equal', {
      email: 'test@example.com',
      password: 'securePassword123',
    });

    // Wait for the login request
    cy.wait('@loginRequest').its('request.body').should('deep.equal', {
      email: 'test@example.com',
      password: 'securePassword123',
    });

    // Wait for the profile update request
    cy.wait('@updateUserRequest').its('request.body').should('deep.equal', {
      uuid: 'test-user-id',
      first: 'Test',
      last: 'User',
      username: 'testuser',
    });

    // Assert redirection to the homepage
    cy.url().should('eq', "http://localhost:3000" + '/');
  });

  it('should display an error on failed signup', () => {
    // Stub the signup API to simulate a failure
    cy.intercept('POST', '/api/auth/create-user', {
      statusCode: 400,
      body: { message: 'Email already in use' },
    }).as('createUserRequest');

    // Fill out the form with an existing email
    cy.get('input[name="email"]').type('existing@example.com');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="first_name"]').type('Test');
    cy.get('input[name="last_name"]').type('User');
    cy.get('input[name="password"]').type('securePassword123');
    cy.get('input[name="terms"]').check();
    cy.get('button[type="submit"]').click();

    // Wait for the signup request
    cy.wait('@createUserRequest');

    // Assert that the error message is displayed
    cy.contains('Email already in use').should('be.visible');
  });
});
