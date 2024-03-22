const { User, Profile } = require('../models')
const bcrypt = require('bcryptjs')
const { sendEmail } = require('../nodemailer/sendMail')


class UserController {

    static registerForm(req, res) {
        res.render(`auth-pages/register-form`)
    }

    static postRegister(req, res) {
        const { username, email, password, role, fullName, gender } = req.body
        let errors = []
        if (username === "") {
            errors.push(`Username cannot be empty!`)
        }
        if (email === "") {
            errors.push(`email cannot be empty!`)
        }
        if (password === "") {
            errors.push(`password cannot be empty!`)
        }
        if (role === "") {
            errors.push(`role cannot be empty!`)
        }
        if (fullName === "") {
            errors.push(`fullName cannot be empty!`)
        }

        if (errors.length > 0) {
            throw errors
        }

        User.create({ username, email, password, role })
            .then(Profile.create({ fullName, gender })
                .then(sendEmail(email))
                .then(newUser => {
                    res.redirect('/login')
                }))
            .catch(err => res.send(err))
    }

    static loginForm(req, res) {
        const { errors } = req.query
        res.render(`auth-pages/login-form`, { errors })
    }

    static postLogin(req, res) {
        const { username, password } = req.body
        User.findOne({
            where: { username }
        })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)

                    if (isValidPassword) {

                        req.session.userId = user.id
                        req.session.role = user.role

                        return res.redirect('/categories')
                    } else {
                        const error = `invalid username or password`
                        return res.redirect(`/login?errors=${error}`)
                    }
                } else {
                    const error = `no username ${username} found`
                    return res.redirect(`/login?errors=${error}`)
                }
            })
            .catch(err => res.send(err))
    }



    static getLogout(req, res) {
        req.session.destroy((err) => {
            if (err) console.log(err)
            else {
                res.redirect('/login')
            }
        })
    }

}

module.exports = UserController