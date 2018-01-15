import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import {Dimmer, Grid, Loader} from "semantic-ui-react";
import ScheduledBehaviorGridRow from "./ScheduledBehaviorGridRow";

export default function ScheduledBehaviorList({behaviors, deleteBehavior}) {
    const columns = () => {
        return behaviors.map(behavior => {
            return (
                <ScheduledBehaviorGridRow
                    key={behavior.id}
                    behavior={behavior}
                    deleteBehavior={deleteBehavior}
                />
            )
        });
    };


    return (
        <div>
            <Grid centered={true} padded={true}>
                {columns()}
            </Grid>
        </div>
    );
}
