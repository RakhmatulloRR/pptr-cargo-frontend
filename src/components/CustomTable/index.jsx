/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react';
import { CustomLoading } from '../CustomLoading';
import Collapse from './Collapse';
import Row from './Row';
import RowScrolable from './RowScrolable';
import { AntCollapse, AntPanel, GridTable, IconDown } from './styled';

const CustomTable = ({
  columnDefs,
  openFilter,
  rowData,
  groupRowRendererParams,
  isLoading,
  scrolable,
  isFetching,
  rowCollapsible: PanelRenderer,
  onRowClick,
  rowHeight,
}) => {
  const table = useRef(null);
  const [data, setData] = useState();
  const [rowId, setRowId] = useState();
  const gridTemplateColumns = columnDefs
    ?.map((columnDef) =>
      columnDef?.['flex']
        ? `${columnDef?.['flex']}fr`
        : columnDef?.['width']
        ? `${
            isNaN(columnDef?.['width'])
              ? columnDef?.['width']
              : columnDef?.['width'] + 'px'
          }`
        : '1fr'
    )
    ?.join(' ');
  function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }

  useEffect(() => {
    function getData() {
      if (groupRowRendererParams?.['groupBy']) {
        let objData = groupBy(rowData, groupRowRendererParams?.['groupBy']);
        let headers = Object.keys(objData);
        groupRowRendererParams?.['firstGroupName']
          ? headers?.unshift(
              headers?.splice(
                headers?.indexOf(groupRowRendererParams?.['firstGroupName']),
                1
              )[0]
            )
          : headers?.unshift(headers?.splice(headers?.indexOf('null'), 1)[0]);
        groupRowRendererParams?.['lastGroupName'] &&
          headers?.push(
            headers?.splice(
              headers?.indexOf(groupRowRendererParams?.['lastGroupName']),
              1
            )[0]
          );
        let data = headers?.map((title) => {
          let obj = {};
          obj[groupRowRendererParams?.['titleField']] = title;
          obj[groupRowRendererParams?.['dataField']] = objData[title];
          return obj;
        });
        setData(data);
      } else {
        setData(rowData);
      }
    }
    getData();
  }, [rowData]);
  const handleCollapse = (id) => {
    setRowId(id);
  };
  const clearActiveOnCell = () => {
    const cells = table?.current?.querySelectorAll('.new-table-cell');
    for (let cell of cells) {
      cell?.classList?.contains('active-cell') &&
        cell?.classList?.remove('active-cell');
    }
  };
  return (
    <GridTable ref={table} height={table?.current?.offsetTop}>
      <GridTable.Tr
        length={columnDefs?.length}
        gridTemplateColumns={gridTemplateColumns}
        style={{ paddingLeft: PanelRenderer ? '33px' : 0 }}
        header='true'
      >
        {columnDefs?.map(
          ({ headerName, headerRenderer: HeaderRenderer, headerStyle, i }) => {
            return (
              <GridTable.Th
                key={headerName || i}
                style={headerStyle && headerStyle()}
              >
                {HeaderRenderer ? (
                  <HeaderRenderer />
                ) : (
                  headerName?.toUpperCase()
                )}
              </GridTable.Th>
            );
          }
        )}
      </GridTable.Tr>

      <GridTable.Filter
        filter='true'
        openfilter={openFilter?.toString()}
        gridTemplateColumns={gridTemplateColumns}
        style={{ paddingLeft: PanelRenderer ? '33px' : 0 }}
      >
        {columnDefs?.map(({ floatingFilterComponent: Filter }, index) => (
          <GridTable.Th key={index} filter='true' openfilter={openFilter}>
            {Filter && <Filter />}
          </GridTable.Th>
        ))}
      </GridTable.Filter>
      <GridTable.Body filter={openFilter?.toString()}>
        {isLoading ? (
          <CustomLoading height={'100%'} />
        ) : rowData?.length < 1 ? (
          <GridTable.Tr>
            <GridTable.Td colSpan={columnDefs?.length}>
              {isFetching ? 'Fetching...' : 'No data found'}
            </GridTable.Td>
          </GridTable.Tr>
        ) : groupRowRendererParams ? (
          data?.map((item, i) =>
            item?.[groupRowRendererParams?.['titleField']] !== null ? (
              <Collapse
                key={i + Math.random() * 10000}
                defaultOpenCollapse={i === 0}
                item={item}
                groupRowRendererParams={groupRowRendererParams}
                columnDefs={columnDefs}
                gridTemplateColumns={gridTemplateColumns}
                Header={groupRowRendererParams?.innerRenderer}
                openAllCollapse={groupRowRendererParams?.openAllCollapse}
                scrolable={scrolable}
                clearActiveOnCell={clearActiveOnCell}
                rowHeight={rowHeight}
              />
            ) : (
              <div className='new-table-collapse'>
                <div className={'inner-collapse-data'}>
                  {scrolable
                    ? item?.data?.map((item, i) => {
                        return (
                          <RowScrolable
                            key={i}
                            i={i}
                            item={item}
                            columnDefs={columnDefs}
                            gridTemplateColumns={gridTemplateColumns}
                            clearActiveOnCell={clearActiveOnCell}
                          />
                        );
                      })
                    : item?.data?.map((item, i) => {
                        return (
                          <Row
                            key={i}
                            i={i}
                            item={item}
                            columnDefs={columnDefs}
                            gridTemplateColumns={gridTemplateColumns}
                            clearActiveOnCell={clearActiveOnCell}
                          />
                        );
                      })}
                </div>
              </div>
            )
          )
        ) : scrolable ? (
          PanelRenderer ? (
            <AntCollapse
              onChange={handleCollapse}
              expandIcon={({ isActive }) => (
                <IconDown isactive={isActive ? 'true' : 'false'} />
              )}
              accordion
            >
              {data?.map((item, i) => {
                return (
                  <AntPanel
                    key={i}
                    header={
                      <RowScrolable
                        key={i}
                        i={i}
                        item={item}
                        columnDefs={columnDefs}
                        gridTemplateColumns={gridTemplateColumns}
                        collapsibleRow={!!PanelRenderer}
                        clearActiveOnCell={clearActiveOnCell}
                      />
                    }
                    index={i}
                    className='new-table-collapse-panel'
                  >
                    <div
                      style={{
                        borderBottom: '1px solid #e5e7eb',
                        marginLeft: '33px',
                      }}
                    >
                      <PanelRenderer id={rowId} data={item} />
                    </div>
                  </AntPanel>
                );
              })}
            </AntCollapse>
          ) : (
            data?.map((item, i) => {
              return (
                <RowScrolable
                  key={i}
                  i={i}
                  item={item}
                  rowHeight={rowHeight}
                  columnDefs={columnDefs}
                  gridTemplateColumns={gridTemplateColumns}
                  clearActiveOnCell={clearActiveOnCell}
                />
              );
            })
          )
        ) : PanelRenderer ? (
          <AntCollapse
            onChange={handleCollapse}
            accordion
            expandIcon={({ isActive }) => (
              <IconDown isactive={isActive ? 'true' : 'false'} />
            )}
          >
            {data?.map((item, i) => {
              return (
                <AntPanel
                  key={i}
                  header={
                    <Row
                      key={i}
                      i={i}
                      item={item}
                      columnDefs={columnDefs}
                      gridTemplateColumns={gridTemplateColumns}
                      onRowClick={onRowClick}
                      collapsibleRow={!!PanelRenderer}
                      clearActiveOnCell={clearActiveOnCell}
                    />
                  }
                  index={i}
                  className='new-table-collapse-panel'
                >
                  <div
                    style={{
                      borderBottom: '1px solid #e5e7eb',
                      marginLeft: '33px',
                    }}
                  >
                    <PanelRenderer id={rowId} data={item} />
                  </div>
                </AntPanel>
              );
            })}
          </AntCollapse>
        ) : (
          data?.map((item, i) => {
            return (
              <Row
                key={i}
                i={i}
                item={item}
                rowHeight={rowHeight}
                columnDefs={columnDefs}
                gridTemplateColumns={gridTemplateColumns}
                clearActiveOnCell={clearActiveOnCell}
              />
            );
          })
        )}
      </GridTable.Body>
    </GridTable>
  );
};

export default React.memo(CustomTable);
