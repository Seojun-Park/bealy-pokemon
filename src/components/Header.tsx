import { FC } from 'react';
import { Link as BaseLink } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../utils/theme';
import { useMediaQuery } from '../hooks';

export const Header: FC = () => {
  const isDesktop = useMediaQuery(theme.device.desktop);
  return (
    <Wrapper>
      <Link to='/'>
        <Title>Pokemon Wikipedia</Title>
      </Link>
      <ButtonBox to='/pokemon/favorite'>
        <img
          src={'/bealy-pokemon/icons/ball.webp'}
          width={30}
          height={30}
        />
        {isDesktop && <span>My pokemons</span>}
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
  font-family: 'Tenada';
  color: ${theme.colors.normal};

  @media screen and (${theme.device.mobile}) {
    margin-left: ${theme.spacing.xs}px;
    font-size: ${theme.fonts.heading}px;
  }

  @media screen and (${theme.device.desktop}) {
    margin-left: ${theme.spacing.lg}px;
    font-size: ${theme.fonts.title}px;
  }
`;

const ButtonBox = styled(Link)`
  display: flex;
  color: ${theme.colors.dark};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transform: scale(1);

  span {
    font-family: 'GameBoy';
  }

  @media screen and (${theme.device.mobile}) {
    margin: 0 ${theme.spacing.xs}px;

    span {
      font-size: ${theme.fonts.caption}px;
    }
  }

  @media screen and (${theme.device.desktop}) {
    margin: 0 ${theme.spacing.lg}px;
    img {
      margin: ${theme.spacing.xs}px 0;
      &:hover {
        transform: scale(1.5);
        transition: 0.2s linear;
      }
    }
    span {
      font-size: ${theme.fonts.caption}px;
    }
  }
`;
