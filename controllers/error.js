const get404 = (req, res) => {
    res.status(404).render('404', { pageTitle: 'Page not Found', path: '/404'});
};

module.exports = {
    get404
};