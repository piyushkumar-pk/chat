import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App"
import Chat from "./Chat";
import Register from "./Register"

const Routes = () => {
    return (<BrowserRouter>
        <Switch>
            <Route path='/' exact component={App} />
            <Route path="/register" exact component={Register} />
            <Route path="/chat" exact component={Chat} />
        </Switch>
    </BrowserRouter>)
};


export default Routes;