import React from 'react';
import {connect} from 'react-redux';
import {SubmissionError} from "redux-form";
import {Segment} from "semantic-ui-react";
import {changePassword, fetchProfile} from "../actions/ProfileActions";
import history from '../history';
import {removeToken} from "../utils/auth/AuthService";
import ProfileForm from "../components/ProfileForm";

class ProfilePage extends React.Component {
    submit = user => {
        return this.props
            .changePassword(user)
            .then(response => {
                history.push('/sensor')
            })
            .catch(err => {
                throw new SubmissionError(this.props.errors);
            });
    };


    componentDidMount() {
        this.props.fetchProfile();
    }

    render() {
        return (
            <div>
                <h1>Manage your profile</h1>
                <Segment>
                    <ProfileForm
                        loading={this.props.loading}
                        onSubmit={this.submit}
                        errors={this.props.errors}
                        profile={this.props.profile}
                    />
                </Segment>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.profileStore.loading,
        errors: state.profileStore.errors,
        profile: state.profileStore.profile
    };
}

export default connect(mapStateToProps, {changePassword, fetchProfile})(ProfilePage)