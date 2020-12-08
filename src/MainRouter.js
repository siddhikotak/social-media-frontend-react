import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute"

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route path="/signup" component={Signup}></Route>
            <Route path="/signin" component={Signin}></Route>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path="/user/:userId" component={Profile}></PrivateRoute>
            
        </Switch>
    </div>
);

export default MainRouter