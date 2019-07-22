import React from 'react';
import './styles.css';

const Cell = ({
  cellId, cellClass, selectCell, row, col,
}) => (
  <div
    className={cellClass}
    id={cellId}
    onClick={selectCell.bind(this, row, col)}
  />
);

export default Cell;
