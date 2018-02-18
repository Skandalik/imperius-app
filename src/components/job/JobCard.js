import React from 'react';
import {Button, Card, Dimmer, Grid, Icon, Label, List, Loader, Segment} from 'semantic-ui-react';
import {Link} from "react-router-dom";

export default function JobCard({job, runJob, stopJob}) {
    const getJson = (json) => {
        return JSON.parse(json);
    }
    const extractFromDateTime = (date) => {
        date = new Date(date);
        date = new Date(date.getTime() - (date.getTimezoneOffset() * 60 * 1000));
        return date.toLocaleString();
    };
    return (
        <Card>
            <Segment className={'no-margin'} inverted={true} color={job.running ? 'green' : 'red'}
                     textAlign={'center'}>
                {job.running ? 'RUNNING' : 'STOPPED'}
            </Segment>
            <Card.Content>
                <Dimmer invert="true" active={job.loading}>
                    <Loader content="Loading data..."/>
                </Dimmer>
                <Card.Header>{job.id}. {job.name}</Card.Header>
                <br/>
                <Card.Meta>
                    {job.error ?
                        <div>
                            <Label color={'red'}>
                                <Icon name={'cancel'}/>
                                Errored!
                            </Label>
                        </div>
                        : ''
                    }
                    {job.finished ?
                        <p>
                            <Icon name="circle"/> Last run at:{' '}
                            {extractFromDateTime(job.lastRunAt)}
                        </p>
                        : ''
                    }
                    {job.additionalData ?
                        <p>
                            <Icon name="circle"/> Check every:{' '}
                            {getJson(job.additionalData).interval}
                            {' '}seconds
                        </p>
                        : ''
                    }
                    <p>
                        <Icon name="circle"/> Command:{' '}
                        {job.command}
                    </p>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div className="ui three buttons">
                    {job.additionalData
                        ?
                        <Button as={Link} to={`/job/edit/${job.id}`} icon={'pencil'}/>
                        : ''
                    }
                    <Button color={'green'} icon={'play'} disabled={job.running} onClick={() => {
                        runJob(job)
                    }}/>
                    <Button color={'red'} icon={'stop'} disabled={!job.running} onClick={() => {
                        stopJob(job)
                    }}/>
                </div>
            </Card.Content>
        </Card>
    );
}
