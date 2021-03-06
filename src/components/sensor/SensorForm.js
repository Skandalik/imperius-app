import React from 'react';
import {Button, Form, Grid} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import Link from "react-router-dom/es/Link";

class SensorForm extends React.Component {
    renderField = ({input, label, type, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    componentWillReceiveProps = (nextProps) => {
        const {sensor} = nextProps;
        if (sensor.id !== this.props.sensor.id) {
            this.props.initialize(sensor);
        }
    };

    roomOptions = () => {
        return this.props.rooms.map(room => {
            const roomLink = '/api/rooms/' + room.id;
            return (
                <option key={room.id} value={roomLink}>{room.room}</option>
            )
        })
    };

    render() {
        const {handleSubmit, pristine, submitting, loading} = this.props;

        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1 style={{marginTop: '1em'}}>Edit sensor</h1>
                    <Form onSubmit={handleSubmit} loading={loading}>
                        <Field
                            name="name"
                            type="text"
                            component={this.renderField}
                            label="Set sensor name"
                        />
                        <div>
                            <label>Set room where sensor is/will be</label>
                            <div>
                                <Field name="room" type='select' component="select" className={'ui dropdown'}>
                                    <option>- Choose room -</option>
                                    {this.roomOptions()}
                                </Field>
                            </div>
                        </div>
                        <br />

                        <Button primary type="submit" content={'Save'} disabled={pristine || submitting}/>
                        <Button as={Link} to={'/sensor'} icon={'arrow left'} content={'Go back'}/>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = {
            message: 'You need to provide valid name'
        };
    }
    if (!values.room) {
        errors.room = {
            message: 'You need to provide a room'
        };
    }
    return errors;
};

export default reduxForm({form: 'sensor', validate})(SensorForm);
