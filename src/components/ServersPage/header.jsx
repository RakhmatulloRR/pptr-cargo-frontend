/* eslint-disable react-hooks/rules-of-hooks */
// import { EditIcon, IconDelete, Card, CardStatus } from './style';

import { Button } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import { useServersContext } from '../Context';
import {
  Card,
  CardStatus,
  RefreshGrey,
  SpinAntd,
  SpinWrapper,
  StopGrey,
} from './style';

const dateRenderer = ({ data }, name) => {
  return (
    <div>
      {data?.[name] ? moment(data?.[name]).format('DD/MM/YYYY hh:mm') : ''}
    </div>
  );
};
const File = ({ data }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card.StatusText>
        <CardStatus status={data?.status}>{data?.status || 'N/A'}</CardStatus>
      </Card.StatusText>
    </div>
  );
};
const timeRenderer = ({ data }) => {
  return <div>{data?.timeInterval}</div>;
};
const actionRenderer = ({ data }) => {
  const [toggle, setToggle] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  const [{ refetch }, dispatch] = useServersContext();

  const postData = {
    lastAttemptDate: new Date(),
  };
  const handleRefresh = async (d) => {
    setToggle(false);
    await fetch(`http://localhost:3006/${d.api}`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then(() => {
        refetch();
        setToggle(true);
        dispatch({ type: 'setHandleRefresh', payload: handleRefresh });
      });
  };
  const handleClear = async (d) => {
    setToggle2(false);
    await fetch(`http://localhost:3006/${d.api}/stop`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          refetch();
          setToggle2(true);
          dispatch({ type: 'setHandleClear', payload: handleClear });
        }
      });
  };

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '3px',
      }}
    >
      <Button onClick={() => handleRefresh(data)}>
        {toggle ? (
          <SpinWrapper>
            <RefreshGrey />
          </SpinWrapper>
        ) : (
          <SpinWrapper>
            <SpinAntd textAlign='center' bgc={'#000'} size='small' />
          </SpinWrapper>
        )}
      </Button>
      <Button onClick={() => handleClear(data)}>
        {toggle2 ? (
          <SpinWrapper>
            <StopGrey />
          </SpinWrapper>
        ) : (
          <SpinWrapper>
            <SpinAntd textAlign='center' bgc={'#000'} size='small' />
          </SpinWrapper>
        )}
      </Button>
    </div>
  );
};

export const columns = [
  {
    headerName: 'VENDOR',
    field: 'leaserName',
    width: '170px',
  },
  {
    headerName: 'COMPANY',
    field: 'companyName',
    width: '150px',
  },
  {
    headerName: 'website',
    field: 'websiteUrl',
    flex: 1,
  },
  {
    headerName: 'email',
    field: 'email',
    flex: 1,
  },
  {
    headerName: 'LAST UPDATE DATE',
    field: 'lastUpdateDate',
    cellRenderer: (data) => dateRenderer(data, 'lastUpdateDate'),
    width: '150px',
  },
  {
    headerName: 'LAST ATTEMPT DATE',
    field: 'lastAttemptDate',
    cellRenderer: (data) => dateRenderer(data, 'lastAttemptDate'),
    width: '150px',
  },
  {
    headerName: 'STATUS',
    field: 'status',
    cellRenderer: File,
    width: '120px',
  },
  {
    headerName: 'MESSAGE',
    field: 'message',
    flex: 1.5,
  },
  {
    headerName: 'TIME INTERVAL',
    field: 'timeInterval',
    cellRenderer: timeRenderer,
    width: '120px',
  },

  {
    headerName: 'ACTIONS',
    cellRenderer: actionRenderer,
    width: '120px',
  },
];
