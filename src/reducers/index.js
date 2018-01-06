import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SensorReducer from './SensorReducer';
import RoomReducer from './RoomReducer';
import BehaviorReducer from "./BehaviorReducer";

const reducers = {
    sensorStore: SensorReducer,
    roomStore: RoomReducer,
    behaviorStore: BehaviorReducer,
    form: formReducer
};

const rootReducer = combineReducers(reducers);

export default rootReducer;