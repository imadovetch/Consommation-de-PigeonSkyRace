describe('Home Page', () => {
  beforeEach(() => {
    // Login via UI
    cy.visit('/login')
    cy.get('input[formControlName="nomColombie"]').type('testuser')
    cy.get('input[formControlName="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
  })

  it('should display user profile information', () => {
    cy.get('.card').should('be.visible')
    cy.get('.card-title').should('contain.text', 'Welcome')
    cy.contains('Colombie Name:').should('be.visible')
    cy.contains('Location:').should('be.visible')
  })

  it('should show loading state initially', () => {
    cy.visit('/home') // Refresh to see loading state
    cy.get('.spinner-border').should('be.visible')
    cy.get('.card', { timeout: 10000 }).should('be.visible')
  })

  it('should have working navigation', () => {
    cy.get('app-navbar').should('be.visible')
    cy.contains('Competitions').should('be.visible')
  })
})
