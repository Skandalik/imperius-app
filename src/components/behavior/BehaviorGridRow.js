import React from 'react';
import {Button, Grid, Segment} from 'semantic-ui-react';

export default function BehaviorGrid({behavior}) {
    return (
        <Grid.Row key={behavior.id} columns={6} verticalAlign={'middle'}>
            <Grid.Column>
                <Segment>
                    IF
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    {behavior.behaviorCondition}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    THEN
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    {behavior.behaviorAction}
                </Segment>
            </Grid.Column>
            <Grid.Column>
                <Segment>
                    {behavior.dependentSensor.id}
                </Segment>
            </Grid.Column>
            <Grid.Column verticalAlign={'middle'}>
                <Button primary icon={'pencil'}/>
                <Button color={'red'} icon={'delete'}/>
            </Grid.Column>
        </Grid.Row>
    )
        ;
}
