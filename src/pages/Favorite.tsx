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
  padding: ${theme.spacing.lg}px 0;
`;

const GoBackContainer = styled.div`
  width: 90%;
  margin: ${theme.spacing.sm}px ${theme.spacing.xl}px;
`;

const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const TitleBox = styled.div`
  padding: ${theme.spacing.md}px;
  margin: ${theme.spacing.lg}px;
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
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;
