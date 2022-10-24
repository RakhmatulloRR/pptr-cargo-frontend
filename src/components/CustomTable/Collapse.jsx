/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import Row from './Row';
import RowScrolable from './RowScrolable';
import { GridTable } from './styled';

const Counter = ({ length, names, InnerRenderer, InnerRendererParams }) => {
  return (
    <GridTable.Counter>
      {InnerRenderer ? (
        <InnerRenderer value={InnerRendererParams} length={length} />
      ) : (
        <>
          {length} {length > 1 ? names?.[1] || 'items' : names?.[0] || 'item'}
        </>
      )}
    </GridTable.Counter>
  );
};

const Collapse = ({
  item,
  groupRowRendererParams,
  columnDefs,
  gridTemplateColumns,
  Header,
  openAllCollapse,
  scrolable,
  defaultOpenCollapse,
  clearActiveOnCell,
  rowHeight,
}) => {
  const CollapsTable = useRef(null);
  const collapseHeadder = useRef(null);
  const [expandAll, setExpandAll] = useState(openAllCollapse);

  useEffect(() => {
    if (!openAllCollapse && !defaultOpenCollapse) {
      setExpandAll(false);
    }
    if (
      (openAllCollapse && defaultOpenCollapse) ||
      (!openAllCollapse && defaultOpenCollapse)
    ) {
      setExpandAll(true);
    }
  }, [openAllCollapse]);
  // useEffect(() => {
  //   addRemoveClassName(
  //     CollapsTable?.current?.classList,
  //     'close-collapse',
  //     openAllCollapse ? 'remove' : 'add'
  //   );
  // }, [openAllCollapse]);
  const doubleClick = (e) => {
    e.target.closest('.new-table-collapse').classList.toggle('close-collapse');
  };
  const onClickCollape = (e) => {
    !e.target.classList.contains('active-collapse') &&
      e.target.classList.add('active-collapse');
  };
  const onBlurCollapse = () => {
    collapseHeadder?.current?.classList.contains('active-collapse') &&
      collapseHeadder?.current?.classList.remove('active-collapse');
  };
  return (
    <GridTable.Collapse
      className={`new-table-collapse ${
        expandAll ? '' : 'close-collapse'
        // !openAllCollapse && !defaultOpenCollapse && 'close-collapse'
      }`}
      ref={CollapsTable}
      headerheight={groupRowRendererParams?.height || 40}
    >
      <GridTable.CollapseHeader
        ref={collapseHeadder}
        onDoubleClick={doubleClick}
        onClick={onClickCollape}
        onBlur={onBlurCollapse}
        height={groupRowRendererParams?.height || 40}
      >
        <div className='arrow' onClick={doubleClick} />
        {groupRowRendererParams?.suppressCount && (
          <Counter
            length={item[groupRowRendererParams?.dataField]?.length}
            names={groupRowRendererParams?.groupItemName}
            InnerRenderer={groupRowRendererParams?.innerCounterRenderer}
            InnerRendererParams={item[groupRowRendererParams?.titleField]}
          />
        )}
        {Header && <Header value={item[groupRowRendererParams?.titleField]} />}
      </GridTable.CollapseHeader>
      <div className={'inner-collapse-data'}>
        {scrolable
          ? item[groupRowRendererParams?.dataField]?.map((item, i) => (
              // eslint-disable-next-line react/jsx-indent
              <RowScrolable
                key={i}
                i={i}
                item={item}
                columnDefs={columnDefs}
                gridTemplateColumns={gridTemplateColumns}
                clearActiveOnCell={clearActiveOnCell}
              />
            ))
          : item[groupRowRendererParams?.dataField]?.map((item, i) => (
              // eslint-disable-next-line react/jsx-indent
              <Row
                key={i}
                i={i}
                item={item}
                columnDefs={columnDefs}
                rowHeight={rowHeight}
                gridTemplateColumns={gridTemplateColumns}
                clearActiveOnCell={clearActiveOnCell}
              />
            ))}
      </div>
    </GridTable.Collapse>
  );
};

export default React.memo(Collapse);
