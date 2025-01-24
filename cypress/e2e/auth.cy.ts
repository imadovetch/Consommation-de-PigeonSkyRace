describe('Authentication', () => {
  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login')
    })

    it('should display login form', () => {
      cy.get('form.max-w-sm').should('be.visible')
      cy.get('#NomColombie').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('button').contains('Submit').should('be.visible')
    })

    it('should show validation errors for empty fields', () => {
      // Touch the fields and leave them empty
      cy.get('#NomColombie').click().blur()
      cy.get('#password').click().blur()
      cy.get('.text-red-600').should('be.visible')
      cy.get('.border-red-500').should('be.visible')
    })
  })

  describe('Registration Page', () => {
    beforeEach(() => {
      cy.visit('/register')
      // Wait for the form to be fully loaded
      cy.get('form.max-w-sm').should('be.visible')
    })

    it('should display registration form', () => {
      cy.get('#nomColombie').should('be.visible')
      cy.get('#username').should('be.visible')
      cy.get('#password').should('be.visible')
      cy.get('#latitude').should('be.visible')
      cy.get('#longitude').should('be.visible')
      cy.get('button').contains('Submit').should('be.visible')
    })

    it('should show validation errors for empty fields', () => {
      // Touch the fields and leave them empty
      cy.get('#nomColombie').click().blur()
      cy.get('#username').click().blur()
      cy.get('#password').click().blur()
      cy.get('#latitude').click().blur()
      cy.get('#longitude').click().blur()
      cy.get('.text-red-600').should('be.visible')
      cy.get('.border-red-500').should('be.visible')
    })
  })
})
