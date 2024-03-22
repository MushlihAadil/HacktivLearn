
// middleware routers
// router.use(function (req, res, next) {
//     if (!req.session.userId) {
//         const error = `Please Login First!`
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// })

const isLoggedIn = function (req, res, next) {
    if (!req.session.userId) {
        const error = `Please Login First!`
        res.redirect(`/login?errors=${error}`)
    } else {
        next()
    }
};

// // middleware untuk admin
// router.use(function (req, res, next) {
//     if (req.session.userId && req.session.role !== 'admin') {
//         const error = `You have no access`
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// })

const isAdmin = function (req, res, next) {
    if (req.session.userId && req.session.role !== 'admin') {
        const error = `Only Administrators can access this page! Go back to study`
        res.redirect(`/login?errors=${error}`)
    } else {
        next()
    }
}; // nanti tinggal masukan isAdmin ke dalam router khusus buat admin

module.exports = { isLoggedIn, isAdmin }