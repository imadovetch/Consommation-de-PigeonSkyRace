describe('Pigeon Competition Management', () => {
  beforeEach(() => {
    cy.loginViaApi('user', 'password123', 'USER')
    cy.visit('/pigeon-to-competition')
  })

  describe('Pigeon Registration', () => {
    it('should list available competitions', () => {
      cy.get('[data-cy="available-competitions"]').should('be.visible')
      cy.get('[data-cy="competition-option"]').should('have.length.at.least', 1)
    })

    it('should register a pigeon to a competition', () => {
      // Select a competition
      cy.get('[data-cy="competition-option"]').first().click()
      
      // Fill pigeon details
      cy.get('[data-cy="pigeon-name"]').type('Speed Racer')
      cy.get('[data-cy="pigeon-color"]').type('Grey')
      cy.get('[data-cy="register-pigeon-button"]').click()
      
      // Verify registration
      cy.get('[data-cy="success-message"]').should('be.visible')
      cy.get('[data-cy="registered-pigeons"]')
        .should('contain', 'Speed Racer')
    })
  })

  describe('Pigeon List', () => {
    it('should display registered pigeons', () => {
      cy.get('[data-cy="registered-pigeons"]').should('be.visible')
      cy.get('[data-cy="pigeon-entry"]').should('have.length.at.least', 1)
    })

    it('should show pigeon details', () => {
      cy.get('[data-cy="pigeon-entry"]').first().within(() => {
        cy.get('[data-cy="pigeon-name"]').should('be.visible')
        cy.get('[data-cy="pigeon-color"]').should('be.visible')
        cy.get('[data-cy="competition-name"]').should('be.visible')
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle registration errors', () => {
      cy.intercept('POST', '**/register-pigeon', {
        statusCode: 400,
        body: { message: 'Registration failed' }
      })
      
      cy.get('[data-cy="competition-option"]').first().click()
      cy.get('[data-cy="pigeon-name"]').type('Error Bird')
      cy.get('[data-cy="pigeon-color"]').type('Red')
      cy.get('[data-cy="register-pigeon-button"]').click()
      
      cy.get('[data-cy="error-message"]').should('be.visible')
    })
  })
})
