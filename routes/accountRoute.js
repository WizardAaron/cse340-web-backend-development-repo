// Needed Resources
const express = require("express")
const router = new express.Router()
const accountController = require("../controllers/accountController")
const utilities = require("../utilities")
const regValidate = require('../utilities/account-validation')

/* ***************************
 *  Account Routes
 * ************************** */
// Default route - account management view
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagement))
// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin))
// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister))
// Process the registration data
router.post(
  "/register",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Logout route
router.get("/logout", utilities.handleErrors(accountController.accountLogout))

// Route to build account update view
router.get("/update/:account_id", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountUpdate))

// Process the account update
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.updateAccountRules(),
  regValidate.checkAccountData,
  utilities.handleErrors(accountController.updateAccount)
)

// Process the password change
router.post(
  "/update-password",
  utilities.checkLogin,
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword)
)

module.exports = router;