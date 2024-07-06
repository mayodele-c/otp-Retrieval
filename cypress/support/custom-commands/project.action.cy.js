

let sel
let inboxId
let emailAddress
let emailBody
let otpValue

before(() => {
    Cypress.on('uncaught:exception', () => {
        return false
    })

    cy.fixture('selectors').then((selectors) => {
        sel = selectors
    })

    cy.visit('/')

})

Cypress.Commands.add('signUpPage', () => {

    cy.get(sel.createAccount).should('be.visible').click()
    
    

})

Cypress.Commands.add('createEmail', () => {

    const password = Cypress.env('password');

    //create an email address with mailslurp
    cy.mailslurp().then(extractMail => extractMail.createInbox()).then(inbox => {
        inboxId = inbox.id;
        emailAddress = inbox.emailAddress;

        //Inserts the mailslurp email address
        cy.get(sel.userName).type(emailAddress)
        //Inserts password
        cy.get(sel.password).type(password)
        //Clicks on Create Account
        cy.get(sel.createAcct).click()
        
    })

})

Cypress.Commands.add('retrieveOtp', () => {

    cy.mailslurp()
  // use inbox id and a timeout of 30 seconds
  .then(mailslurp => mailslurp.waitForLatestEmail(inboxId, 30000, true))
  // extract the confirmation code from the email body
  .then(email => {
    const match = /.*verification code is (\d{6}).*/.exec(email.body);
    if (match && match[1]) {
      return match[1];
    } else {
      throw new Error('Verification code not found in email body');
    }
  })

  //fill out the confirmation form and submit
  .then(code => {
    cy.get(sel.code).type(code).trigger('change');
    cy.get(sel.confirmBtn).click();
  })



})

Cypress.Commands.add('signIn', () => {
    cy.get(sel.code).should('be.visible').type(otpValue).trigger('change')
    cy.get(sel.confirmBtn).click()

 

})


