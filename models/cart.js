const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data', 
    'cart.json'
);

class Cart {
    static addProduct(id, productPrice) {
        //Fetch the previous cart find differences and add or remove product as needed
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            //console.log('Cart---- ProductIndexInArray '+existingProductIndex);
            const existingProduct = cart.products[existingProductIndex];
            //console.log('Cart---- Product: '+existingProduct);
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, quantity: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) return console.log(err);
            });
        });
    }
    static deletePorduct(id, prodPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err){
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            //const product = updatedCart.products.find(prod => prod.id === id);
            const productIndex = updatedCart.products.findIndex(prod => prod.id === id);
            const product = updatedCart.products[productIndex];
            if (!product) {
                return;
            }
            const productQuantity = product.quantity;
            if (productQuantity > 1) {
                let UpdatedProduct = { ...product }
                UpdatedProduct.quantity = UpdatedProduct.quantity - 1;
                updatedCart.products = [...updatedCart.products];
                updatedCart.products[productIndex] = UpdatedProduct;
                fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                    if (err) return console.log(err);                    
                });
            } else {
                updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
                updatedCart.totalPrice = updatedCart.totalPrice - prodPrice * productQuantity;
                fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                if (err) return console.log(err);
                });
            }
        });
    }
    static getProducts(callback) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                callback(null);
            } else {
                callback(cart);
            }
        });
    }
}

module.exports = Cart;