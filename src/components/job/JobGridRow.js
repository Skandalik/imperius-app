import React from 'react';
import {Button, Dimmer, Grid, Icon, Label, List, Loader, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {BehaviorActionsEnumChoices} from "../behavior/BehaviorEnum";

export default function JobGridGridRow({job, deleteJob, runJob}) {
    return (
        <Grid.Row key={job.id} columns={2} verticalAlign={'middle'}>
            <Dimmer inverted active={job.loading}>
                <Loader inverted content='Loading...'/>
            </Dimmer>
            <Grid.Column width={12} verticalAlign={'middle'}>
                <Segment>
                    <Label circular={true} color={'grey'}>
                        {job.id}
                    </Label>
                    <Label color={'grey'}>
                        {job.name}
                    </Label>
                    <Label color={'grey'}>
                        {job.command}
                    </Label>
                    <Label color={'blue'}>
                        {job.time}
                    </Label>
                    {job.error ?
                        <Label color={'red'}>
                            <Icon name={'cancel'}/>
                            Errored!
                        </Label>
                        : ''
                    }
                    {job.finished ?
                        <Label color={'green'}>
                            <Icon name={'check'}/>
                            Finished!
                        </Label>
                        : ''
                    }
                    <List>
                        {job.repeatable ?
                            <Label>
                                <Icon name={'time'}/>
                                Last run: {job.lastRunAt ? job.lastRunAt : 'never ran yet'}
                            </Label>
                            : ''
                        }
                        <Label>
                            <Icon name={job.imediateRerun ? 'refresh' : ''}/>
                            {job.imediateRerun ? 'Rerun if failed' : 'Don\'t rerun'}
                        </Label>
                        <Label>
                            <Icon name={job.repeatable ? 'repeat' : ''}/>
                            {job.repeatable ? 'Repeatable' : 'Only once'}
                        </Label>
                    </List>

                    <Label>
                        <Icon name={job.running ? 'circle' : 'cancel'} color={job.running ? 'green' : 'grey'}/>
                        {job.running ? 'Running' : 'Not running'}
                    </Label>
                </Segment>
            </Grid.Column>
            <Grid.Column width={4} verticalAlign={'middle'}>
                <Button color={'green'} icon={'play'} onClick={() => {
                    runJob(job)}} />
            </Grid.Column>
        </Grid.Row>
    );
}
