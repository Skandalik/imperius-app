import React from 'react';
import {Button, Dimmer, Grid, Label, List, Loader, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {BehaviorActionsEnumChoices, BehaviorConstants, BehaviorRequirementsEnumChoices} from "./BehaviorEnum";
import {confirmAlert} from "react-confirm-alert";

export default function ManualBehaviorGridRow({behavior, deleteBehavior}) {

    const getBehaviorDescription = (Enum, key) => {
        return Enum.hasOwnProperty(key) ? Enum[key] : 'Not defined';
    };

    const getArgument = (argument) => {
        return argument !== null ?
            <Label color={'orange'}>
                {argument}
            </Label>
            : '';
    }

    const submit = () => {
        confirmAlert({
            title: 'Delete behavior?',
            message: 'Are you sure?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => deleteBehavior(behavior),
        })
    };

    return (
        <Grid.Row key={behavior.id} columns={2} verticalAlign={'middle'}>
            <Dimmer inverted active={behavior.loading}>
                <Loader inverted content='Loading...'/>
            </Dimmer>
            <Grid.Column width={12} verticalAlign={'middle'}>
                <Segment>
                    <List>
                        <Label color={'green'}>
                            IF
                        </Label>
                        <Label color={'grey'}>
                            {behavior.sensor.name ? behavior.sensor.name : behavior.sensor.uuid}
                        </Label>
                        <Label color={'blue'}>
                            {getBehaviorDescription(BehaviorRequirementsEnumChoices, behavior.requirement)}
                        </Label>
                        {getArgument(behavior.requirementArgument)}
                    </List>
                    <List>
                        <Label color={'green'}>
                            THEN
                        </Label>
                        <Label color={'grey'}>
                            {behavior.actionSensor.name ? behavior.actionSensor.name : behavior.actionSensor.uuid}
                        </Label>
                        <Label color={'blue'}>
                            {getBehaviorDescription(BehaviorActionsEnumChoices, behavior.action)}
                        </Label>
                        {getArgument(behavior.actionArgument)}
                    </List>
                </Segment>
            </Grid.Column>
            <Grid.Column width={4} verticalAlign={'middle'}>
                <div className='ui two buttons'>
                    <Button as={Link} to={`/sensor/${behavior.sensor.id}/manual_behaviors/edit/${behavior.id}`} primary
                            icon={'pencil'}/>
                    <Button icon={'delete'} color="red" onClick={() => {
                        submit()
                    }}/>
                </div>
            </Grid.Column>
        </Grid.Row>
    );
}
