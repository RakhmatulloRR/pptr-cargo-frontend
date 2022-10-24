import styled from 'styled-components';
import { ReactComponent as arrowRight } from '../assets/icons/arrow-right.svg';
import { ReactComponent as Plus } from '../assets/icons/plus.svg';
import { Collapse, Empty, Spin } from 'antd';
import { ReactComponent as Search } from '../assets/icons/search.svg';

// import { Collapse, Empty, Switch } from 'antd';
import { ReactComponent as stopWhite } from '../assets/icons/stop-red.svg';
import { ReactComponent as stopGrey } from '../assets/icons/stop-grey.svg';
import { ReactComponent as playWhite } from '../assets/icons/play-white.svg';
import { ReactComponent as refreshGrey } from '../assets/icons/refresh-grey.svg';

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 57px;
  border-bottom: 1px solid #e7ebf3;
  padding-left: 25px;
  padding-right: 25px;
  background: #fff;
  border-radius: 4px;
  justify-content: space-between;

  .customBtn {
    div {
      display: flex;
      align-items: center;
      padding-left: 5px;
      font-weight: var(--appTopNavButtonFontWeight);
      font-size: var(--appTopNavButtonFontSize);
      line-height: var(--appTopNavButtonLineHeight);
      letter-spacing: var(----appTopNavButtonLetterSpacing);
    }
  }

  .add {
    display: flex;
    align-items: center;
    div {
      padding-left: 5px;
      font-weight: var(--appTopNavButtonFontWeight);
      font-size: var(--appTopNavButtonFontSize);
      line-height: var(--appTopNavButtonLineHeight);
      letter-spacing: var(----appTopNavButtonLetterSpacing);
    }
  }
`;
export const Right = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: fit-content;
  grid-gap: 15px;
`;

TopBar.Plus = styled(Plus)`
  width: 12px;
  height: 12px;
  margin-right: 7px;
  path {
    fill: #fff;
  }
`;

TopBar.Search = styled(Search)`
  width: 18px;
  height: 18px;

  cursor: pointer;
  path {
    fill: #6b6d70;
  }

  &:hover path {
    fill: #4a5160;
  }
`;
TopBar.RightBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 36px;
  font-weight: 600;
  font-size: var(--appTableFontSize);
  background: ${({ blue }) => (blue ? '#1893FF' : '#fff')};
  color: ${({ blue }) => (blue ? '#fff' : '#000')};
  border-radius: 2px;
  border: 1px solid #dbdbdb;
  margin-left: ${({ blue }) => (blue ? '22px' : 'auto')};
  cursor: pointer;

  div {
    color: ${({ blue }) => (blue ? '#fff' : ' #1893FF')};
    padding-left: 5px;
    font-weight: 600;
    font-size: var(--appTableFontSize);
    line-height: 22px;
    letter-spacing: 0.02em;
  }
`;

export const StopWhite = styled(stopWhite)``;
export const StopGrey = styled(stopGrey)``;
export const RefreshGrey = styled(refreshGrey)``;
export const PlayWhite = styled(playWhite)``;

const { Panel } = Collapse;

const getBgColor = ({ status }) => {
  switch (status) {
    case 'FAIL':
      return { bg: '#313E47' };

    case 'SUCCESS':
      return { bg: '#00B533' };
    default:
      return { bg: '#313E47' };
  }
};

export const CardStatus = styled.div`
  font-family: var(--appPrimaryFont);
  font-style: normal;
  font-weight: normal;
  font-size: var(--appTableFontSize);
  width: 100px;
  height: 26px;
  color: #fff;
  text-align: center;
  border-radius: 20px;
  line-height: 26px;
  display: flex;
  justify-content: center;
  background: ${(status) => {
    return getBgColor(status).bg;
  }};
`;

export const ConnectionsBoard = styled.div`
  width: 100%;
  height: 100%;

  /* margin-top: 15px; */
  @media (max-width: 1550px) {
    .scrolable {
      overflow: hidden;
      overflow-x: scroll !important;
    }
  }
`;

export const ConnectionsCards = styled.div`
  width: 100%;
  margin-top: 50px;
  height: fit-content;

  @media (max-width: 1550px) {
    .scrolable {
      overflow: hidden;
      overflow-x: scroll !important;
    }
  }
