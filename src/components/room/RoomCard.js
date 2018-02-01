import React from 'react';
import {Button, Card, Dimmer, Icon, Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import {confirmAlert} from "react-confirm-alert";

export default function RoomCard({room, deleteRoom}) {
    const submit = () => {
        confirmAlert({
            title: 'Delete room?',
            message: 'Are you sure?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => deleteRoom(room),
        })
    };
    return (
        <Card>
            <Dimmer invert='true' active={room.loading}>
                <Loader content='Loading...'/>
            </Dimmer>
            <Card.Content>
                <Card.Header>
                    {room.room}
                </Card.Header>
                <Card.Meta>
                    <br/>
                    <p><Icon name='home'/> Floor: {room.floor}</p>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">
                    <Button as={Link} to={`/room/edit/${room.id}`} basic color={'green'} icon={'pencil'}
                            content={'Edit'}/>
                    <Button basic color="red" onClick={() => {
                        submit()
                    }}><Icon name='delete'/>Delete</Button>
                </div>
            </Card.Content>
        </Card>
    );
}
