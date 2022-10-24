import { Button } from 'antd';
import styled from 'styled-components';
import { ReactComponent as Back } from '../assets/icons/arrow-left.svg';

export const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: nowrap;
  width: fit-content;
  border-bottom: ${({ border }) => border};
  padding-bottom: ${({ border }) => (border ? '20px' : 0)};
`;
export const Title = styled.div`
  margin-right: 3%;
  align-items: center;
  font-family: var(--appPrimaryFont);
  font-weight: 900;
  font-size: 25px;
  line-height: 25px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  color: #313e47;
`;
export const Total = styled.div`
  display: flex;
  font-family: var(--appPrimaryFont);
  font-weight: 700;
  font-size: 17px;
  line-height: 18px;
  color: #5c6470;
`;
export const Text = styled.div`
  padding-left: 7px;
  font-family: var(--appPrimaryFont);
  font-size: 16px;
  font-weight: 600;
  color: #5c6470;
`;
export const BackButton = styled(Button)`
  width: ${({ isAnotherPage }) => (isAnotherPage ? '105px' : 0)};
  height: 32px;
  display: flex;
  grid-gap: 6px;
  margin-right: 15px;
  justify-content: center;
  align-items: center;
  padding: 8px 28px 8px 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  outline: none;
  border-radius: 5px;
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  transition: width 1s ease-in-out;
  &:hover {
    background-image: linear-gradient(
      59.06deg,
      rgba(4, 166, 251, 1),
      rgba(4, 166, 251, 0.1)
    );
    color: #fff;
    #back__button {
      path {
        fill: #fff;
      }
    }
  }
`;
BackButton.Icon = styled(Back)``;
