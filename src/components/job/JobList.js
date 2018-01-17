import React from 'react';
import {Grid, Segment, Dimmer, Loader} from 'semantic-ui-react';
import JobGridRow from "./JobGridRow";

export default function JobList({jobs, loading, deleteJob, runJob}) {
    const columns = () => {
        return jobs.map(job => {
            return (
                <JobGridRow
                    key={job.id}
                    job={job}
                    deleteJob={deleteJob}
                    runJob={runJob}
                />
            )
        });
    };

    const minHeight = { minHeight: 200, width: 'auto', margin: 'auto 0' };
    return (
        <div>
            <Segment centered='true' style={minHeight}>
                <Dimmer inverted active={loading}>
                    <Loader inverted content='Loading jobs...'/>
                </Dimmer>
                <Grid stackable={true} centered={true} padded={true}>
                    {columns()}
                </Grid>
            </Segment>
        </div>
    );
}
