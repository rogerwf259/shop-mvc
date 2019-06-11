const Product = require('../models/product');

const getAddProduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

const postAppProduct = (req, res) => {
    const title = req.body.title;
    const imgeUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product(null, title, imgeUrl, description, price);
    product.save();
    res.redirect('/');
};

const getEditProduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

const postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImage = req.body.imageUrl;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

const postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}

const getProducts = (req, res) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prods: products
        });
    });
}

module.exports = {
    getAddProduct,
    postAppProduct,
    getProducts, 
    getEditProduct,
    postEditProduct,
    postDeleteProduct
}