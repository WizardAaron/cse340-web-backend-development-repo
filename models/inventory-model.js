const pool = require("../database/index")

/* ***************************
 *  Get all classification data
 * ************************** */
async function getClassifications(){
    return await pool.query("SELECT * FROM public.classification ORDER BY classification_name")
}

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id, options = {}) {
    try {
        let sql = `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.classification_id = $1`;
        let params = [classification_id];
        let idx = 2;
        // Filtering
        if (options.minPrice != null) {
            sql += ` AND i.inv_price >= $${idx++}`;
            params.push(options.minPrice);
        }
        if (options.maxPrice != null) {
            sql += ` AND i.inv_price <= $${idx++}`;
            params.push(options.maxPrice);
        }
        if (options.minMiles != null) {
            sql += ` AND i.inv_miles >= $${idx++}`;
            params.push(options.minMiles);
        }
        if (options.maxMiles != null) {
            sql += ` AND i.inv_miles <= $${idx++}`;
            params.push(options.maxMiles);
        }
        // Sorting
        sql += getOrderByClause(options.order);
        const data = await pool.query(sql, params);
        return data.rows;
    } catch (error) {
        console.error("getclassificationsbyid error: " + error)
    }
}

/* ***************************
 *  Get all inventory items with classification_name (for All Vehicles page)
 * ************************** */
async function getAllInventoryWithClassification(options = {}) {
    try {
        let sql = `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id WHERE 1=1`;
        let params = [];
        let idx = 1;
        // Filtering
        if (options.minPrice != null) {
            sql += ` AND i.inv_price >= $${idx++}`;
            params.push(options.minPrice);
        }
        if (options.maxPrice != null) {
            sql += ` AND i.inv_price <= $${idx++}`;
            params.push(options.maxPrice);
        }
        if (options.minMiles != null) {
            sql += ` AND i.inv_miles >= $${idx++}`;
            params.push(options.minMiles);
        }
        if (options.maxMiles != null) {
            sql += ` AND i.inv_miles <= $${idx++}`;
            params.push(options.maxMiles);
        }
        // Sorting
        sql += getOrderByClause(options.order);
        const data = await pool.query(sql, params);
        return data.rows;
    } catch (error) {
        console.error("getAllInventoryWithClassification error: " + error)
    }
}
// Helper for ORDER BY clause
function getOrderByClause(order) {
    switch (order) {
        case "oldest_listing":
            return " ORDER BY i.inv_id ASC";
        case "lowest_price":
            return " ORDER BY i.inv_price ASC, i.inv_id DESC";
        case "highest_price":
            return " ORDER BY i.inv_price DESC, i.inv_id DESC";
        case "name_asc":
            return " ORDER BY i.inv_make ASC, i.inv_model ASC, i.inv_id DESC";
        case "name_desc":
            return " ORDER BY i.inv_make DESC, i.inv_model DESC, i.inv_id DESC";
        case "newest_vehicle":
            return " ORDER BY i.inv_year DESC, i.inv_id DESC";
        case "oldest_vehicle":
            return " ORDER BY i.inv_year ASC, i.inv_id DESC";
        case "newest_listing":
        default:
            return " ORDER BY i.inv_id DESC";
    }
}

/* ***************************
 *  Get inventory item by inventory_id
 * ************************** */
async function getInventoryById(inventory_id) {
    try {
        const data = await pool.query(
            `SELECT * FROM public.inventory AS i
            JOIN public.classification AS c
            ON i.classification_id = c.classification_id
            WHERE i.inv_id = $1`,
            [inventory_id]
        )
        return data.rows[0]
    } catch (error) {
        console.error("getInventoryById error: " + error)
    }
}

/* ***************************
 *  Add new classification
 * ************************** */
async function addClassification(classification_name) {
    try {
        const sql = "INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *"
        return await pool.query(sql, [classification_name])
    } catch (error) {
        console.error("addClassification error: " + error)
        return null
    }
}

/* ***************************
 *  Add new inventory item
 * ************************** */
async function addInventory(inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
    try {
        const sql = "INSERT INTO public.inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *"
        return await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id])
    } catch (error) {
        return null
    }
}

/* ***************************
 *  Update inventory item
 * ************************** */
async function updateInventory(inv_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) {
    try {
        const sql = "UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_year = $3, inv_description = $4, inv_image = $5, inv_thumbnail = $6, inv_price = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *"
        const data = await pool.query(sql, [inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id, inv_id])
        return data.rows[0]
    } catch (error) {
        console.error("model error: " + error)
        return null
    }
}

/* ***************************
 *  Delete inventory item
 * ************************** */
async function deleteInventoryItem(inv_id) {
    try {
        const sql = "DELETE FROM public.inventory WHERE inv_id = $1"
        const data = await pool.query(sql, [inv_id])
        return data
    } catch (error) {
        console.error("deleteInventoryItem error: " + error)
        return null
    }
}

module.exports = {getClassifications, getInventoryByClassificationId, getInventoryById, addClassification, addInventory, updateInventory, deleteInventoryItem, getAllInventoryWithClassification};