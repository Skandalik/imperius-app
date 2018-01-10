import React from 'react';
import {Button, Card, Dimmer, Icon, Loader} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

export default function RoomCard({room, deleteRoom}) {
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
                        deleteRoom(room)
                    }}><Icon name='delete'/>Delete</Button>
                </div>
            </Card.Content>
        </Card>
    );
}
