import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import SensorRoutes from '../routes/sensor/SensorRoutes';
import RoomRoutes from '../routes/room/RoomRoutes';
import JobRoutes from "./job/JobRoutes";
import LoginPage from "../pages/login/LoginPage";

class Main extends Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route path="/login" exact component={LoginPage} key="login" />
          <Route path="/sensor" component={SensorRoutes} key="sensor" />
          <Route path="/room" component={RoomRoutes} key="room" />
          <Route path="/job" component={JobRoutes} key="job" />
        </Switch>
      </div>
    );
  }
}

export default Main;