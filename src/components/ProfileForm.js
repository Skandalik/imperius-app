import React from 'react';
import {Button, Form, Grid, Message} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class ProfileForm extends React.Component {
    renderField = ({input, label, type, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    componentWillReceiveProps = (nextProps) => {
        const {profile} = nextProps;
        if (profile.id !== this.props.profile.id) {
            this.props.initialize(profile);
        }
    };

    render() {
        const {handleSubmit, pristine, submitting, loading, errors} = this.props;
        const padding = {padding: 50};
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                        <Field
                            name="username"
                            type="text"
                            component={this.renderField}
                            label="Username"
                        />
                        <Field
                            name="email"
                            type="text"
                            component={this.renderField}
                            label="E-mail"
                        />
                        <Field
                            name="password"
                            type="text"
                            component={this.renderField}
                            label="Password"
                        />
                        <Button primary content={'Save'} type="submit" disabled={pristine || submitting}/>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.password = {
            message: 'You need to provide an username!'
        };
    }
    if (!values.email) {
        errors.password = {
            message: 'You need to provide an e-mail!'
        };
    }
    if (!values.password) {
        errors.password = {
            message: 'You need to provide a password!'
        };
    }
    return errors;
};

export default reduxForm({form: 'profile', validate})(ProfileForm);
