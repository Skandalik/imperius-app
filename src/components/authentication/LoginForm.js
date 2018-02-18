import React from 'react';
import {Button, Form, Grid, Message} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class LoginForm extends React.Component {
    renderField = ({input, label, type, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );
    render() {
        const {handleSubmit, pristine, submitting, loading, errors} = this.props;
        const padding = {padding: 50};
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    {errors ?
                    <Message negative>
                        <Message.Header>Error!</Message.Header>
                        <p>{errors.message}</p>
                    </Message>
                        : ''}
                    <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                        <Field
                            name="username"
                            type="text"
                            component={this.renderField}
                            label="Username"
                        />
                        <Field
                            name="password"
                            type="password"
                            component={this.renderField}
                            label="Password"
                        />
                        <Button primary content={'Login'} type="submit" disabled={pristine || submitting} />
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = {
            message: 'You need to provide valid username!'
        };
    }
    if (!values.password) {
        errors.password = {
            message: 'You need to provide a password!'
        };
    }
    return errors;
};

export default reduxForm({form: 'login', validate})(LoginForm);
