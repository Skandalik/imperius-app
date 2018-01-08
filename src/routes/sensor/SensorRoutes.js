import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SensorListPage from '../../pages/sensor/SensorListPage';
import SensorFormPage from "../../pages/sensor/SensorFormPage";
import BehaviorFormPage from "../../pages/behavior/BehaviorFormPage";
import BehaviorListPage from "../../pages/behavior/BehaviorListPage";
class SensorRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/sensor" component={SensorListPage} exact key="sensor_list" />
          <Route path="/sensor/edit/:id" component={SensorFormPage} key="sensor_edit" />
          <Route path="/sensor/:id/behaviors" component={BehaviorListPage} exact key="sensor_behavior" />
          <Route path="/sensor/:id/behaviors/add" component={BehaviorFormPage} key="sensor_behavior_create" />
          <Route path="/sensor/:id/behaviors/edit/:behaviorId" component={BehaviorFormPage} key="sensor_behavior_edit" />
        </Switch>
      </div>
    );
  }
}

export default SensorRoutes;
