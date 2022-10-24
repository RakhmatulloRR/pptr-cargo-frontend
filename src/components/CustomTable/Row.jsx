import React from 'react';
import { GridTable } from './styled';
import EditableCell from './Cell';

const Row = ({
  i,
  columnDefs,
  gridTemplateColumns,
  item,
  onRowClick,
  clearActiveOnCell,
  collapsibleRow,
  rowHeight,
}) => {
  const onClick = (e) => {
    onRowClick ? onRowClick() : e?.stopPropagation();
  };
  return (
    <GridTable.Tr
      index={i}
      height={
        rowHeight === 'auto' || `${rowHeight}`?.endsWith('px')
          ? rowHeight
          : rowHeight
          ? rowHeight + 'px'
          : '40px'
      }
      length={columnDefs?.length}
      gridTemplateColumns={gridTemplateColumns}
      className='new-table-row'
      onClick={onClick}
    >
      {columnDefs?.map((colDefs, j) => (
        <EditableCell
          key={j}
          index={j}
          item={item}
          colDefs={colDefs}
          clearActiveOnCell={clearActiveOnCell}
          collapsibleRow={collapsibleRow}
        />
      ))}
    </GridTable.Tr>
  );
};

export default React.memo(Row);
