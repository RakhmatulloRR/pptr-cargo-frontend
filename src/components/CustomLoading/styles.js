import styled from 'styled-components';

export const CustomLoadingWrapper = styled('div')`
  height: ${({ height }) =>
    height
      ? height?.toString()?.endsWith('%')
        ? height
        : height + 'px'
      : '100vh'};
  width: ${({ width }) => width || '100%'};
  flex: 1;
  display: flex;
  justify-content: center;
  background: ${({ bgcolor }) => bgcolor};
  align-items: center;
  position: ${({ position }) => position};
  left: ${({ position }) => position && '50%'};
  transform: translateX(${({ position }) => position && '-50%'});
  .ant-spin-dot-item {
    background-color: ${({ color }) => color};
  }
  .ant-spin-dot {
    font-size: ${({ fontsize }) => fontsize || '32px'};
  }
`;
export const LoadingWrapper = styled.div`
  width: 100%;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
