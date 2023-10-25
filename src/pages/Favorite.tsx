import { FC } from 'react';
import styled from 'styled-components';
import { Card, GoBackButton } from '../components';
import { theme } from '../utils/theme';
import { useFavoriteContext } from '../contexts';

export const Favorite: FC = () => {
  const { favorites } = useFavoriteContext();

  return (
    <Wrapper>
      <GoBackContainer>
        <GoBackButton />
      </GoBackContainer>
      <Container>
        <TitleBox>
          <img
            src={'/icons/ball.webp'}
            width={theme.spacing.md}
            height={theme.spacing.md}
          />
          <span>My Pokemons</span>
        </TitleBox>
        <Grid>
          {favorites?.map((p, i) => {
            return (
              <Card
                key={i}
                isLiked
                url={p.url}
              />
            );
          })}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media screen and (${theme.device.mobile}) {
  }

  @media screen and (${theme.device.desktop}) {
    padding: ${theme.spacing.lg}px 0;
  }
`;

const GoBackContainer = styled.div`
  width: 90%;
  margin: ${theme.spacing.sm}px ${theme.spacing.xl}px;
`;

const Container = styled.div`
  margin: 0 auto;
  @media screen and (${theme.device.mobile}) {
    width: 100%;
  }

  @media screen and (${theme.device.desktop}) {
    max-width: 90%;
  }
`;

const TitleBox = styled.div`
  margin-top: 0;
  background-color: white;
  border-radius: ${theme.spacing.sm}px;
  box-shadow: 0px 6px 15px -4px ${theme.colors.dark};
  display: flex;
  align-items: center;
  justify-content: center;

  & span {
    font-family: 'GameBoy';
    font-size: ${theme.fonts.subTitle}px;
  }

  & img {
    margin-right: ${theme.spacing.md}px;
  }

  @media screen and (${theme.device.mobile}) {
    margin: ${theme.spacing.sm}px;
    padding: ${theme.spacing.sm}px;
    & span {
      font-size: ${theme.fonts.heading}px;
    }
  }

  @media screen and (${theme.device.desktop}) {
    margin: ${theme.spacing.lg}px;
    padding: ${theme.spacing.md}px;
    & span {
      font-size: ${theme.fonts.subTitle}px;
    }
  }
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;