`;

export const Card = styled.div`
  width: 100%;
  height: 100px;
  min-width: 1100px !important;
  background: #fff;
  border-radius: 6px;
  padding: 0 20px;
  transition: all 0.3s;
  box-shadow: 0px 2px 4px rgba(211, 211, 211, 0.56);
  margin-top: -20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  &:hover {
    background: #fafbfb;
  }
`;

Card.StatusText = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100px;
  /* margin-right: 40px; */
  /* min-width: 100px; */
`;

Card.Location = styled.div`
  width: 30%;
  display: flex;
  flex-direction: ${({ last }) => !last && 'column'};
  border-right: ${({ last }) => !last && '1px solid #cbcbcb'};
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  gap: ${({ last }) => last && '30px'}; ;
`;

Card.TopText = styled.div`
  font-family: var(--appPrimaryFont);

  font-weight: 500;
  font-size: 15px;
  line-height: 28px;
  color: #828282;
`;
Card.BottomText = styled.div`
  font-family: var(--appPrimaryFont);

  font-weight: 500;
  font-size: 15px;
  line-height: 28px;
  color: #313e47;
  white-space: nowrap !important;
`;

Card.Icon = styled(arrowRight)`
  width: 8px;
  height: 13px;
  cursor: pointer;
  text-align: right;
`;

export const AddConnection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const ConnectionNew = styled.div`
  display: flex;
  margin: 60px 0 35px 0;
`;

ConnectionNew.BtnWrap = styled.div`
  display: flex;
  align-items: center;
`;
ConnectionNew.Text = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 22px;
  color: #313e47;
  margin-left: 15px;
`;

ConnectionNew.AddButton = styled(Plus)`
  width: 50px;
  height: 50px;
  padding: 18px;
  fill: white;
  cursor: pointer;
  background: #00b238;
  border-radius: 100px;
  path {
    fill: #fff;
  }
`;

ConnectionNew.Tab = styled.div`
  width: 437px;
  height: 50px;
  margin-left: auto;
  background: #f3f4f5;
  border-radius: 100px;
  display: flex;
  align-items: center;
`;

ConnectionNew.TabBtn = styled.div`
  width: 142px;
  height: 40px;
  background: ${({ active }) => (active ? '#FFFFFF' : '#F8F8F8')};
  box-shadow: ${({ active }) =>
    active && '0px 2px 2px rgba(187, 187, 187, 0.32)'};
  border-radius: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ active }) => !active && '0.3'};

  font-family: var(--appPrimaryFont);

  font-weight: bold;
  font-size: 16px;
  line-height: 14px;
  letter-spacing: -0.02em;
  color: #313e47;
  transition: all 0.7s;
`;

export const AntEmpty = styled(Empty)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

export const AntCollapse = styled(Collapse)`
  min-width: 1100px !important;
  border: none !important;

  div.ant-collapse-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    border: none !important;
    div.ant-collapse-content {
      border-top: none !important;
    }

    div.ant-collapse-header {
      svg[data-icon='right'] {
        fill: black;
        display: none;
      }
      padding: 0 !important;
      > div {
        color: rgba(68, 68, 68, 0.66) !important;
        font-family: var(--appPrimaryFont) !important;
        font-style: normal !important;
        font-weight: normal !important;
        font-size: 16px !important;
      }
    }
  }
  div.listheader {
    :first-child {
      margin-top: -30px;
    }
    div.ant-collapse-header {
      svg {
        fill: transparent;
      }
    }
    div {
      cursor: default !important;
      /* padding: 0 !important; */
    }
    margin-top: -20px;
  }
`;

AntCollapse.Container = styled.div``;

export const AntPanel = styled(Panel)``;
// =============================
export const SpinWrapper = styled('div')`
  height: 22px;
  width: 20px;
  display: flex;
  justify-content: ${({ textAlign }) => (textAlign ? textAlign : 'start')};
  align-items: center;
`;
export const SpinAntd = styled(Spin)`
  margin-top: 3px;
  .ant-spin-dot-item {
    background-color: ${({ bgc }) => bgc};
  }
`;
