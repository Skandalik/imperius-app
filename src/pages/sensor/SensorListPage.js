import React from 'react';
import SensorList from '../../components/sensor/SensorList';
import {connect} from 'react-redux';
import {
    checkStatusSensor,
    deleteSensor,
    fetchSensors,
    refetchSensors, setStateSensor,
    setStatusSensor
} from '../../actions/SensorActions';
import ReactInterval from 'react-interval';
import {setValue} from "../../actions/HelperActions";
import {getToken} from "../../utils/auth/AuthService";

class SensorListPage extends React.Component {
    componentDidMount() {
        this.props.fetchSensors();
    }

    render() {
        console.log(getToken());
        return (
            <div>
                <ReactInterval
                    timeout={5000}
                    enabled={true}
                    callback={() => this.props.refetchSensors()}
                />

                <h2>Manage your sensors</h2>
                <SensorList
                    sensors={this.props.sensors}
                    loading={this.props.loading}
                    deleteSensor={this.props.deleteSensor}
                    checkStatusSensor={this.props.checkStatusSensor}
                    setStatusSensor={this.props.setStatusSensor}
                    setValue={this.props.setValue}
                    setStateSensor={this.props.setStateSensor}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sensors: state.sensorStore.sensors,
        loading: state.sensorStore.loading,
    };
}

export default connect(mapStateToProps, {
    refetchSensors,
    fetchSensors,
    deleteSensor,
    checkStatusSensor,
    setStatusSensor,
    setValue,
    setStateSensor
})(SensorListPage);
