import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import SensorRoutes from '../routes/sensor/SensorRoutes';
import RoomRoutes from '../routes/room/RoomRoutes';
import JobRoutes from "./job/JobRoutes";
import LoginPage from "../pages/login/LoginPage";
import MainPage from "../pages/MainPage";
import NotFound from "../pages/NotFound";
import Authorized from "./Authorized";
import ProfilePage from "../pages/ProfilePage";

class Main extends Component {
    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path="/" exact component={MainPage} key="main_page"/>
                    <Route path="/login" exact component={LoginPage} key="login"/>
                    <Route path="/profile" exact component={ProfilePage} key="password"/>
                    <Route component={Authorized} key="authorized"/>
                    <Route path="*" component={NotFound} key="not_found"/>
                </Switch>
            </div>
        );
    }
}

export default Main;