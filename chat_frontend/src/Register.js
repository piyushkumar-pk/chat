import React, { useState } from "react";
import { API } from './config';
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";


function Register() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullname, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    function notify_success(msg) {
        toast.success(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    function notify_error(msg) {
        toast.error(msg, {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post(`${API}` + "register", {
            password: password,
            email: email,
            fullname: fullname,
            phone: phone,
            address: address,
        })
            .then(res => {
                if (res.data.status === "success") {
                    notify_success(res.data.message);
                    history.push("/")
                } else {
                    notify_error(res.data.message);
                }
            }).catch(err => console.log(err));
    };
    return <div className="container" style={{ textAlign: 'center', marginTop: '10%' }}>
        <div>
            <div className="card" style={{ margin: '5%', marginTop: 0 }}>
                <div className="h3 mt-3" style={{ fontFamily: "Mulish sans-serif" }}>Register Yourself</div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="row container" style={{ textAlign: 'left' }}>
                        <div className="col-lg-12 mt-3">
                            <label className="form-label h6 text-left">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={fullname}
                                onChange={(e) => {
                                    setFullName(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-lg-12 mt-3">
                            <label className="form-label h6 text-left">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required
                            />
                        </div>
                        <div className="col-lg-12 mt-3">
                            <label className="form-label h6 text-left">Phone Number</label>
                            <input
                                type="tel"
                                className="form-control"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-lg-12 mt-3">
                            <label className="form-label h6 text-left">Address</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
                            />
                        </div>
                        <div className="col-lg-12 mt-3">
                            <label className="form-label h6 text-left">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-5 mb-5" style={{ textAlign: 'center', }}>
                        <button type="submit" style={{ width: "40%" }} className="btn btn-primary"> <i className="fas fa-plus"></i> Register Yourself</button>
                    </div>
                </form>

                <div >
                    <Link to={"/register"}><p className="font-weight-bold">Login Now</p></Link>
                </div>
            </div>
        </div>
    </div>
}

export default Register;