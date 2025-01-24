// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginViaApi(nomColombie: string, password: string, role?: string): void;
    getByTestId(selector: string): Chainable<JQuery<HTMLElement>>;
  }
}

// Login via API to bypass UI login
Cypress.Commands.add('loginViaApi', (nomColombie: string, password: string, role: string = 'USER') => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/account/login`,
    body: {
      nomColombie,
      password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    window.localStorage.setItem('token', response.body.token);
    window.localStorage.setItem('role', role);
  });
});

// Helper command to get elements by data-cy attribute
Cypress.Commands.add('getByTestId', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});

// Preserve localStorage between tests
beforeEach(() => {
  cy.restoreLocalStorage();
});

afterEach(() => {
  cy.saveLocalStorage();
});

// Add localStorage support
const LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add('saveLocalStorage', () => {
  Object.keys(localStorage).forEach(key => {
    LOCAL_STORAGE_MEMORY[key] = localStorage[key];
  });
});

Cypress.Commands.add('restoreLocalStorage', () => {
  Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
    localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
  });
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
