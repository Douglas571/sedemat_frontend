/// <reference types="cypress" />


describe('Admin Login', () => {
    beforeEach(() => {
      cy.visit('/signin'); // Replace with your actual login URL
    });
  
    it('allows successful login with valid credentials', () => {
      const adminCredentials = {
        username: '29748656', // Replace with your admin username
        password: '1234567890',   // Replace with your admin password
      };
  
      // Find username and password input elements
      cy.get('[data-testid="username-input"]').type(adminCredentials.username);
      cy.get('[data-testid="password-input"]').type(adminCredentials.password);
  
      // Submit the login form
      cy.get('[data-testid="login-button"]').click();
  
      // Assert successful login by verifying presence of expected elements after login
      cy.get('[data-testid="user-home"]').should('be.visible'); // Replace with an element specific to the admin homepage
      cy.url().should('include', '/user'); // Check for URL containing "/admin" after successful login (optional)
    });
  
    it('shows error message for invalid credentials', () => {
      const invalidCredentials = {
        username: 'invalid_user',
        password: 'wrong_password',
      };
  
      // Enter invalid credentials
      cy.get('[data-testid="username-input"]').type(invalidCredentials.username);
      cy.get('[data-testid="password-input"]').type(invalidCredentials.password);
      cy.get('[data-testid="login-button"]').click();
  
      // Assert error message is displayed
      cy.get('[data-testid="login-error-message"]').should('be.visible'); // Replace with an element showing the error message
    });
  });

describe('recaudador duties', () => {
  beforeEach(() => {
    cy.visit('/signin'); // Replace with your actual login URL

    const userCredentials = {
      username: '29748656', // Replace with your admin username
      password: '1234567890',   // Replace with your admin password
    };

    // Find username and password input elements
    cy.get('[data-testid="username-input"]').type(userCredentials.username);
    cy.get('[data-testid="password-input"]').type(userCredentials.password);

    // Submit the login form
    cy.get('[data-testid="login-button"]').click();

    // Assert successful login by verifying presence of expected elements after login
    cy.get('[data-testid="user-home"]').should('be.visible'); // Replace with an element specific to the admin homepage
    cy.url().should('include', '/user');
  });

  
  
  it.skip('Recaudador duties', () => {
    /**
   * He should be able to
   * he should be able to look into the "contribuyentes" section
   * he should be able to search by rif
   * he should be able to look
   * open the new patente de veiculos section
   * add a new veiculo
   *  if the tax payer is not registered, he should be able to open "nuevo contribuyente" section
   *  if the tex payer is already registered, he should be able to look into the registe checkbox 
   */

    // cy.url().should('include', '/contributors');

    // Verify at least 3 contributors are present
    cy.get('[data-testid="contributor-row"]').should('have.length.at.least', 3);

    // Navigate to the first contributor's page
    cy.get('[data-testid="contributor-row"]').first().click();
    cy.url().should('include', '/contributor-details');

    // Check for the button to add a vehicle patent
    cy.get('[data-testid="add-vehicle-patent-button"]').should('be.visible');

    // Navigate to the "new vehicle patent" page
    cy.get('[data-testid="add-vehicle-patent-button"]').click();
    cy.url().should('include', '/new-vehicle-patent');
  })

  it('Recaudador add contribuyente', () => {
    cy.get('[data-testid="add-new-contribuyente"]').click()


    
  });
})