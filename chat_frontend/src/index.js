import React from 'react';
import ReactDOM from "react-dom/client";
import Routes from './Routes';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "suneditor/dist/css/suneditor.min.css";
toast.configure();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Routes />);

