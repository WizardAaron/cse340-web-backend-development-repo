const invModel = require("../models/inventory-model")
const utilities = require("../utilities")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
    const classification_id = req.params.classificationID
    const data = await invModel.getInventoryByClassificationId(classification_id)
    const grid = await utilities.buildClassificationGrid(data)
    let nav = await utilities.getNav()
    const className = data[0].classification_name
    res.render("./inventory/classification", {
        title: className + " vehicles",
        nav,
        grid,
    })
}

/* ***************************
 *  Build inventory item detail view
 * ************************** */
invCont.buildVehicleDetail = async function (req, res, next) {
    const inventory_id = req.params.inventoryID
    const vehicle = await invModel.getInventoryById(inventory_id)
    const detail = await utilities.buildVehicleDetail(vehicle)
    let nav = await utilities.getNav()
    res.render("./inventory/detail", {
        title: vehicle.inv_year + " " + vehicle.inv_make + " " + vehicle.inv_model,
        nav,
        detail,
    })
}

/* ***************************
 * Function that throws a 500 error to test the error handler
 * ************************** */
invCont.throwError = async function (req, res, next) {
    throw new Error("This is a test error.")
}

module.exports = invCont