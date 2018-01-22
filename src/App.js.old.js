import React, {Component} from 'react';
import './App.css';
import Header from './routes/Header';
import Main from './routes/Main';
import {login} from "./actions/AuthActions";
import {SubmissionError} from "redux-form";
import LoginForm from "./components/authentication/LoginForm";
import {connect} from "react-redux";

class App extends Component {
    submit = user => {
        return this.props
            .login(user)
            .then(response => {
                localStorage.setItem('token', this.props.token);

            })
            .catch(err => {
                throw new SubmissionError(this.props.errors);
            });
    }

    render() {
        if (localStorage.getItem('token')) {
            console.log('Authenticated');
            console.log(this.props.authenticated);
            console.log(localStorage.getItem('token'));
        }
        return (
            <div className="imperius-container">
                <Header authenticated={this.props.authenticated} />
                {this.props.authenticated ?
                    <Main authenticated={this.props.authenticated}/>
                    :
                    <LoginForm
                        loading={this.props.loading}
                        onSubmit={this.submit}
                        errors={this.props.errors}
                    />
                }
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

export default connect(mapStateToProps, {login})(App)
