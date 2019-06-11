const fs = require('fs');
const path = require('path');
const cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data', 'products.json'
);

const getProductsFromFile = callback => {
    fs.readFile(p, (err, fileContent) => {
        if (err){
            return callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}

class Product {
    constructor(id, name, imageUrl, description, price){
        this.id = id;
        this.title = name;
        this.image = imageUrl;
        this.description = description;
        this.price = price;
    }


    save() {
        getProductsFromFile(products => {    
            if (this.id){
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    if (err) { return console.log(err); }
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                        if (err) { return console.log(err); }
                });
            }
        });
    }
    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(p => p.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    cart.deletePorduct(id, product.price);
                }
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
}

module.exports = Product;