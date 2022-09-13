import React, { useState } from "react";
import { API } from './config';
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

    axios.post(API + "login", {
      password: password,
      email: email,
    })
      .then(res => {
        if (res.data.status === "success") {
          localStorage.setItem("chat_token", res.data.token);
          localStorage.setItem("chat_user_id", res.data.result._id);
          localStorage.setItem("chat_full_name", res.data.result.full_name);
          notify_success(res.data.message);
          history.push("/chat");
        } else {
          notify_error(res.data.message);
        }
      }).catch(err => console.log(err));
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '10%' }}>
      <div>
        <div className="card" style={{ margin: '5%', marginTop: 0 }}>
          <div className="h3 mt-3" style={{ fontFamily: "Mulish sans-serif" }}>Login to Chat</div>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className="row container">
              <div className="col-lg-12 mt-3">
                <label className="form-label h5 text-left">Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div className="col-lg-12 mt-3">
                <label className="form-label h5 text-left">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="mt-5 mb-5" style={{ textAlign: 'center', }}>
              <button type="submit" style={{ width: "40%" }} className="btn btn-primary"> <i className="fas fa-plus"></i> Sign in</button>
            </div>
          </form>

          <div >
            <Link to={"/register"}><p className="font-weight-bold">Register Yourself</p></Link>
          </div>
        </div>
      </div>
    </div>
  );
};


export default App;
