import React from 'react';
import ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar , IconButton, Typography } from '@material-ui/core/Toolbar';
import { Menu as MenuIcon } from '@material-ui/icons';

const contentNode = document.getElementById('contents');

const app = (
  <AppBar position="static">
    <Toolbar>
      <IconButton color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit">
        Tracker
      </Typography>
    </Toolbar>
  </AppBar>
);

ReactDOM.render(app, contentNode);
