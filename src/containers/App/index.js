import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Buttons } from 'Components';
import AppConst from 'Constants';
import ActionTypes from 'ActionTypes';
import './styles.css';

class App extends Component {
  createEmptyGrid = () => {
    const arr = new Array(AppConst.ROWS);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(AppConst.COLS).fill(false);
    }
    return arr;
  };

  startButton = () => {
    clearInterval(this.intervalId);
    this.intervalId = setInterval(this.start, AppConst.SPEED);
  };

  stopButton = () => {
    clearInterval(this.intervalId);
  };

  clearButton = () => {
    const { onChangeGrid } = this.props;

    clearInterval(this.intervalId);
    onChangeGrid && onChangeGrid(this.createEmptyGrid());
  };

  start = () => {
    const { grid, onChangeGrid } = this.props;

    const g = grid && grid;
    const g2 = grid && JSON.parse(JSON.stringify(grid));

    for (let i = 0; i < AppConst.ROWS; i++) {
      for (let j = 0; j < AppConst.COLS; j++) {
        let count = 0;
        if (typeof g[i - 1] !== 'undefined') {
          if (typeof g[i - 1][j - 1] !== 'undefined') {
            if (g[i - 1][j - 1]) count++;
          }
          if (typeof g[i - 1][j] !== 'undefined') {
            if (g[i - 1][j]) count++;
          }
          if (typeof g[i - 1][j + 1] !== 'undefined') {
            if (g[i - 1][j + 1]) count++;
          }
        }
        if (typeof g[i + 1] !== 'undefined') {
          if (typeof g[i + 1][j - 1] !== 'undefined') {
            if (g[i + 1][j - 1]) count++;
          }
          if (typeof g[i + 1][j] !== 'undefined') {
            if (g[i + 1][j]) count++;
          }
          if (typeof g[i + 1][j + 1] !== 'undefined') {
            if (g[i + 1][j + 1]) count++;
          }
        }
        if (typeof g[i][j + 1] !== 'undefined') if (g[i][j + 1]) count++;
        if (typeof g[i][j - 1] !== 'undefined') if (g[i][j - 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    onChangeGrid && onChangeGrid(g2);
  };

  render() {
    const { grid, onChangeGrid } = this.props;

    return (
      <div>
        <h1>The Game of Life</h1>
        <Grid
          grid={grid && grid.length === 0
            ? onChangeGrid && onChangeGrid(this.createEmptyGrid())
            : grid}
        />
        <Buttons
          startButton={this.startButton}
          stopButton={this.stopButton}
          clearButton={this.clearButton}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    grid: state.grid,
  }),
  dispatch => ({
    onChangeGrid: (grid) => {
      dispatch({ type: ActionTypes.CHANGE_GRID, payload: grid });
    },
  }),
)(App);
