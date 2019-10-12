import React from 'react';
import { Button, withStyles } from '@material-ui/core';

const App = withStyles({
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
})(({ classes }) => (
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
