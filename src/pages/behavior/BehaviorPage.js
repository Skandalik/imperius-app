import React from 'react';
import {connect} from 'react-redux';
import {fetchBehaviors} from "../../actions/BehaviorActions";
import {Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import SensorBehaviorList from "../../components/behavior/BehaviorList";

class SensorBehaviorPage extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchBehaviors(id);
        }
    }

    render() {
        return (
            <div>
                <h2>Behaviors for sensor</h2>
                <Button as={Link} to={`/sensor/${this.props.sensor.id}/behavior/add`} primary icon={'plus'}
                        content={'Add new behavior'}/>
                <Button as={Link} to={'/sensor'} icon={'arrow left'}
                        content={'Go back'}/>
                <br/>
                <br/>
                <SensorBehaviorList
                    behaviors={this.props.behaviors}
                    loading={this.props.loading}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        sensor: state.sensorStore.sensor,
        behaviors: state.behaviorStore.behaviors,
        loading: state.behaviorStore.loading
    };
}

export default connect(mapStateToProps, {fetchBehaviors})(SensorBehaviorPage);
