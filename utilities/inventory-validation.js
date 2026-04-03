const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Classification Data Validation Rules
 * ********************************* */
validate.classificationRules = () => {
    return [
        body("classification_name")
        .trim()
        .notEmpty()
        .withMessage("Classification name is required.")
        .bail()
        .matches(/^[a-zA-Z0-9]+$/)
        .withMessage("Classification name must not contain spaces or special characters."),
    ]
}

/* ******************************
 * Check data and return errors or continue to classification insert
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("inventory/add-classification", {
            errors,
            title: "Add New Classification",
            nav,
            classification_name,
        })
        return
    }
    next()
}

/*  **********************************
 *  Inventory Data Validation Rules
 * ********************************* */
validate.inventoryRules = () => {
    return [
        body("classification_id")
        .notEmpty()
        .withMessage("Please choose a classification.")
        .bail()
        .isInt()
        .withMessage("Invalid classification."),

        body("inv_make")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a make.")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Make must be at least 3 characters."),

        body("inv_model")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a model.")
        .bail()
        .isLength({ min: 3 })
        .withMessage("Model must be at least 3 characters."),

        body("inv_year")
        .trim()
        .notEmpty()
        .withMessage("Please provide a year.")
        .bail()
        .matches(/^\d{4}$/)
        .withMessage("Year must be a 4-digit number."),

        body("inv_description")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a description."),

        body("inv_image")
        .trim()
        .notEmpty()
        .withMessage("Please provide an image path."),

        body("inv_thumbnail")
        .trim()
        .notEmpty()
        .withMessage("Please provide a thumbnail path."),

        body("inv_price")
        .trim()
        .notEmpty()
        .withMessage("Please provide a price.")
        .bail()
        .isNumeric()
        .withMessage("Price must be a number."),

        body("inv_miles")
        .trim()
        .notEmpty()
        .withMessage("Please provide the mileage.")
        .bail()
        .isNumeric()
        .withMessage("Miles must be a number."),

        body("inv_color")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a color."),
    ]
}

/* ******************************
 * Check data and return errors or continue to inventory insert
 * ***************************** */
validate.checkInventoryData = async (req, res, next) => {
    const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        let classificationList = await utilities.buildClassificationList(classification_id)
        res.render("inventory/add-inventory", {
            errors,
            title: "Add New Vehicle",
            nav,
            classificationList,
            classification_id,
            inv_make,
            inv_model,
            inv_year,
            inv_description,
            inv_image,
            inv_thumbnail,
            inv_price,
            inv_miles,
            inv_color,
        })
        return
    }
    next()
}

module.exports = validate
