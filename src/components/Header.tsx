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
      <ButtonBox to='/pokemon/favorite'>
        <img
          src={'/icons/ball.webp'}
          width={30}
          height={30}
        />
        <span>My pokemons</span>
      </ButtonBox>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  background-color: white;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ButtonBox = styled(Link)`
  display: flex;
  color: ${theme.colors.dark};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 0 ${theme.spacing.lg}px;
  transform: scale(1);

  img {
    margin: ${theme.spacing.xs}px 0;
    &:hover {
      transform: scale(1.5);
      transition: 0.2s linear;
    }
  }

  span {
    font-family: 'GameBoy';
    font-size: ${theme.fonts.caption}px;
  }
`;
