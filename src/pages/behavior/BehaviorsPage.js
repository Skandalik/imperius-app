import React from 'react';
import {connect} from 'react-redux';
import {deleteManualBehavior, fetchManualBehaviors} from "../../actions/ManualBehaviorActions";
import {deleteScheduledBehavior, fetchScheduledBehaviors} from "../../actions/ScheduledBehaviorActions";
import {Button, Dimmer, Icon, Loader, Menu, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {fetchSensor} from "../../actions/SensorActions";
import ScheduledBehaviorList from "../../components/behavior/ScheduledBehaviorList";
import ManualBehaviorList from "../../components/behavior/ManualBehaviorList";

class BehaviorsPage extends React.Component {
    state = {
        sensorId: this.props.match.params.id,
        activeItem: 'manual_behaviors'
    };

    handleItemClick = (e, {name}) => {
        if (name === 'manual_behaviors') {
            this.setState({activeItem: name})
        } else {
            this.setState({activeItem: name})
        }
    };

    handleBehaviorShow = (name) => {
        if (name === 'manual_behaviors') {
            return <ManualBehaviorList id={this.state.id} sensor={this.props.sensor}
                                       behaviors={this.props.manualBehaviors}
                                       deleteBehavior={this.props.deleteManualBehavior}
            />
        } else {
            return <ScheduledBehaviorList id={this.state.id} sensor={this.props.sensor}
                                          behaviors={this.props.scheduledBehaviors}
                                          deleteBehavior={this.props.deleteScheduledBehavior}
            />
        }
    };

    componentDidMount() {
        const id = this.state.sensorId;
        if (id) {
            this.props.fetchSensor(id);
        }
        this.props.fetchManualBehaviors(id);
        this.props.fetchScheduledBehaviors(id);
    }

    render() {
        const minHeight = {minHeight: 200, width: 'auto', margin: 'auto 0'};
        return (
            <div>
                <h2>Behaviors for sensor</h2>
                <Button primary disabled={this.props.loading} as={Link}
                        to={`/sensor/${this.props.sensor.id}/${this.state.activeItem}/add`} icon={'plus'}
                        content={'Add new behavior'}/>
                <Button as={Link} to={'/sensor'} icon={'arrow left'}
                        content={'Go back'}/>
                <br/>
                <br/>
                <Menu attached='top' tabular>
                    <Menu.Item name='manual_behaviors' active={this.state.activeItem === 'manual_behaviors'}
                               onClick={this.handleItemClick}/>
                    <Menu.Item name='scheduled_behaviors' active={this.state.activeItem === 'scheduled_behaviors'}
                               onClick={this.handleItemClick}/>
                </Menu>
                <Segment attached='bottom' centered='true' style={minHeight}>
                    <Dimmer inverted active={this.props.loading}>
                        <Loader inverted content='Loading behaviors...'/>
                    </Dimmer>
                    {this.handleBehaviorShow(this.state.activeItem)}
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sensor: state.sensorStore.sensor,
        loading: state.manualBehaviorStore.loading,
        manualBehaviors: state.manualBehaviorStore.manualBehaviors,
        scheduledBehaviors: state.scheduledBehaviorStore.scheduledBehaviors
    };
}

export default connect(mapStateToProps, {
    fetchSensor,
    deleteManualBehavior,
    deleteScheduledBehavior,
    fetchManualBehaviors,
    fetchScheduledBehaviors
})(BehaviorsPage);
