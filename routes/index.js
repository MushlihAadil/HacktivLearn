const PageController = require("../controllers/PageController");
const UserController = require("../controllers/UserController");
const { isLoggedIn, isAdmin } = require("./middlewares/auth");

const router = require(`express`).Router();


router.get('/', PageController.landingPage);
// nampilin welcome page untuk enter doang


// login page routers
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin);


// logout page router
router.get('/logout', UserController.getLogout);

// router.use(isLoggedIn) ini bisa dihapus
// router.use(isAdmin)


router.get('/categories', PageController.getCategory);
router.get('/categories/:categoryId', PageController.getOneCategoryDetails)

router.get('/courses', PageController.getCourses); // nampilin semua courses
router.get('/courses/:courseId', isLoggedIn, PageController.getOneCourseDetails); // nampilin isi profiles dari satu course dan detail dari satu course itu
router.get('/courses/:courseId/edit', isLoggedIn, isAdmin, PageController.getEditCourse); // nampilin form edit duration course
router.post('/courses/:courseId/edit', isLoggedIn, isAdmin, PageController.postEditCourse); // update form edit duration course

router.get('/profiles', isLoggedIn, isAdmin, PageController.getProfiles);
// // nampilin semua profiles hanya admin yang bisa melihat page ini, tinggal masukin middleware

router.get('/profiles/add', isLoggedIn, isAdmin, PageController.getAddUser);
router.post('/profiles/add', isLoggedIn, isAdmin, PageController.postAddUser);


router.get('/profiles/:id/delete/', isLoggedIn, isAdmin, PageController.deleteProfile);
// //dari web yang sama bisa delete profile dari /profiles


module.exports = router;