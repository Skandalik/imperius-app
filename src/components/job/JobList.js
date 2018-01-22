import React from 'react';
import {Grid, Segment, Dimmer, Loader, Icon} from 'semantic-ui-react';
import JobGridRow from "./JobGridRow";
import JobCard from "./JobCard";

export default function JobList({jobs, loading, runJob, stopJob}) {
    const columns = () => {
        return jobs.map(job => {
            return (
                <Grid.Column key={job.id} width={6}>
                    <JobCard
                        key={job.id}
                        job={job}
                        runJob={runJob}
                        stopJob={stopJob}
                    />
                </Grid.Column>
            )
        });
    };

    const minHeight = {minHeight: 200, width: 'auto', margin: 'auto 0'};
    return (
        <div>
            <Segment centered='true' style={minHeight}>
                <Dimmer inverted active={loading}>
                    <Loader inverted content='Loading jobs...'/>
                </Dimmer>
                {jobs && jobs.length > 0
                    ? ''
                    : <h1><Icon name={'delete'}/> No job found. Perhaps you'd like to add one?</h1>
                }
                <Grid stackable={true} centered={true} relaxed columns={2}>
                    {columns()}
                </Grid>
            </Segment>
        </div>
    );
}
