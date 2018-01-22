import React from 'react';
import {Grid, Icon} from "semantic-ui-react";
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
                {behaviors && behaviors.length > 0
                    ? ''
                    : <h1><Icon name={'delete'} /> It seems that you didn't add any behavior.</h1>
                }
                {columns()}
            </Grid>
        </div>
    );
}
