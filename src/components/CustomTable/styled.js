import styled from 'styled-components';
import { Collapse } from 'antd';
import { ReactComponent as Down } from '../assets/icons/arrow-down.svg';

export const GridTable = styled.div`
  width: 100%;
  border: 1px solid #f3f4f5;
  color: #313e47;
  font-size: var(--appTableFontSize);
  background: transparent;
  height: calc(100% - ${({ height }) => (height ? height : '0')}px);

  div.turncated {
    text-overflow: ellipsis;
    width: calc(98%);
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
`;

GridTable.Body = styled.div`
  height: calc(
    100% - 40px - ${({ filter }) => (filter === 'true' ? '40' : '0')}px
  );
  transition: height 0.3s;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(193, 193, 193);
    width: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: rgb(168, 168, 168);
  }
`;

GridTable.Filter = styled.div`
  background: #f1f3f8;
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  ${({ filter, openfilter }) =>
    filter
      ? openfilter === 'true'
        ? 'height: 40px;'
        : 'height: 0px'
      : 'height: 40px'};
  overflow: hidden;
  transition: height 0.3s;
`;
GridTable.Tr = styled.div`
  display: grid;
  grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
  height: ${({ height }) => (height ? height : '40px')};
  transition: height 0.3s;
  background: ${({ header }) => (header ? '#f1f3f8' : '#fff')};
  &:hover {
    background: ${({ header }) => (header ? '#f1f3f8' : '#ecf0f1')};
  }
  /* &[scrollout='true'] > * {
    display: none;
  } */
`;

GridTable.Td = styled.div`
  line-height: 40px;
  border: 1px solid transparent;
  border-left-color: #e5e7eb;
  border-bottom-color: #e5e7eb;
  padding: 0 10px;
  grid-column: span ${({ colSpan }) => colSpan};
  text-align: ${({ colSpan }) => (colSpan ? 'center' : 'left')};
  height: 100%;
  outline: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &.active-cell {
    border-color: #007aff !important;
  }
  &:hover {
    border-color: #007aff !important;
  }
  &.copied {
    animation: 1s anim linear;
    @keyframes anim {
      from {
        background: #007aff;
        color: white;
      }
      to {
        background: #fff;
        color: black;
      }
    }
  }
  .edit-cell-text {
    outline: none !important;
    border: none !important;
    width: 100%;
    height: 100%;
  }
`;

GridTable.Th = styled.div`
  background: #f1f3f8;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 0;
    width: 1px;
    background: #e5e7eb;
  }
  display: ${({ filter }) => filter && 'flex'};
  align-items: center;
  justify-content: center;
`;
GridTable.CollapseHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: #f0f6ff !important;
  height: ${({ height }) => height + 'px'};
  border: 1px solid #e5e7eb;
  border-top-color: transparent;
  /* &.active-collapse {
    border-color: #007aff !important;
  } */
  &:focus-within:not(:focus) {
    border-color: #007aff !important;
  }
  &:focus,
  &:hover {
    border-color: #007aff !important;
  }
  .arrow {
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    cursor: pointer;
    &::after {
      content: '';
      position: absolute;
      top: 40%;
      left: 50%;
      width: 10px;
      height: 10px;
      border: 1px solid transparent;
      border-bottom-color: #959597;
      border-right-color: #959597;
      transform-origin: 3px 3px;
      transform: rotate(45deg) translate(-50%, -50%);
      transition: transform 0.3s;
    }
  }
`;
GridTable.Collapse = styled.div`
  background: #f0f6ff !important;
  height: ${({ height, headerheight }) =>
    height ? height + headerheight + 'px' : 'auto'};
  overflow: hidden;
  transition: height 0.3s;
  &.close-collapse {
    height: ${({ headerheight }) => headerheight + 'px'};
    .arrow::after {
      transform: rotate(-45deg) translate(-50%, -50%);
    }
  }
`;

GridTable.Counter = styled.div`
  position: absolute;
  top: 0;
  left: 70px;
  bottom: 0;
  display: flex;
  align-items: center;
`;

const { Panel } = Collapse;

export const AntPanel = styled(Panel)`
  /* background-color: ${({ index }) =>
    index % 2 === 0 ? 'white' : '#f1f3f8'}; */
  /* font-size: var(--appTableFontSize);
  color: #313e47; */
`;

export const AntCollapse = styled(Collapse)`
  min-width: 900px;
  border: none !important;
  div.ant-collapse-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    border: none !important;
    div.ant-collapse-content {
      border-top: none !important;
      div.ant-collapse-content-box {
        padding: 0 !important;
      }
    }
    div.ant-collapse-header {
      svg {
        fill: black;
      }
      display: flex;
      align-items: center;
      padding: 0 !important;
      height: 40px !important;
      > div {
        color: #313e47 !important;

        font-family: var(--appPrimaryFont) !important;
        font-style: normal !important;
        font-weight: normal !important;
        font-size: var(--appTableFontSize) !important;
        line-height: 18px !important;
        align-items: center !important;
        div {
          div {
            div:last-child {
              font-size: 13px !important;
            }
          }
        }
      }
    }
  }
  div.listheader {
    div.ant-collapse-header {
      svg {
        fill: transparent;
      }
    }
    div {
      cursor: default !important;
    }
  }
`;

export const IconDown = styled(Down)`
  margin-left: 10px;
  width: 10px;
  height: 10px;
  ${(props) =>
    props.isactive === 'true' ? 'transform:rotate(-180deg)' : null};
  transition: all 0.3s, visibility 0s;
  path {
    fill: inherit;
  }
`;
