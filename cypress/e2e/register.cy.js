import { errorMessages } from '../../src/components/Register.jsx';

describe('Register Page Validations', () => {

  const testScenarios = [
   { selector: '#ad', value: 'A', error: errorMessages.ad },
   { selector: '#soyad', value: 'B', error: errorMessages.soyad },
   { selector: '#email', value: 'gecersiz-mail', error: errorMessages.email },
    { selector: '#password', value: '123', error: errorMessages.password }
  ];

  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display all error messages for invalid inputs', () => {
    testScenarios.forEach((scenario) => {
      // Önce temizle sonra yaz
      cy.get(scenario.selector).clear().type(scenario.value);
      
      // Submit butonuna bas
    //  cy.get('button[type="submit"]').click();

      // Hata mesajını hem class hem de içerik olarak doğrula
      cy.contains('.invalid-feedback', scenario.error).should('be.visible');
    });
  });

  it('should show email error specifically for incomplete format', () => {
    const invalidEmail = 'emre@wit.';
    cy.get('#email').clear().type(invalidEmail);
  //  cy.get('button[type="submit"]').click();
    
    cy.contains('.invalid-feedback', errorMessages.email).should('be.visible');
  });

  it('should enable submit button only when all inputs are valid', () => {
    cy.get('#ad').type('Kubra');
    cy.get('#soyad').type('Soyad');
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Password123');

  //  cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('should disable submit button when any input is invalid', () => {
    cy.get('#ad').type('Kubra');
    cy.get('#soyad').type('Soyad');
    cy.get('#email').type('invalid-email');
    cy.get('#password').type('Password123');  
    cy.get('button[type="submit"]').should('be.disabled');


    it('should display all error messages when form is submitted with invalid inputs', () => {
      testScenarios.forEach((scenario) => {
        cy.get(scenario.selector).clear().type(scenario.value);
      }); 

      it('should be able to submit form when all inputs are valid', () => {
        cy.get('#ad').type('Kubra');
        cy.get('#soyad').type('Soyad');
        cy.get('#email').type('kocurkubra@gmail.com');
        cy.get('#password').type('Password123');
        cy.get('button[type="submit"]').should('not.be.disabled').click();
      });
      it('should display button disabled when name is invalid', () => {
        cy.get('#ad').type('Ku');
        cy.get('#soyad').type('Soyad');
        cy.get('#email').type('kocurkubra@gmail.com');
        cy.get('#password').type('Password123');
        cy.get('button[type="submit"]').should('be.disabled').click();

        it('should display button disabled when surname is invalid', () => {
          cy.get('#ad').type('Kubra');
          cy.get('#soyad').type('S');
          cy.get('#email').type('kocurkubra@gmail.com');
          cy.get('#password').type('Password123');
          cy.get('button[type="submit"]').should('be.disabled').click();

          it('should display button disabled when email is invalid', () => {
            cy.get('#ad').type('Kubra');
            cy.get('#soyad').type('Soyad');
            cy.get('#email').type('kocurkubra@gmail');
            cy.get('#password').type('Password123');
            cy.get('button[type="submit"]').should('be.disabled').click();
        });
      });
    });
  });
});
});
