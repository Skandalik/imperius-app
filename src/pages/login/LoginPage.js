import React from 'react';
import {connect} from 'react-redux';
import {login} from "../../actions/AuthActions";
import LoginForm from "../../components/authentication/LoginForm";
import history from '../../history';
import {setToken, isLogged} from "../../utils/auth/AuthService";
import {SubmissionError} from "redux-form";
import {Message, Segment} from "semantic-ui-react";
import {existInStorage, getFromStorageOnce, removeFromStorage} from "../../utils/messages/MessageService";

class LoginPage extends React.Component {
    componentWillMount() {
        if (isLogged()) {
            history.push('/sensor');
        }
    }
    submit = user => {
        return this.props
            .login(user)
            .then(response => {
                setToken(response.value.data.token);
                history.push('/sensor')
            })
            .catch(err => {
                throw new SubmissionError(this.props.errors);
            });
    };

    render() {
        return (
            <div>
                <h1>Login to manage your sensors</h1>
                {
                    existInStorage('message') ?
                        <div>
                            <Message
                                color={'red'}
                                icon='attention'
                                header='Error!'
                                content={getFromStorageOnce('message')}
                            />
                            {removeFromStorage('message')}
                        </div>
                        : ''
                }
                <Segment>
                    <LoginForm
                        loading={this.props.loading}
                        onSubmit={this.submit}
                        errors={this.props.errors}
                    />
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.authStore.authenticated,
        loading: state.authStore.loading,
        errors: state.authStore.errors,
        token: state.authStore.token
    };
}

export default connect(mapStateToProps, {login})(LoginPage)