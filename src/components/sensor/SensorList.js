import React from 'react';
import SensorCard from './SensorCard';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import Dimmer from 'semantic-ui-react/dist/commonjs/modules/Dimmer/Dimmer';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import {Icon} from "semantic-ui-react";

export default function SensorList({sensors, loading, deleteSensor, checkStatusSensor, setStatusSensor, setValue, setStateSensor}) {
    const cards = () => {
        return sensors.map(sensor => {
            return (
                <Grid.Column key={sensor.id} mobile={16} tablet={8} computer={5}>
                    <SensorCard
                        key={sensor.id}
                        sensor={sensor}
                        deleteSensor={deleteSensor}
                        checkStatusSensor={checkStatusSensor}
                        setStatusSensor={setStatusSensor}
                        setValue={setValue}
                        setStateSensor={setStateSensor}

                    />
                </Grid.Column>
            );
        });
    };

    const minHeight = {minHeight: 200, width: 'auto', margin: 'auto 0'};
    return (
        <div>
            <Segment textAlign={'center'} style={minHeight}>
                <Dimmer inverted active={loading}>
                    <Loader inverted content='Loading sensors...'/>
                </Dimmer>
                {sensors && sensors.length > 0
                    ? ''
                    : <h1><Icon name={'delete'} /> No sensor found. Perhaps you'd like to add one?</h1>
                }
                <Grid stackable={true} doubling={true} centered={true} relaxed columns={3}>
                    {cards()}
                </Grid>
            </Segment>
        </div>
    );
}
