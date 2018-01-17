import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RoomListPage from '../../pages/room/RoomListPage';
import RoomFormPage from '../../pages/room/RoomFormPage';
import JobListPage from "../../pages/job/JobListPage";
class RoomRoutes extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/job" component={JobListPage} exact key="job_list" />
          <Route path="/job/create" component={RoomFormPage} key="job_create" />
          <Route path="/job/edit/:id" component={RoomFormPage} key="job_edit" />
        </Switch>
      </div>
    );
  }
}

export default RoomRoutes;
