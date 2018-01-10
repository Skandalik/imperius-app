import React, {Component} from 'react';
import {Button, Checkbox, Segment} from 'semantic-ui-react'
import {Form} from "redux-form";

class StateStatusComponent extends Component {
    state = {}

    handleClick = () => this.setState({active: !this.state.value})

    render() {
        return (
            <div>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Choose this'
                        name='checkboxRadioGroup'
                        value='this'
                        checked={this.state.value === 'this'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Checkbox
                        radio
                        label='Or that'
                        name='checkboxRadioGroup'
                        value='that'
                        checked={this.state.value === 'that'}
                        onChange={this.handleChange}
                    />
                </Form.Field>

            </div>
        )
    }
}

export default StateStatusComponent