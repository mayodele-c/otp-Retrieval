describe('otp Automation', () => {


  it('signUp', () => {
    cy.signUpPage()

  })

  it('extractEmail', () => {
    cy.createEmail()

  })

  it('retrieveOtp', () => {
    cy.retrieveOtp()

  })

  it('signIn', () => {
    cy.signIn()

  })

})