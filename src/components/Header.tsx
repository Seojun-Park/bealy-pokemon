import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import { Link as BaseLink } from 'react-router-dom';

export const Header: FC = () => {
  return (
    <Wrapper>
      <Link to='/'>
        <Title>Pokemon Wikipedia</Title>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
`;

const Link = styled(BaseLink)`
  text-decoration: none;
`;

const Title = styled.span`
  font-size: ${theme.fonts.title}px;
  font-family: 'Tenada';
  margin-left: ${theme.spacing.lg}px;
  color: ${theme.colors.normal};
`;
