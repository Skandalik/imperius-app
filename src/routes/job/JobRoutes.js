import React from 'react';
import {Route, Switch} from 'react-router-dom';
import RoomFormPage from '../../pages/room/RoomFormPage';
import JobListPage from "../../pages/job/JobListPage";
import NotFound from "../../pages/NotFound";
import JobFormPage from "../../pages/job/JobFormPage";

class RoomRoutes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/job" component={JobListPage} exact key="job_list"/>
                    <Route path="/job/edit/:id" component={JobFormPage} key="job_edit"/>
                    <Route path="/job/*" component={NotFound} key="not_found"/>
                </Switch>
            </div>
        );
    }
}

export default RoomRoutes;
