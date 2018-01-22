import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import SensorRoutes from '../routes/sensor/SensorRoutes';
import RoomRoutes from '../routes/room/RoomRoutes';
import JobRoutes from "./job/JobRoutes";
import history from "../history";
import {isLogged, removeToken} from "../utils/auth/AuthService";
import {login, checkAuthorization} from "../actions/AuthActions";
import {connect} from "react-redux";
import NotFound from "../pages/NotFound";

class Authorized extends Component {
    componentWillMount() {
        if (!isLogged()) {
            localStorage.setItem('message', 'You need to log in first!');
            history.push('/login');
        } else {
            this.props.checkAuthorization();
        }
    }

    render() {
        if (this.props.errors ) {
            removeToken();
            localStorage.setItem('message', 'Your authentication token has expired!');
            history.push('/login');
        }
        return (
            <div className="container">
                <Switch>
                    <Route path="/sensor" component={SensorRoutes} key="sensor"/>
                    <Route path="/room" component={RoomRoutes} key="room"/>
                    <Route path="/job" component={JobRoutes} key="job"/>
                    <Route path="*" component={NotFound} key="not_found"/>
                </Switch>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        authorize: state.authStore.authorize,
        errors: state.authStore.errors
    };
}

export default connect(mapStateToProps, {login, checkAuthorization})(Authorized);