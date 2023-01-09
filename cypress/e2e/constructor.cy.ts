import { BASE_URL } from '../../src/utils/burger-api'

const bunSelector = '[data-testid=ingredient-cart-60d3b41abdacab0026a733c6]'
const constructorSelector = '[data-testid=burger-constructor]'
const modalSelector = '[data-testid=modal]'
const closeButtonSelector = '[data-testid=modal-close-button]'
const constructorAuthSelector = '[data-testid=burger-constructor-auth]'
const loginInputSelector = '[data-testid=login-input]'
const constructorOrderSelector = '[data-testid=burger-constructor-order]'

describe('Constructor', () => {
  beforeEach(function () {
    cy.visit('')
    cy.intercept('POST', `${BASE_URL}auth/login`, {
      fixture: 'auth.json'
    })
    cy.intercept('POST', `${BASE_URL}orders`, {
      fixture: 'order.json'
    })
  })
  it('should open modal after ingredient card click', () => {
    cy.get(bunSelector).click()
  })
  it('should display ingredient details in modal', () => {
    cy.get(bunSelector).click()
    cy.get(modalSelector).as('modal')
    cy.get('@modal').find('[data-testid=ingredient-details-name]').as('name')
    cy.get('@name').should('contain', 'Краторная булка N-200i')
  })
  it('should close modal after close button click', () => {
    cy.get(bunSelector).click()
    cy.get(closeButtonSelector).click()
  })
  it('should drug ingredient to constructor', () => {
    cy.get(bunSelector).as('bun')
    cy.get(constructorSelector).as('constructor')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')
  })
  it('should open modal with order after order button click', () => {
    cy.get(bunSelector).as('bun')
    cy.get(constructorSelector).as('constructor')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')
    cy.get(constructorAuthSelector).click()
    cy.get(loginInputSelector).click()
    cy.get(constructorOrderSelector).click()
    cy.get(modalSelector).as('modal')
    cy.get('@modal').find('[data-testid=order-details-number]').as('number')
    cy.get('@number').should('contain', '34429')
  })
  it('should close modal with order after close button click', () => {
    cy.get(bunSelector).as('bun')
    cy.get(constructorSelector).as('constructor')
    cy.get('@bun').trigger('dragstart')
    cy.get('@constructor').trigger('drop')
    cy.get(constructorAuthSelector).click()
    cy.get(loginInputSelector).click()
    cy.get(constructorOrderSelector).click()
    cy.get(closeButtonSelector).click()
  })
})
