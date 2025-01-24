describe('Competition Management', () => {
  beforeEach(() => {
    cy.loginViaApi('organizer', 'password123', 'ORGANIZER')
    cy.visit('/competition')
  })

  describe('Competition List', () => {
    it('should display list of competitions', () => {
      cy.get('[data-cy="competition-list"]').should('be.visible')
      cy.get('[data-cy="competition-card"]').should('have.length.at.least', 1)
    })

    it('should show competition details', () => {
      cy.get('[data-cy="competition-card"]').first().within(() => {
        cy.get('[data-cy="competition-name"]').should('be.visible')
        cy.get('[data-cy="departure-time"]').should('be.visible')
        cy.get('[data-cy="percentage"]').should('be.visible')
      })
    })
  })

  describe('Competition Creation', () => {
    it('should create a new competition', () => {
      const timestamp = new Date().getTime()
      cy.get('[data-cy="add-competition-button"]').click()
      cy.get('[data-cy="competition-name-input"]').type(`Test Competition ${timestamp}`)
      cy.get('[data-cy="departure-time-input"]').type('2025-02-01T10:00')
      cy.get('[data-cy="percentage-input"]').type('10')
      cy.get('[data-cy="save-competition-button"]').click()
      
      // Verify the new competition appears in the list
      cy.get('[data-cy="competition-card"]')
        .should('contain', `Test Competition ${timestamp}`)
    })
  })

  describe('Competition Actions', () => {
    it('should start a competition', () => {
      cy.get('[data-cy="start-competition-button"]').first().click()
      cy.get('[data-cy="competition-status"]').first().should('contain', 'Started')
    })

    it('should end a competition', () => {
      cy.get('[data-cy="end-competition-button"]').first().click()
      cy.get('[data-cy="competition-status"]').first().should('contain', 'Ended')
    })

    it('should show more info about a competition', () => {
      cy.get('[data-cy="more-info-button"]').first().click()
      cy.url().should('include', '/competition/')
      cy.get('[data-cy="competition-details"]').should('be.visible')
    })
  })
})
