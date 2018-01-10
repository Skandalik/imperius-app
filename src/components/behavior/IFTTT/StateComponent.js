import React, {Component} from 'react';
import {Button, Segment} from 'semantic-ui-react'

class StateComponent extends Component {
    state = {}

    handleChange = () => this.setState({active: !this.state.active})

    render() {
        const {active} = this.state

        return (
            <h1>sadasda</h1>
        )
    }
}

export default StateComponent