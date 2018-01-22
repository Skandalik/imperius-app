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
import {Button, Message} from "semantic-ui-react";
import {
    getFromStorage,
    handleShowMessage,
    existInStorage, isFalse
} from "../../utils/messages/MessageService";

class SensorListPage extends React.Component {
    state = {
        visible: true
    }

    componentWillMount() {
        if (!existInStorage('sensorInfoVisible')) {
            handleShowMessage();
            this.setState({visible : true});
        }

        if (getFromStorage('sensorInfoVisible') === '0') {
            this.setState({visible : false});
        } else {
            this.setState({visible : true});
        }
    }

    componentDidMount() {
        this.props.fetchSensors();
    }

    handleDismiss = () => {
        this.setState({visible : false});
        localStorage.setItem('sensorInfoVisible', '0');
    };

    handleShowMessage = () => {
        this.setState({visible : true});
        localStorage.setItem('sensorInfoVisible', '1');
    };

    render() {
        return (
            <div>
                <ReactInterval
                    timeout={5000}
                    enabled={true}
                    callback={() => this.props.refetchSensors()}
                />

                <h2>Manage your sensors</h2>

                {this.state.visible ?
                    <Message
                        onDismiss={this.handleDismiss}
                        color={'green'}
                        icon='info circle'
                        header='Sensor adding information'
                        content='Your home sensors are added automatically. Just run "Sensors scan" job in Jobs tab and power on your sensor!'
                    /> : ''
                }

                {!this.state.visible ?
                    <div>
                        <Button onClick={this.handleShowMessage} content={'Information'} color={'red'}
                                icon={'info circle'}/>
                        <br/>
                    </div>
                    : ''}

                <br/>
                <br/>
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
