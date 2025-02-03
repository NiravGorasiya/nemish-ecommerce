const { loginController } = require("../../controller/Admin/Users/User");

const router = require("express").Router();

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password);
    try {
        const { token } = await loginController({ email, password });
        if (token) {
            res.send({ token })
        }
    } catch (error) {
        return next(error);
    }
})

module.exports = router;