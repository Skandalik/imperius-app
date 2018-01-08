import React from 'react';
import {Button, Grid, Label, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {BehaviorConstants} from "./BehaviorEnum";

export default function BehaviorGrid({behavior}) {
    const returnOnOffOrStatus = (value, property) => {
        if (property === BehaviorConstants.STATUS) {
            return <Label color={'orange'}>{value}</Label>;
        }
        switch (parseInt(value)) {
            case 0:
                return <Label color={'red'}>off</Label>;
            case 1:
                return <Label color={'green'}>on</Label>;
            default:
                return <Label color={'orange'}>{value}</Label>;
        }
    };
    const predicateReponse = () => {
        return (
            <div>
                <Label color={'grey'}>
                    {behavior.sourceSensor.name ? behavior.sourceSensor.name : behavior.sourceSensor.uuid}
                </Label>
                <Label color={'blue'}>
                    {behavior.sourceProperty === BehaviorConstants.ACTIVE ? 'is' : behavior.predicate}
                </Label>
                {returnOnOffOrStatus(behavior.predicateArgument, behavior.sourceProperty)}
            </div>
        )
    };

    const actionResponse = () => {
        if (behavior.dependentProperty === BehaviorConstants.ACTIVE) {
            return (
                <div>
                    <Label color={'blue'}>
                        set
                    </Label>
                    <Label color={'grey'}>
                        {behavior.dependentSensor.name ? behavior.dependentSensor.name : behavior.dependentSensor.uuid}
                    </Label>
                    {returnOnOffOrStatus(behavior.actionArgument)}
                </div>
            )
        }
        return (
            <div>
                <Label color={'blue'}>
                    set status of
                </Label>
                <Label color={'grey'}>
                    {behavior.dependentSensor.name ? behavior.dependentSensor.name : 'Unnamed'}
                </Label>
                <Label color={'blue'}>
                    to
                </Label>
                {returnOnOffOrStatus(behavior.actionArgument)}
            </div>
        )
    };

    return (
        <Grid.Row key={behavior.id} columns={5} verticalAlign={'middle'}>
            <Grid.Column width={1}>
                <Segment>
                    {behavior.id}
                </Segment>
            </Grid.Column>
            <Grid.Column width={1}>
                <Segment>
                    IF
                </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
                <Segment>{console.log(behavior)}
                    {predicateReponse()}
                </Segment>
            </Grid.Column>
            <Grid.Column width={2}>
                <Segment>
                    THEN
                </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
                <Segment>
                    {actionResponse()}
                </Segment>
            </Grid.Column>
            <Grid.Column width={2} verticalAlign={'middle'}>
                <Button as={Link} to={`/sensor/${behavior.sourceSensor.id}/behaviors/edit/${behavior.id}`} primary
                        icon={'pencil'}/>
                <Button color={'red'} icon={'delete'}/>
            </Grid.Column>
        </Grid.Row>
    )
        ;
}
