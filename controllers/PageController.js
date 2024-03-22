const { User, Course, Category, Profile } = require('../models')
const convert = require('../helper/durationConvert')

class PageController {

    static async landingPage(req, res) {
        try {
            res.render(`landingPage`)
        } catch (error) {
            res.send(error)
        }

    }

    static async getCourses(req, res) {
        try {
            let option = {};
            if (req.query.name) {
                option.name = {
                    [Op.iLike]: `${req.query.name}%`
                }
            }

            let data = await Course.findAll({
                where: option
            })
            // res.send(data)
            res.render('showCourses', { data });
        } catch (error) {
            res.send(error)
        }

    }

    static async getCategory(req, res) {
        try {
            let data = await Category.findAll({
                include: Course,
            })
            // res.send(data)
            res.render('showCategory', { data });
        } catch (error) {
            res.send(error)
        }
    }

    static async getOneCategoryDetails(req, res) {
        try {
            let { categoryId } = req.params
            let data = await Category.findAll({
                include: Course,
                where: { id: categoryId }
            })
            data = data[0]
            // res.send(data)
            res.render('detailCategories', { data });
        } catch (error) {
            res.send(error)
        }
    }

    static async getOneCourseDetails(req, res) {
        try {
            let { courseId } = req.params
            let data = await Course.findAll({
                include: Category,
                where: { id: courseId }
            })
            data = data[0]
            // res.send(data)
            res.render('detailCourse', { data, convert });
        } catch (error) {
            res.send(error)
        }
    }

    static async getEditCourse(req, res) {
        try {
            let { courseId } = req.params
            let { error, path } = req.query
            let data = await Course.findAll({
                include: Category,
                where: { id: courseId }
            })
            data = data[0]
            res.render('editCourse', { data, error, path });
        } catch (error) {
            res.send(error)
        }
    }

    static async postEditCourse(req, res) {
        try {
            let { courseId } = req.params
            let { duration } = req.body
            // res.send(req.body)

            await Course.update({ duration }, {
                where: { id: courseId }
            })
            res.redirect(`/courses/${courseId}`)
        } catch (error) {
            // res.send(error)
            let { courseId } = req.params
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let err = error.errors.map((e) => {
                    return e.message
                })
                let path = error.errors.map((e) => {
                    return e.path
                })
                res.redirect(`/courses/${courseId}/edit?error=${err}&path=${path}`);
            } else {
                res.send(error);
            }
        }
    }



    static async getProfiles(req, res) {
        try {
            let { name } = req.query
            let option = {};
            if (req.query.fullName) {
                option.fullName = {
                    [Op.iLike]: `${req.query.fullName}%`
                }
            }

            let data = await Profile.findAll({
                include: User,
                where: option,
                order: [['id', 'ASC']]
            })

            // res.send(data)
            res.render('showProfile', { data, name })
        } catch (error) {
            res.send(error)
        }

    }

    static async getAddUser(req, res) {
        try {
            let { error, path } = req.query
            let data = await Profile.findAll({
                include: User,
            })
            // res.send(data)
            res.render('addUser', { data, error, path });
        } catch (error) {
            res.send(error);
        }
    }

    static async postAddUser(req, res) {
        try {
            let { fullName, gender, username, role, email, password } = req.body;
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
            // res.send(req.body)
            await Profile.create({ fullName, gender })
            await User.create({ username, email, password, role })
            res.redirect('/profiles');
        } catch (error) {
            let { storeId } = req.params
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                let err = error.errors.map((e) => {
                    return e.message
                })
                let path = error.errors.map((e) => {
                    return e.path
                })
                res.redirect(`/stores/${storeId}/employees/add?error=${err}&path=${path}`);
            } else {
                res.send(error);
            }
        }
    }

    static async deleteProfile(req, res) {
        try {
            let { id } = req.params
            let data = await Profile.findByPk(id)
            let oneProfile = await Profile.findByPk(id)
            let oneUser = await User.findByPk(id)
            // res.send(oneUser)
            await oneProfile.destroy()
            await oneUser.destroy()
            res.redirect(`/profiles?name=${data.fullName}`)
        } catch (error) {
            res.send(error)
        }

    }

}

module.exports = PageController