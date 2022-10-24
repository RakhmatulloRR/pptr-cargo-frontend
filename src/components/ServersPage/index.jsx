/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  ConnectionsBoard,
  TopBar,
  Right,
  StopWhite,
  PlayWhite,
  SpinWrapper,
  SpinAntd,
} from './style';

import { useServersContext } from '../Context';
import CustomTable from '../CustomTable';
import { columns } from './header';
import { Button, message } from 'antd';
import TopBarTitle from '../TopBarTitle';
const ServersPage = () => {
  const [runAll, setRunAll] = useState(false);
  const [stopAll, setStopAll] = useState(false);
  const [{ dataList, total, filter, refetchToggle }, dispatch] =
    useServersContext();

  const fetchData = () => {
    fetch('http://localhost:3006/api/all-data/list')
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        // console.log(res);
        if (res.success) {
          dispatch({ type: 'setDataList', payload: res.dataList });
          dispatch({ type: 'setTotal', payload: res.meta.total });
          dispatch({ type: 'setRefetch', payload: fetchData });
        }
      })
      .catch((err) => {
        message.error(err.message || 'Something went wrong!');
      });
  };

  const handleRunAll = async () => {
    setRunAll(true);
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      await fetch(`http://localhost:3006/${data.api}`, {
        method: 'POST',
        body: JSON.stringify({
          lastAttemptDate: new Date(),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(() => {
          fetchData();
        })
        .catch(() => {
          fetchData();
        });
    }
    setRunAll(false);
  };
  const handleStopAll = async () => {
    setStopAll(true);
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      await fetch(`http://localhost:3006/${data.api}/stop`, {
        method: 'POST',
      })
        .then((response) => response.json())
        .then(() => setStopAll(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetchToggle]);
  const btnStyle = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
  };
  return (
    <div
      style={{
        width: '99%',
        margin: 'auto',
        height: '100%',
        padding: '10px 0 0',
      }}
    >
      <ConnectionsBoard>
        <TopBar>
          <TopBarTitle title={'Servers'} total={total} />
          <Right>
            <Button style={btnStyle} type='primary' onClick={handleRunAll}>
              {!runAll ? (
                <SpinWrapper>
                  <PlayWhite />
                </SpinWrapper>
              ) : (
                <SpinWrapper>
                  <SpinAntd bgc={'#fff'} size='small' />
                </SpinWrapper>
              )}
              Run All
            </Button>
            <Button
              style={btnStyle}
              type='primary'
              onClick={handleStopAll}
              danger
            >
              {!stopAll ? (
                <SpinWrapper>
                  <StopWhite />
                </SpinWrapper>
              ) : (
                <SpinWrapper>
                  <SpinAntd bgc={'#fff'} size='small' />
                </SpinWrapper>
              )}{' '}
              Stop All
            </Button>
          </Right>
        </TopBar>

        <div
          style={{
            height: 'calc(100% - 20px - 70px)',
            position: 'relative',
          }}
        >
          <CustomTable
            rowData={dataList}
            openFilter={filter}
            columnDefs={columns}
          />
        </div>
      </ConnectionsBoard>
    </div>
  );
};

export default ServersPage;
