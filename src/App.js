import React from 'react';
import { compose, withPropsOnChange, withHandlers, withState, withStateHandlers, withProps } from 'recompose';
import { Button, withStyles, Input, LinearProgress, Typography } from '@material-ui/core';
import socketIOClient from 'socket.io-client';
import { reverse, slice, sortBy } from 'lodash';

let socket = socketIOClient(`http://${window.location.hostname}:3030`);
const App = compose(
  withStyles({
    Test: {
      display: 'grid',
      gridTemplateRows: 'max-content 1fr',
      gridRowGap: '10px',
      width: '100%'
    },
    ButtonsContainer: {
      width: 'calc(100% - 40px)',
      justifySelf: 'center'
    },
    buttons: {
      margin: 10,
      height: 60
    },
    buttonsAvanceRecule: {
      margin: 2,
      height: 50
    },
    InputCustom: {
      display: 'block'
    },
    Custom: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '10px',
      justifyContent: 'center',
      alignContent: 'center',
      padding: '10px',
      backgroundColor: 'gainsboro',
      width: 'calc(100% - 20px)'
    },
    CustomOk: {
      justifySelf: 'center',
      alignSelf: 'center'
    },
    Progress: {
      display: 'block',
      width: 'calc(100% - 40px)'
    },
    grid2: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '10px'
    },
    AvanceRecule: {
      width: '100%',
      textAlign: 'center'
    },
    buttonsContainer: {
      textAlign: 'center'
    }
  }),
  withStateHandlers(
    { log: [], encoderValue: 0, statusPlate: {}, arrived: true, direction: 'forward', custom: 0, asked: 0 },
    {
      updateLog: ({ log }) => value => {
        if (value.indexOf('ENC') !== -1) {
          return { encoderValue: value.replace('ENC', '') };
        } else if (value.indexOf('TOGO') !== -1) {
          const vals = value.replace('TOGO', '').split(';');
          return { statusPlate: { togo: vals[0], todo: vals[1] }, arrived: false };
        } else if (value.indexOf('ARVD') !== -1) {
          return { arrived: true };
        } else if (value.indexOf('GO_FORWARD') !== -1) {
          return { direction: 'forward' };
        } else if (value.indexOf('GO_BAKC') !== -1) {
          return { direction: 'backward' };
        }

        let logTemp = log;
        logTemp.push({ date: new Date(), value: value });
        return {
          log: logTemp
        };
      },
      toggleArrived: ({ arrived }) => () => ({ arrived: !arrived }),
      onChangeCustom: () => e => {
        return { custom: e.target.value };
      },
      updateAsked: () => value => {
        return { asked: value };
      }
    }
  ),
  withPropsOnChange(['timestamp'], ({ updateLog }) => {
    socket.on('message', data => {
      updateLog(data);
    });
  }),
  withState('timestamp', 'updateTimestamp', new Date()),
  withHandlers({
    sendButton: ({ toggleArrived, updateAsked }) => button => {
      toggleArrived();
      updateAsked(button);
      if (button >= 0) {
        socket.emit('message', `0,${button}`);
      } else {
        socket.emit('message', `1,${button * -1}`);
      }
    }
  }),
  withProps({
    buttons: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
  })
)(({ classes, log, sendButton, buttons, encoderValue, statusPlate, arrived, asked, onChangeCustom, custom }) => (
  <div className={classes.Test}>
    <div className={classes.Progress}>
      Status chariot: {arrived ? 'Arrivé' : `En mouvement ${asked}mm`}
      {!arrived && (
        <LinearProgress color="primary" variant="determinate" value={(1 - statusPlate.togo / statusPlate.todo) * 100} />
      )}
    </div>

    <div className={classes.ButtonsContainer}>
      <div className={classes.Custom}>
        <div>
          <input
            className={classes.InputCustom}
            label="Côte personnalisé"
            className={classes.textField}
            type="number"
            pattern="[0123456789]*-"
            margin="normal"
            value={custom}
            onChange={onChangeCustom}
          />
        </div>
        <div className={classes.CustomOk}>
          <Button variant="contained" onClick={sendButton.bind(null, parseInt(custom))}>
            Ok
          </Button>
        </div>
      </div>
      <div className={classes.buttonsContainer}>
        {buttons.map(row => (
          <Button className={classes.buttons} variant="contained" color="primary" onClick={sendButton.bind(null, row)}>
            {row}mm
          </Button>
        ))}
      </div>
    </div>

    <div className={classes.AvanceRecule}>
      <Button
        className={classes.buttonsAvanceRecule}
        variant="contained"
        color="secondary"
        onClick={sendButton.bind(null, -200)}
      >
        Recule (200mm)
      </Button>
      <Button
        className={classes.buttonsAvanceRecule}
        variant="contained"
        color="warning"
        onClick={sendButton.bind(null, 200)}
      >
        Avance (200mm)
      </Button>
    </div>

    <div className={classes.grid2}>
      <div>
        <Typography>Logs</Typography>
        {slice(reverse(sortBy(log, ['date'])), 0, 10).map(row => (
          <div key={row.date.getTime()}>{row.value}</div>
        ))}
      </div>
      <div>
        Status encodeur
        <div>
          <Typography>{encoderValue}</Typography>
        </div>
      </div>
    </div>
  </div>
));

export default App;
