import React from 'react';
import {Button, Form, Grid} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class RoomForm extends React.Component {
    renderField = ({input, label, type, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    componentWillReceiveProps = (nextProps) => {
        const {room} = nextProps;

        if (room.id !== this.props.room.id) {
            this.props.initialize(room);

        }
    };

    render() {
        const parse = value => value === undefined ? undefined : parseInt(value, 10);
        const {handleSubmit, pristine, submitting, loading} = this.props;
        const padding = {padding: 50};
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1 style={{marginTop: '1em'}}> { this.props.roomId ? 'Edit room' : 'Add new room' }</h1>
                    <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                        <Field
                            name="room"
                            type="text"
                            component={this.renderField}
                            label="Set room name"
                        />
                        <Field
                            name="floor"
                            type="number"
                            parse={parse}
                            component={this.renderField}
                            label="Set floor"
                        />
                        <Button primary content={'Save'} type="submit" disabled={pristine || submitting} />
                        <Button as={Link} to={'/room'} icon={'arrow left'} content={'Go back'} />
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.room) {
        errors.room = {
            message: 'You need to provide a valid room name!'
        };
    }
    if (values.floor.toString().length === 0) {
        errors.floor = {
            message: 'You need to provide a floor'
        };
    }
    return errors;
};

export default reduxForm({form: 'room', validate})(RoomForm);
