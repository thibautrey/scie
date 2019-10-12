import React from 'react';
import { compose, lifecycle } from 'recompose';
import { Button, withStyles } from '@material-ui/core';

const App = compose(
  withStyles({
    Test: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridColumnGap: '20px',
      width: '100%',
      padding: 20
    },
    ButtonsContainer: {},
    buttons: {
      margin: 10
    }
  }),
  lifecycle({
    componentDidMount: () => {
      //var socket = io.connect('http://localhost:3000');
      /*socket.on('message', function(message) {
        $('#logs').html(message);
      });

      $('#input').change(e => {
        valueInput = e.target.value;
      });

      $('#envoyer').click(e => {
        socket.emit('message', valueInput);
      });*/
    }
  })
)(({ classes }) => (
  <div className={classes.Test}>
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
    </div>

    <div>Status du chariot</div>
  </div>
));

export default App;
