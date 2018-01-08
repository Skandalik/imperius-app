import React from 'react';
import {Button, Form, Grid, Segment} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {ActionOptions, BehaviorConstants, PredicatesOptions} from "./BehaviorEnum";
import {fetchSensor} from "../../actions/SensorActions";

class BehaviorForm extends React.Component {
    state = {
        predicateArgumentInputHidden: true,
        actionArgumentInputHidden: true,
    };
    renderField = ({input, label, type, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    componentWillReceiveProps = (nextProps) => {
        const {behavior} = nextProps;

        if (behavior.id !== this.props.behavior.id) {
            this.props.initialize(behavior);
        }
    };

    //TODO POPRAW
    handleOptionsChange(e, type) {
        let option = JSON.parse(e.target.value);
        switch (option.type) {
            case 'input':
                if (type === 'predicate') {
                    this.setState({predicateArgumentInputHidden: false});
                } else {
                    this.setState({actionArgumentInputHidden: false});
                }
                return;
            case 'option':
                if (type === 'predicate') {
                    this.setState({predicateArgumentInputHidden: true});
                } else {
                    this.setState({actionArgumentInputHidden: true});
                }
                return;
            default:
                this.setState({actionArgumentInputHidden: true, predicateArgumentInputHidden: true});
                return;
        }
    }

    valuesOptions = (options: array) => {
        return options.map((value, index) => {
                return (
                    <option key={index} value={JSON.stringify(value)}>{value.optionValue}</option>
                );
            }
        );
    };


    sensors = () => {
        return this.props.sensors.map((sensor) => {
                if (parseInt(sensor.id) === parseInt(this.props.sensorId)) {
                    return;
                }
                const sensorIri = '/api/sensors/' + sensor.id;
                return (
                    <option key={sensor.id} value={sensorIri}>{sensor.name ? sensor.name : sensor.uuid}</option>
                );

            }
        );
    };

    render() {
        const {handleSubmit, pristine, submitting, loading} = this.props;
        const padding = {padding: 50};
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1 style={{marginTop: '1em'}}> {this.props.behaviorId ? 'Edit behavior' : 'Add new behavior'}</h1>
                    <Segment>
                        <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                            <h1>IF THIS SENSOR</h1>
                            <div>
                                <div>
                                    <Field name="predicateObject" type='select'
                                           onChange={(event) => this.handleOptionsChange(event, 'predicate')}
                                           component="select">
                                        <option>- Choose condition -</option>
                                        {this.valuesOptions(PredicatesOptions)}
                                    </Field>
                                    <br/>
                                    <div hidden={this.state.predicateArgumentInputHidden}>
                                        <Field
                                            name="predicateArgument"
                                            type="number"
                                            component={this.renderField}
                                            label="Condition argument"
                                        />
                                    </div>
                                </div>
                            </div>
                            <h1>THEN</h1>
                            <div>
                                <div>

                                    <Field name="dependentSensor" type='select' component="select">
                                        <option>- Choose sensor -</option>
                                        {this.sensors()}
                                    </Field>
                                    <Field name="actionObject" type='select'
                                           onChange={(event) => this.handleOptionsChange(event, 'action')}
                                           component="select">
                                        <option>- Choose action -</option>
                                        {this.valuesOptions(ActionOptions)}
                                    </Field>
                                    <br/>
                                    <div hidden={this.state.actionArgumentInputHidden}>
                                        <Field
                                            name="actionArgument"
                                            type="number"
                                            component={this.renderField}
                                            label="Condition argument"
                                        />
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <Button primary content={'Save'} type="submit" disabled={pristine || submitting}/>
                            <Button as={Link} to={`/sensor/${this.props.sensorId}/behaviors`} icon={'arrow left'}
                                    content={'Go back'}/>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

const
    validate = values => {
        const errors = {};

        return errors;
    };

export default reduxForm({form: 'behavior', validate})

(
    BehaviorForm
)
;
