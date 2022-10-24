import React from 'react';
import { BackButton, Text, Title, Total, Wrapper } from './style';

const TopBarTitle = ({ title, total, border, isAnotherPage, history }) => {
  const goBack = () => {
    history.push('/performance');
  };
  return (
    <Wrapper border={border}>
      {isAnotherPage ? (
        <BackButton isAnotherPage={isAnotherPage} onClick={goBack}>
          <BackButton.Icon id='back__button' /> <div>Back</div>
        </BackButton>
      ) : (
        ''
      )}
      <Title>{title}</Title>
      {total ? <Total>{total || 0}</Total> : ''}
      {total ? <Text>found</Text> : ''}
    </Wrapper>
  );
};

export default TopBarTitle;
