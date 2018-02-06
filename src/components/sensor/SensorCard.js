import React from 'react';
import {Button, Card, Dimmer, Divider, Header, Icon, Label, Loader, Modal, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import Slider from 'react-rangeslider';
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

export default function SensorCard({sensor, setStatusSensor, checkStatusSensor, deleteSensor, setValue, setStateSensor}) {
    const checkRoomAndNameSet = () => {
        if (!sensor.name || !sensor.room) {
            if (!sensor.room && !sensor.name) {
                return <Label attached='top'>No name and room set!</Label>;
            }
            if (!sensor.room) {
                return <Label attached='top'>No room set!</Label>;
            }
            if (!sensor.name) {
                return <Label attached='top'>No name set!</Label>;
            }
        }
        return '';
    };
    const submit = () => {
        confirmAlert({
            title: 'Delete sensor?',
            message: 'It will reset your sensor to defaults!',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => deleteSensor(sensor),
        })
    };

    return (
        <Card>
            {checkRoomAndNameSet()}
            {
                sensor.disconnected ?
                <Segment className={'no-margin'} inverted={true} color={'black'}
                         textAlign={'center'}>
                    {'DISCONNECTED'}
                </Segment>
                :
                <Segment className={'no-margin'} inverted={true} color={sensor.active ? 'green' : 'red'}
                         textAlign={'center'}>
                    {sensor.active ? 'ACTIVE' : 'INACTIVE'}
                </Segment>
            }
            <Card.Content>
                <Dimmer invert="true" active={sensor.loading}>
                    <Loader content="Loading data..."/>
                </Dimmer>
                <Card.Header>{sensor.id}. {sensor.name || 'Name not set'}</Card.Header>
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
                    {sensor.fetchable ?
                        <p>
                            <Icon name="circle"/> Data Type:{' '}
                            {sensor.dataType.replace("_", " ")}
                        </p>
                        : ''
                    }
                    {sensor.switchable ? '' :
                        <p>
                            <Icon name="circle"/> Status: {sensor.status}
                        </p>
                    }
                    <p>
                        <div className="word-wrap">
                            <Icon name="circle"/> UUID: <br/>
                            {sensor.uuid}
                        </div>
                    </p>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div hidden={sensor.disconnected}>
                    {sensor.adjustable ?
                        <div>
                            Status:
                            <div className='slider-group'>
                                <Slider
                                    min={sensor.minimumValue}
                                    max={sensor.maximumValue}
                                    value={sensor.status}
                                    onChange={(value) => setValue(value, sensor)}
                                    onChangeComplete={() => setStatusSensor(sensor, sensor.status)}
                                />
                            </div>
                            <Divider/>
                        </div>
                        : ''
                    }
                </div>
                <div className="ui">
                    <Button
                        disabled={sensor.disconnected}
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
                            disabled={sensor.disconnected}
                            color={sensor.active ? 'red' : 'green'}
                            icon="power"
                            onClick={() => setStateSensor(sensor, ~~!sensor.active)}
                        />
                    ) : (
                        <Button
                            disabled={sensor.disconnected}
                            primary
                            icon="refresh"
                            onClick={() => checkStatusSensor(sensor)}
                        />
                    )}

                    <Button
                        disabled={sensor.disconnected}
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
                        onClick={() => submit()}
                    />
                </div>
            </Card.Content>
        </Card>
    );
}