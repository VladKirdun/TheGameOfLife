import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Cell } from 'Components';
import AppConst from 'Constants';
import ActionTypes from 'ActionTypes';
import './styles.css';

class Grid extends PureComponent {
  selectCell = (row, col) => {
    const { grid, onChangeGrid } = this.props;

    const gridCopy = grid && JSON.parse(JSON.stringify(grid));
    gridCopy[row][col] = !gridCopy[row][col];
    onChangeGrid && onChangeGrid(gridCopy);
  };

  renderCell = () => {
    const { grid } = this.props;

    const rowsArr = [];

    for (let i = 0; i < AppConst.ROWS; i++) {
      for (let j = 0; j < AppConst.COLS; j++) {
        const cellId = `${i}_${j}`;

        rowsArr.push(
          <Cell
            cellClass={grid && grid[i][j] ? 'cell on' : 'cell off'}
            key={cellId}
            row={i}
            col={j}
            selectCell={this.selectCell}
          />,
        );
      }
    }

    return rowsArr;
  };

  render() {
    const width = AppConst.COLS * 21;

    return (
      <div className="grid" style={{ width }}>
        {this.renderCell()}
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
)(Grid);
