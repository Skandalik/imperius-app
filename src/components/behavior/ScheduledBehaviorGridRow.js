import React from 'react';
import {Button, Grid, Icon, Label, List, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {BehaviorActionsEnumChoices, BehaviorRequirementsEnumChoices, BehaviorConstants} from "./BehaviorEnum";

export default function ScheduledBehaviorGridRow({behavior, deleteBehavior}) {

    const getBehaviorDescription = (Enum, key) => {
        return Enum.hasOwnProperty(key) ? Enum[key] : 'Not defined';
    };

    const getArgument = (argument) => {
        return argument ?
            <Label color={'orange'}>
                {argument}
            </Label>
            : '';
    };

    const extractFromDateTime = (date) => {
        date = new Date(date);
        date = new Date(date.getTime() + (date.getTimezoneOffset() * 60 * 1000));
        return date.toLocaleString();
    };

    return (
        <Grid.Row key={behavior.id} columns={2} verticalAlign={'middle'}>
            <Grid.Column width={12} verticalAlign={'middle'}>
                <Segment>
                    <Label circular={true} color={'grey'}>
                        {behavior.id}
                    </Label>
                    <Label color={'grey'}>
                        {behavior.sensor.name ? behavior.sensor.name : behavior.sensor.uuid}
                    </Label>
                    <Label color={'green'}>
                        {behavior.relativeDate}
                    </Label>
                    <Label color={'blue'}>
                        {getBehaviorDescription(BehaviorActionsEnumChoices, behavior.action)}
                    </Label>
                    {getArgument(behavior.actionArgument)}
                    <List>
                        <Label>
                            <Icon name={'time'}/>
                            Last run: {behavior.lastRunAt ? extractFromDateTime(behavior.lastRunAt) : 'never ran yet'}
                        </Label>
                        {behavior.repeatable ?
                            <Label>
                                <Icon name={'time'}/>
                                Next run: {extractFromDateTime(behavior.nextRunAt)}
                            </Label>
                            : ''
                        }
                        <Label>
                            <Icon name={behavior.repeatable ? 'repeat' : ''}/>
                            {behavior.repeatable ? 'Repeatable' : 'Only once'}
                        </Label>
                        {behavior.repeatable ? '' :
                            <Label>
                                <Icon name={behavior.finished ? 'check' : 'cancel'}/>
                                {behavior.finished ? 'Finished' : 'Unfinished'}
                            </Label>
                        }
                    </List>
                </Segment>
            </Grid.Column>
            <Grid.Column width={4} verticalAlign={'middle'}>
                <div className='ui two buttons'>
                    <Button as={Link} to={`/sensor/${behavior.sensor.id}/scheduled_behaviors/edit/${behavior.id}`}
                            primary
                            icon={'pencil'}/>
                    <Button icon={'delete'} color="red" onClick={() => {
                        deleteBehavior(behavior)
                    }}/>
                </div>
            </Grid.Column>
        </Grid.Row>
    )
        ;
}
