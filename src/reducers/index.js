import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SensorReducer from './SensorReducer';
import RoomReducer from './RoomReducer';
import ManualBehaviorReducer from "./ManualBehaviorReducer";
import ScheduledBehaviorReducer from "./ScheduledBehaviorReducer";
import JobReducer from "./JobReducer";

const reducers = {
    sensorStore: SensorReducer,
    roomStore: RoomReducer,
    manualBehaviorStore: ManualBehaviorReducer,
    scheduledBehaviorStore: ScheduledBehaviorReducer,
    jobStore: JobReducer,
    form: formReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;