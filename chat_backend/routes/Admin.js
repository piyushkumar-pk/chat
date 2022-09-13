const { create, login, view, singleView, createChat, viewChat } = require("../controller/Admin");

module.exports = function (app) {

    const jwt = require("jsonwebtoken");
    const JWT_SECRET = "HarHarMahadev";

    function generateAccessToken(key) {
        // expires after half and hour (1800 seconds = 30 minutes)
        const accessToken = jwt.sign({ mobile: key }, JWT_SECRET, { expiresIn: "180000s" });
        return accessToken;
    }

    function authenticateToken(req, res, next) {
        //const JWT_SECRET = process.env.JWT_SECRET;
        // Gather the jwt access token from the request header
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[0];
        //console.log(authHeader.split(' '));
        if (token == null) return res.status(200).send({
            status: "error",
            message: "Unauthorized User! Login First",
        });; // if there isn't any token

        jwt.verify(token, JWT_SECRET, (err, mobile) => {
            if (err) return res.status(200).send({
                status: "error",
                error: err,
                message: "something went wrong ...  Please try again."
            });
            req.token = generateAccessToken(mobile);
            next(); // pass the execution off to whatever request the client intended
        });
    }

    app
        .post("/admin/register", create)
        .post("/admin/login", login)
        .post("/admin/view", authenticateToken, view)
        .post("/admin/single-view", authenticateToken, singleView)
        .post("/admin/send-message", authenticateToken, createChat)
        .post("/admin/view-message", authenticateToken, viewChat)

};