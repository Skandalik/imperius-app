import React from 'react';
import {Button, Container, Header, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {isLogged} from "../utils/auth/AuthService";
import history from "../history";

class MainPage extends React.Component {
    componentWillMount() {
        if (isLogged()) {
            history.push('/sensor');
        }
    }
    render() {
        return (
            <div>
                <Segment textAlign={'center'}>
                    <Header as='h1'>Imperius Home Automation Project</Header>
                </Segment>
                <Segment textAlign={'center'}>
                    <Container>
                        <p>This is engineering project created to manage home sensors.</p>
                        <p>Login to system to start managing your sensors.</p>
                        <Button as={Link} to={'/login'} primary content={'Login'} />
                    </Container>
                </Segment>
            </div>
        );
    }
}

export default MainPage;