import React from 'react';
import {Link} from "react-router-dom";
import {Header, Icon, Segment} from "semantic-ui-react";

class NotFound extends React.Component {
    render() {
        return (
            <div>
                <Segment textAlign={'center'}>
                    <Icon name={'cancel'}/>
                    <Header as='h1'>404 not found</Header>
                    <Header as='h2'>Page you are looking for does not exist.</Header>
                    <Icon name={'cancel'}/>
                </Segment>
            </div>
        );
    }
}

export default NotFound;