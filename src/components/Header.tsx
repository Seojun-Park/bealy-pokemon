import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

export const Header: FC = () => {
  return (
    <Wrapper>
      <Title>Pokemon Wikipedia</Title>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
`;

const Title = styled.span`
  font-size: ${theme.fonts.title}px;
  font-family: 'Tenada';
  margin-left: ${theme.spacing.lg}px;
  color: ${theme.colors.normal};
`;
