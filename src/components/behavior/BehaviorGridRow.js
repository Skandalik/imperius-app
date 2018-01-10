import React from 'react';
import {Button, Grid, Label, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {BehaviorActionsEnumChoices, BehaviorConditionsEnumChoices, BehaviorConstants} from "./BehaviorEnum";

export default function BehaviorGrid({behavior, deleteBehavior}) {

    const getBehaviorDescription = (Enum, key) => {
        return Enum.hasOwnProperty(key) ? Enum[key] : 'Not defined';
    };

    const getArgument = (argument) => {
        return argument ?
            <Label color={'orange'}>
                {argument}
            </Label>
            : '';
    }

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
                <Segment>
                    <div>
                        <Label color={'grey'}>
                            {behavior.sourceSensor.name ? behavior.sourceSensor.name : behavior.sourceSensor.uuid}
                        </Label>
                        <Label color={'blue'}>
                            {getBehaviorDescription(BehaviorConditionsEnumChoices, behavior.sourceCondition)}
                        </Label>
                        {getArgument(behavior.sourceArgument)}
                    </div>
                </Segment>
            </Grid.Column>
            <Grid.Column width={2}>
                <Segment>
                    THEN
                </Segment>
            </Grid.Column>
            <Grid.Column width={5}>
                <Segment>
                    <div>
                        <Label color={'grey'}>
                            {behavior.dependentSensor.name ? behavior.dependentSensor.name : behavior.dependentSensor.uuid}
                        </Label>
                        <Label color={'blue'}>
                            {getBehaviorDescription(BehaviorActionsEnumChoices, behavior.dependentAction)}
                        </Label>
                        {getArgument(behavior.actionArgument)}
                    </div>
                </Segment>
            </Grid.Column>
            <Grid.Column width={2} verticalAlign={'middle'}>
                <Button as={Link} to={`/sensor/${behavior.sourceSensor.id}/behaviors/edit/${behavior.id}`} primary
                        icon={'pencil'}/>
                <Button icon={'delete'} color="red" onClick={() => {deleteBehavior(behavior)}} />
            </Grid.Column>
        </Grid.Row>
    )
        ;
}
