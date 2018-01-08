import React from 'react';
import {connect} from 'react-redux';
import {fetchBehaviors} from "../../actions/BehaviorActions";
import {Button, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import BehaviorList from "../../components/behavior/BehaviorList";
import {fetchSensor} from "../../actions/SensorActions";

class BehaviorListPage extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            this.props.fetchBehaviors(id);
            this.props.fetchSensor(id);
        }
    }

    render() {
        return (
            <div>
                <h2>Behaviors for sensor</h2>
                <Button primary disabled={this.props.loading} as={Link} to={`/sensor/${this.props.sensor.id}/behaviors/add`} icon={'plus'}
                        content={'Add new behavior'}/>
                <Button as={Link} to={'/sensor'} icon={'arrow left'}
                        content={'Go back'}/>
                <br/>
                <br/>
                <BehaviorList
                    sensor={this.props.sensor}
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

export default connect(mapStateToProps, {fetchSensor, fetchBehaviors})(BehaviorListPage);
