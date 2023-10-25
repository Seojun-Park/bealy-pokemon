import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../utils/theme';

export const GoBackButton: FC = () => {
  const navigate = useNavigate();
  return (
    <Wrapper onClick={() => navigate(-1)}>
      <img
        src={'/bealy-pokemon/icons/arrow.png'}
        width={theme.spacing.sm}
        height={theme.spacing.sm}
      />
      <span>Go Back</span>
    </Wrapper>
  );
};

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: transparent;
  border: none;
  & span {
    margin-left: ${theme.spacing.xs}px;
    font-family: 'GameBoy';
  }
  &:hover {
    transition: 0.1s linear;
    opacity: 0.6;
  }
`;
