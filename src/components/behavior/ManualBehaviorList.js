import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import {Dimmer, Grid, Loader} from "semantic-ui-react";
import ManualBehaviorGridRow from "./ManualBehaviorGridRow";

export default function ManualBehaviorList({id, sensor, behaviors, deleteBehavior}) {
    const columns = () => {
        return behaviors.map(behavior => {
            return (
                <ManualBehaviorGridRow
                    key={behavior.id}
                    behavior={behavior}
                    deleteBehavior={deleteBehavior}
                />
            )
        });
    };


    return (
        <div>
            <Grid stackable={true} centered={true} padded={true}>
                {columns()}
            </Grid>
        </div>
    );
}
