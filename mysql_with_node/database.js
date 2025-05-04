const { createPool } = require("mysql");

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "app_crud",
    connectionLimit: 10
});

// Create a new product
const createProduct = (data) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO products SET ?', data, (err, result) => {
            if (err) {
                return reject(err);
            }
            // Get the newly created product
            pool.query('SELECT * FROM products WHERE product_id = ?', [result.insertId], (err, products) => {
                if (err) {
                    return reject(err);
                }
                resolve(products[0]);
            });
        });
    });
};
// Create a product
// createProduct({ name: 'mangoose', price: 29.99,qty:2,description:"green mongoo" })
//     .then(result => console.log('Product created:'))
//     .catch(err => console.error('Error creating product:', err));

// Read a product by ID
const getProductById = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products WHERE product_id = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result[0]);
        });
    });
};
// Get product by ID
// getProductById(4)
//     .then(product => console.log('Product found:'))
//     .catch(err => console.error('Error getting product:', err));

// Get all products
const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products', (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

// Update a product
const updateProduct = (id, data) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE products SET ? WHERE product_id = ?', [data, id], (err, result) => {
            if (err) {
                return reject(err);
            }
            // Get the updated product
            pool.query('SELECT * FROM products WHERE product_id = ?', [id], (err, products) => {
                if (err) {
                    return reject(err);
                }
                resolve(products[0]);
            });
        });
    });
};
// Update a product
// updateProduct(1, { name: 'Updated Product', price: 39.99 })
//     .then(result => console.log('Product updated:'))
//     .catch(err => console.error('Error updating product:', err));


// Delete a product
const deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM products WHERE product_id = ?', [id], (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
// Delete a product
// deleteProduct(1)
//     .then(result => console.log('Product deleted:'))
//     .catch(err => console.error('Error deleting product:', err));

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    deleteProduct
};