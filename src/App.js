import React from 'react';
import { compose, lifecycle } from 'recompose';
import { Button, withStyles, TextField, LinearProgress } from '@material-ui/core';
import socketIOClient from "socket.io-client";

const App = compose(
  withStyles({
    Test: {
      display: 'grid',
      gridTemplateRows: 'max-content 1fr',
      gridRowGap: '20px',
      width: '100%',
      padding: 20
    },
    ButtonsContainer: {
      width: "calc(100% - 40px)",
      justifySelf: "center"
    },
    buttons: {
      margin: 10
    },
    InputCustom: {
      display: "block"
    },
    Custom: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridColumnGap: "10px",
      justifyContent: "center",
      alignContent: "center",
    },
    CustomOk: {
      justifySelf: "center",
      alignSelf: "center"
    },
    Progress: {
      display: "block",
      width: "calc(100% - 40px)"
    }
  }),
  lifecycle({
    componentDidMount: () => {
      const socket = socketIOClient("http://localhost:3030");
      socket.on("message", data => {
        console.log(data)
      });
      socket.emit('message', "1")
    }
  })
)(({ classes }) => (
  <div className={classes.Test}>
    <div className={classes.Progress}>
      Status du chariot
      <div>
        <LinearProgress color="secondary" variant="determinate" value={0} />
      </div>
    </div>

    <div className={classes.ButtonsContainer}>
      <Button className={classes.buttons} variant="contained" color="primary">
        100mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        200mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        300mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        400mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        500mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        600mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        700mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        800mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        900mm
      </Button>
      <Button className={classes.buttons} variant="contained" color="primary">
        1000mm
      </Button>
      <div className={classes.Custom}>
        <div>
          <TextField
            className={classes.InputCustom}
            label="Côte personnalisé"
            className={classes.textField}
            margin="normal"
            value="0"
          />
        </div>
        <div className={classes.CustomOk}><Button variant="contained">Ok</Button></div>
      </div>
    </div>
  </div>
));

export default App;
