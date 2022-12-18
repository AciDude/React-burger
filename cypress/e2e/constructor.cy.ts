/// <reference types="cypress" />
// @ts-check
describe('Constructor', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/auth/login', {
      fixture: 'auth.json'
    })
    cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
      fixture: 'order.json'
    })
  })
  it('should open modal after ingredient card click', () => {
    cy.get('[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]').click()
  })
  it('should display ingredient details in modal', () => {
    cy.get('[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]').click()
    cy.get('[data-testid=modal]').as('modal')
    cy.get('@modal').find('[data-testid=ingredient-details-name]').as('name')
    cy.get('@name').should('contain', 'Краторная булка N-200i')
  })
  it('should close modal after close button click', () => {
    cy.get('[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]').click()
    cy.get('[data-testid=modal-close-button]').click()
  })
  it('should drug ingredient to constructor', () => {
    cy.get('[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]').as('bun')
    cy.get('[data-testid=burger-constructor]').as('constructor')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')
  })
  it('should open modal with order after order button click', () => {
    cy.get('[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]').as('bun')
    cy.get('[data-testid=burger-constructor]').as('constructor')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')
    cy.get('[data-testid=burger-constructor-auth]').click()
    cy.get('[data-testid=login-input]').click()
    cy.get('[data-testid=burger-constructor-order]').click()
    cy.get('[data-testid=modal]').as('modal')
    cy.get('@modal').find('[data-testid=order-details-number]').as('number')
    cy.get('@number').should('contain', '34429')
  })
  it('should close modal with order after close button click', () => {
    cy.get('[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]').as('bun')
    cy.get('[data-testid=burger-constructor]').as('constructor')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')
    cy.get('[data-testid=burger-constructor-auth]').click()
    cy.get('[data-testid=login-input]').click()
    cy.get('[data-testid=burger-constructor-order]').click()
    cy.get('[data-testid=modal-close-button]').click()
  })
})
