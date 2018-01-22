import React from 'react';
import {Switch, Route} from 'react-router-dom';
import SensorListPage from '../../pages/sensor/SensorListPage';
import SensorFormPage from "../../pages/sensor/SensorFormPage";
import BehaviorsPage from "../../pages/behavior/BehaviorsPage";
import ManualBehaviorFormPage from "../../pages/behavior/ManualBehaviorFormPage";
import ScheduledBehaviorFormPage from "../../pages/behavior/ScheduledBehaviorFormPage";

class SensorRoutes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/sensor" component={SensorListPage} exact key="sensor_list"/>
                    <Route path="/sensor/edit/:id" component={SensorFormPage} key="sensor_edit"/>
                    <Route path="/sensor/:id/behaviors" component={BehaviorsPage} exact key="sensor_behaviors"/>
                    <Route path="/sensor/:id/manual_behaviors/add" component={ManualBehaviorFormPage}
                           key="sensor_manual_behavior_create"/>
                    <Route path="/sensor/:id/scheduled_behaviors/add" component={ScheduledBehaviorFormPage}
                           key="sensor_scheduled_behavior_create"/>
                    <Route path="/sensor/:id/manual_behaviors/edit/:behaviorId" component={ManualBehaviorFormPage}
                           key="sensor_manual_behavior_edit"/>
                    <Route path="/sensor/:id/scheduled_behaviors/edit/:behaviorId" component={ScheduledBehaviorFormPage}
                           key="sensor_scheduled_behavior_edit"/>
                </Switch>
            </div>
        );
    }
}

export default SensorRoutes;
