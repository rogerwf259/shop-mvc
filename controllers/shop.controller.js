const Product = require('../models/product');
const Cart = require('../models/cart');

const getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', { 
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products'
        });
    });
};

const getProduct = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            pageTitle: product.title,
            product: product,
            path: '/products'
        });
    });
}

const getIndex = (req, res) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            pageTitle: 'Shop',
            path: '/',
            prods: products
        });
    });
};

const getCart = (req, res) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products) {
                const cartPorductData = cart.products.find(prod => prod.id === product.id);
                if (cartPorductData) {
                    cartProducts.push({ productData: product, quantity: cartPorductData.quantity });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Your Shopping Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    });
}

const postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

const postCartDelete = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deletePorduct(prodId, product.price);
        res.redirect('/cart');
    });
}

const getCheckout = (req, res) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
}

const getOrders = (req, res) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/orders'
    });
}

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout,
    getOrders,
    getProduct,
    postCart,
    postCartDelete
}