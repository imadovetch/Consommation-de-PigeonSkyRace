// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using TypeScript syntax
import './commands'

// Prevent uncaught exceptions from failing tests
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

// Add custom command types to global Cypress namespace
declare global {
  namespace Cypress {
    interface Chainable {
      loginViaApi(nomColombie: string, password: string, role?: string): Chainable<void>
      getByTestId(selector: string): Chainable<JQuery<HTMLElement>>
      saveLocalStorage(): Chainable<void>
      restoreLocalStorage(): Chainable<void>
    }
  }
}
