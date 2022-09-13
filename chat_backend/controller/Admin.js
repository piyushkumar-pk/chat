const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const Users = require('../model/user');
const JWT_SECRET = "HarHarMahadev";
const Chat = require("../model/chat");


exports.create = (req, res) => {
    var where = {};
    where["email"] = req.body.email;
    where["deleted"] = 0;

    Users.findOne(where)
        .then((response) => {
            if (response != null) {
                res.status(200).send({
                    status: "error",
                    message: "Email already in use.",
                });
            } else {
                bcryptjs.genSalt(saltRounds, (err, salt) => {
                    bcryptjs.hash(req.body.password, salt, (err, hash) => {
                        var userdata = new Users({
                            password: hash,
                            email: req.body.email,
                            phone: req.body.phone,
                            full_name: req.body.fullname,
                            address: req.body.address,
                        });
                        userdata.save(function (err, response) {
                            if (err) {
                                res.status(200).send({
                                    status: "error",
                                    message: err,
                                });
                            } else {
                                // console.log(otp,'email_otp')
                                res.status(200).send({
                                    status: "success",
                                    message: "Registration was successfull",
                                });
                            }
                        });
                    });
                });
            }
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error.message,
            });
        });
}

exports.view = (req, res) => {
    var where = {};

    if (req.body.phone) {
        where["phone"] = req.body.phone;
    }

    if (req.body.email) {
        where["email"] = req.body.email;
    }

    Users.find(where)
        .sort("-createdAt")
        .then((response) => {
            Users.find(where).countDocuments(function (err, count) {
                res.status(200).send({
                    status: "success",
                    // token: req.token,
                    result: response,
                    totalCount: count,
                });
            });
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error,
                // token: req.token,
            });
        });
}

exports.singleView = (req, res) => {
    var where = {};

    if (req.body.phone) {
        where["phone"] = req.body.phone;
    }

    if (req.body.email) {
        where["email"] = req.body.email;
    }

    Users.findOne(where)
        .then((response) => {
            res.status(200).send({
                status: "success",
                // token: req.token,
                result: response,
            });
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error,
                // token: req.token,
            });
        });
}


exports.login = (req, res) => {
    var where = {};
    where["email"] = req.body.email;


    Users.findOne(where)
        .then((response) => {
            if (response) {
                bcryptjs.compare(req.body.password, response.password, function (err, result) {
                    if (result == true) {
                        const accessToken = jwt.sign(
                            {
                                email: req.body.email,
                            },
                            JWT_SECRET,
                            {
                                expiresIn: "180000s",
                            }
                        );

                        res.status(200).send({
                            status: "success",
                            message: "Logged in",
                            token: accessToken,
                            result: response,
                        });
                    } else {
                        res.status(200).send({
                            status: "error",
                            message: "Invalid email/password",
                        });
                    }
                });
            }
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: "Invalid email/password",
                err: error
            });
        });
}



exports.createChat = (req, res) => {
    if (req.body.sender) {
        var chatData = new Chat({
            sender: req.body.sender,
            message: req.body.message
        });
        chatData.save(function (err, response) {
            if (err) {
                res.status(200).send({
                    status: "error",
                    message: err,
                });
            } else {
                res.status(200).send({
                    status: "success",
                    message: "Message sent to the group",
                });
            }
        });
    }
}

exports.viewChat = (req, res) => {
    Chat.find()
        .sort("createdAt")
        .populate("sender")
        .then((response) => {
            res.status(200).send({
                status: "success",
                result: response,
            });
        })
        .catch((error) => {
            res.status(200).send({
                status: "error",
                message: error,
            });
        });
}

