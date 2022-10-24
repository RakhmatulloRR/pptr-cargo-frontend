/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { GridTable } from './styled';
import EditableCell from './Cell';

const RowScrolable = ({
  i,
  columnDefs,
  gridTemplateColumns,
  item,
  clearActiveOnCell,
  collapsibleRow,
  rowHeight,
}) => {
  const row = useRef(null);
  const [scrollOut, setScrollOut] = useState(true);
  const observer = new IntersectionObserver(
    function (entries) {
      if (entries[0]?.isIntersecting === true) {
        setScrollOut(false);
        // entries[0].target.setAttribute('scrollout', 'false');
        // console.log(entries[0].target);
      } else {
        setScrollOut(true);
        // entries[0].target.setAttribute('scrollout', 'true');
        // console.log(entries[0].target);
      }
    },
    { threshold: [0] }
  );

  // let viewed = false;
  useEffect(() => {
    // const abortController = new AbortController();
    // let observe = true;
    // if (observe) observer?.observe(row.current);
    observer?.observe(row?.current);
    return () => {
      observer.disconnect();
    };
    // return () => {
    //   observe = false;
    // };
    // return () => {
    // abortController.abort();
    // };
  }, [row]);
  return (
    <GridTable.Tr
      ref={row}
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
    >
      {/* {!scrollOut && */}
      {columnDefs?.map((colDefs, j) => (
        <EditableCell
          key={j}
          index={j}
          item={item}
          colDefs={colDefs}
          scrollOut={scrollOut}
          clearActiveOnCell={clearActiveOnCell}
          collapsibleRow={collapsibleRow}
        />
      ))}
    </GridTable.Tr>
  );
};

export default React.memo(RowScrolable);
