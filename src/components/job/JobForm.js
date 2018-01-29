import React from 'react';
import {Button, Form, Grid} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

class JobForm extends React.Component {
    renderField = ({input, label, type, meta: {touched, error}}) => (
        <Form.Field className={classnames({error: touched && error})}>
            <label>{label}</label>
            <input {...input} placeholder={label} type={type}/>
            {touched && error && <span className="error">{error.message}</span>}
        </Form.Field>
    );

    getJson = (json) => {
        return JSON.parse(json);
    }

    componentWillReceiveProps = (nextProps) => {
        const {job} = nextProps;

        if (job.id !== this.props.job.id) {
            job.additionalData = this.getJson(job.additionalData).interval;
            this.props.initialize(job);

        }
    };

    render() {
        const parse = value => value === undefined ? undefined : parseInt(value, 10);
        const {handleSubmit, pristine, submitting, loading} = this.props;
        const padding = {padding: 50};
        return (
            <Grid centered columns={2}>
                <Grid.Column>
                    <h1 style={{marginTop: '1em'}}> Edit job</h1>
                    <Form onSubmit={handleSubmit} loading={loading} style={padding}>
                        <Field
                            name="additionalData"
                            type="number"
                            parse={parse}
                            component={this.renderField}
                            label="Set interval (seconds)"
                        />
                        <Button primary content={'Save'} type="submit" disabled={pristine || submitting}/>
                        <Button as={Link} to={'/job'} icon={'arrow left'} content={'Go back'}/>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

const validate = values => {
    const errors = {};
    if (!values.additionalData || values.additionalData <= 0) {
        errors.additionalData = {
            message: 'You need to provide valid interval (min 1 second)!'
        };
    }
    return errors;
};

export default reduxForm({form: 'job', validate})(JobForm);
