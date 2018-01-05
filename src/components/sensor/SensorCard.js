import React from 'react';
import {
  Statistic,
  Card,
  Button,
  Icon,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import InputSliderRange from './InputSliderRange';
import PropTypes from 'prop-types';
import Divider from 'semantic-ui-react/dist/commonjs/elements/Divider/Divider';
import Container from 'semantic-ui-react/dist/commonjs/elements/Container/Container';

export default function SensorCard({
  sensor,
  setStatusSensor,
  checkStatusSensor,
  deleteSensor,
  onChangeSlider,
  onChangeFinished
}) {
  return (
    <Card>
      <Dimmer invert="true" active={sensor.loading}>
        <Loader content="Loading..." />
      </Dimmer>
      <Card.Content>
        <Statistic size="small" floated="right">
          <Statistic.Value>
            <Icon name="circle" color={sensor.active ? 'green' : 'red'} />
          </Statistic.Value>
          <Statistic.Label>
            {sensor.active ? 'Active' : 'Inactive'}
          </Statistic.Label>
        </Statistic>
        <Card.Header>{sensor.name || 'Not set'}</Card.Header>
        <br />
        <Card.Meta>
          <p>
            <Icon name="circle" /> ID: {sensor.id}
          </p>
          <p>
            <Icon name="home" /> Room:{' '}
            {sensor.room ? sensor.room.room : 'Not set'}
          </p>
          <p>
            <Icon name="circle" /> Floor:{' '}
            {sensor.floor ? sensor.room.room : 'Not set'}
          </p>
          <p>
            <Icon name="circle" /> Status: {sensor.status}
          </p>
          <p>
            <Icon name="circle" /> {sensor.uuid}
          </p>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Container>
          {/* {sensor.adjustable ? (
            <InputSliderRange
              sensor={sensor}
              min={sensor.minimumValue}
              max={sensor.maximumValue}
              current={sensor.status}
              key={sensor.id}
              step={1}
              setStatusSensor={setStatusSensor}
              onChangeFinished ={onChangeFinished}
              onChangeSlider={onChangeSlider}
            />
          ) : (
            ''
          )} */}
        </Container>
        <div className="ui three buttons">
          {sensor.switchable || sensor.adjustable ? (
            <Button
              color={sensor.active ? 'red' : 'green'}
              icon="power"
              onClick={() => setStatusSensor(sensor, ~~!sensor.active)}
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
