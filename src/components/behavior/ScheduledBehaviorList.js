import React from 'react';
import {Button, Grid, Icon, Message} from "semantic-ui-react";
import ScheduledBehaviorGridRow from "./ScheduledBehaviorGridRow";
import {isTrue} from "../../utils/messages/MessageService";

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
            {behaviors && behaviors.length > 0
                ? ''
                : <h1><Icon name={'delete'} /> It seems that you didn't add any behavior.</h1>
            }
            <Grid centered={true} padded={true}>
                {columns()}
            </Grid>
        </div>
    );
}
