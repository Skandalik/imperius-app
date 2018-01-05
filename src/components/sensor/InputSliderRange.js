import React from 'react';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button/Button';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';
import GridRow from 'semantic-ui-react/dist/commonjs/collections/Grid/GridRow';
import GridColumn from 'semantic-ui-react/dist/commonjs/collections/Grid/GridColumn';
import Statistic from 'semantic-ui-react/dist/commonjs/views/Statistic/Statistic';

export default function InputSliderRange(
  sensor,
  min,
  max,
  current,
  key,
  step,
  setStatusSensor,
  onChangeSlider,
  onChangeFinished
) {

  return (
    <Grid key={key}>
      <GridRow>
        <GridColumn width={1} />
        <GridColumn width={1}>
          <Statistic size="tiny">
            <Statistic.Value>{current}</Statistic.Value>
            <Statistic.Label>Status</Statistic.Label>
          </Statistic>
        </GridColumn>

        <GridColumn width={2} />
        <GridColumn width={6}>
          <input
            type="range"
            step={step}
            min={min}
            max={max}
            id={key}
            value={current}
            className="input-slider slider"
            onChange={() => onChangeSlider(this.event, current)}
          />
        </GridColumn>

        <GridColumn width={2}>
          {current !== 0 ? (
            <Button
              circular
              icon="power"
              color="red"
              onClick={() => setStatusSensor(sensor, 0)}
            />
          ) : (
            ''
          )}
        </GridColumn>
        <GridColumn width={2} />
      </GridRow>
    </Grid>
  );
}
