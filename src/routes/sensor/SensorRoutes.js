import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SensorListPage from '../../pages/sensor/SensorListPage';
import SensorFormPage from "../../pages/sensor/SensorFormPage";
import BehaviorPage from "../../pages/behavior/BehaviorPage";
class SensorRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/sensor" component={SensorListPage} exact key="sensor_list" />
          <Route path="/sensor/edit/:id" component={SensorFormPage} key="sensor_edit" />
          <Route path="/sensor/:id/behavior" component={BehaviorPage} key="sensor_behavior" />
        </Switch>
      </div>
    );
  }
}

export default SensorRoutes;
