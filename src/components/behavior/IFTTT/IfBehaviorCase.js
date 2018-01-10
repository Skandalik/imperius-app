import React from 'react';
import {Button} from 'semantic-ui-react'
import {Input, Label, Menu, Segment} from "semantic-ui-react";
import StateStatusComponent from "./StateStatusComponent";

export default function IfBehaviorCase({...props}) {
    return (
        <Segment.Group horizontal>
            <Segment>
                <Label size={'huge'} content={'IF'} color={'grey'}/>
                <Label size={'huge'} content={'THIS'} color={'blue'}/>
                <Label size={'huge'} content={'SENSOR'} color={'grey'}/>
            </Segment>
            <Segment>
                <StateStatusComponent />
            </Segment>
        </Segment.Group>
    );
};

