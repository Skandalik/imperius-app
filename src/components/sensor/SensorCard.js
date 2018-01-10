import React from 'react';
import {Button, Card, Dimmer, Divider, Grid, Icon, Loader, Statistic} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Slider from 'react-rangeslider';

export default function SensorCard({sensor, setStatusSensor, checkStatusSensor, deleteSensor, setValue, setStateSensor}) {
    return (
        <Card>
            <Card.Content>
                <Dimmer invert="true" active={sensor.loading}>
                    <Loader content="Loading data..."/>
                </Dimmer>
                <Grid stackable={true} columns={2}>
                    <Grid.Column width={11}>
                        <Card.Header>{sensor.name || 'Name not set'}</Card.Header>
                        <br/>
                        <Card.Meta>
                            <p>
                                <Icon name="home"/> Room:{' '}
                                {sensor.room ? sensor.room.room : 'Not set'}
                            </p>
                            <p>
                                <Icon name="circle"/> Floor:{' '}
                                {sensor.room ? sensor.room.floor : 'Not set'}
                            </p>
                            <p>
                                <Icon name="circle"/> ID: {sensor.id}
                            </p>
                            {sensor.switchable ? '' :
                                <p>
                                    <Icon name="circle"/> Status: {sensor.status}
                                </p>
                            }
                            <p>
                                <Icon name="circle"/> {sensor.uuid}
                            </p>
                        </Card.Meta>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <div>
                            <Statistic size="small">
                                <Statistic.Value>
                                    <Icon name="circle" color={sensor.active ? 'green' : 'red'}/>
                                </Statistic.Value>
                                <Statistic.Label>
                                    {sensor.active ? 'Active' : 'Inactive'}
                                </Statistic.Label>
                            </Statistic>
                        </div>
                        <div>
                            {sensor.adjustable ?
                                <div className='slider-group'>
                                    <div className='slider-vertical'>
                                        <Slider
                                            min={sensor.minimumValue}
                                            max={255}
                                            value={sensor.status}
                                            orientation={'vertical'}
                                            onChange={(value) => setValue(value, sensor)}
                                            onChangeComplete={() => setStatusSensor(sensor, sensor.status)}
                                        />
                                    </div>
                                </div>
                                : ''
                            }
                        </div>
                    </Grid.Column>
                </Grid>
            </Card.Content>
            <Card.Content extra>
                <div className="ui">
                    <Button
                        fluid
                        primary
                        icon=""
                        as={Link}
                        to={`/sensor/${sensor.id}/behaviors`}
                        content={'Behaviors'}
                    />
                </div>
                <Divider/>
                <div className="ui three buttons">
                    {sensor.switchable || sensor.adjustable ? (
                        <Button
                            color={sensor.active ? 'red' : 'green'}
                            icon="power"
                            onClick={() => setStateSensor(sensor, ~~!sensor.active)}
                        />
                    ) : (
                        <Button
                            primary
                            icon="refresh"
                            onClick={() => checkStatusSensor(sensor)}
                        />
                    )}

                    <Button
                        basic
                        color="green"
                        icon="pencil"
                        as={Link}
                        to={`/sensor/edit/${sensor.id}`}
                    />
                    <Button
                        basic
                        color="red"
                        icon="delete"
                        onClick={() => deleteSensor(sensor)}
                    />
                </div>
            </Card.Content>
        </Card>
    );
}
