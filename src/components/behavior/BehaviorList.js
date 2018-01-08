import React from 'react';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import {Dimmer, Grid, Loader} from "semantic-ui-react";
import BehaviorGrid from "./BehaviorGridRow";

export default function BehaviorList({behaviors, loading}) {
    const columns = () => {
        return behaviors.map(behavior => {
            return (
                <BehaviorGrid
                    key={behavior.id}
                    behavior={behavior}
                />
            )
        });
    };


    const minHeight = {minHeight: 200, width: 'auto', margin: 'auto 0'};
    return (
        <div>
            <Segment centered='true' style={minHeight}>
                <Dimmer inverted active={loading}>
                    <Loader inverted content='Loading behaviors...'/>
                </Dimmer>
                <Grid centered={true} padded={true}>
                    {columns()}
                </Grid>
            </Segment>
        </div>
    );
}
