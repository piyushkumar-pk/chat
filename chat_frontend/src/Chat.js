import React, { useEffect, useState } from "react";
import { API } from './config';
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import SunEditor from "suneditor-react";

function Chat() {
    const history = useHistory();
    const [chatData, setChatData] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("chat_token")) {
            history.push("/");
            notify_error("Login to chat..")
        }
        fetchChatData();
    }, [chatData]);


    function fetchChatData() {

        const options = {
            headers: { authorization: localStorage.getItem("chat_token") },
        };

        axios.post(API + "view-message", {}, options)
            .then(res => {
                if (res.data.status === "success") {
                    setChatData(res.data.result);
                } else {
                    notify_error(res.data.message);
                }
            }).catch(err => console.log(err));
    }
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
        const options = {
            headers: { authorization: localStorage.getItem("chat_token") },
        };
        axios.post(API + "send-message", {
            message: message,
            sender: localStorage.getItem("chat_user_id"),
        }, options)
            .then(res => {
                if (res.data.status === "success") {
                    fetchChatData();
                } else {
                    notify_error(res.data.message);
                }
            }).catch(err => console.log(err));
    };
    const formateDate = (date) => {
        return moment(date).format("YYYY-MM-DD hh:mm")
    };

    const chatForm = () => (
        <div className="container" style={{ textAlign: 'center', marginTop: '10%' }}>
            <div>
                <div className="card" style={{ margin: '5%', marginTop: 0 }}>
                    <div className="mt-3">
                        <div className="h3">Welcome to World Chat</div>
                        <hr />
                        {chatData && chatData.map((c, i) => {
                            if (localStorage.getItem("chat_user_id") === c.sender._id) {
                                return <div key={i} style={{ textAlign: 'right' }}>
                                    <span className="small badge badge-light">{formateDate(c.createdAt)}</span>
                                    <br />
                                    <p className="btn btn-primary mr-4" style={{ height: '40px' }} >
                                        <div dangerouslySetInnerHTML={{ __html: c.message && c.message }}>
                                        </div>
                                    </p>
                                </div>
                            } else {
                                return <div key={i} className="ml-4" style={{ textAlign: 'left' }}>
                                    <span className="small badge badge-primary">{c.sender.email}</span> <span className="small badge badge-light">{formateDate(c.createdAt)}</span>
                                    <p><div dangerouslySetInnerHTML={{ __html: c.message && c.message }}>
                                    </div></p>
                                </div>
                            }
                        })}</div>
                    <hr />
                    <div className="fixed">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <SunEditor
                                setContents={message}
                                onChange={(e) => setMessage(e)}
                                setOptions={{
                                    height: 200,
                                    buttonList: [
                                        ['bold', 'italic', 'strike', 'link', 'list', 'superscript', 'removeFormat', 'blockquote', 'image','video']
                                    ],
                                }}
                            />
                        </div>
                        <div className="mt-5 mb-5" style={{ textAlign: 'center', }}>
                            <button type="submit" style={{ width: "40%" }} className="btn btn-primary"> <i className="fas fa-plus"></i> Send message</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
    const profile = () => (
        <div></div>
    );

    return (
        <div>
            {chatForm()}
        </div>
    )
}

export default Chat;