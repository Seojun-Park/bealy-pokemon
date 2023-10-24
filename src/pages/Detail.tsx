import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '../utils/fetcher';
import { Pokemon, PokemonImageProps, PokemonSpeciesType } from '../type';
import styled from 'styled-components';
import { ColorType, theme } from '../utils/theme';
import { Chip } from '../components';

type DetailParamProps = {
  id: string;
};

const pokemonImg: string[] = [
  'front_default',
  'front_female',
  'back_default',
  'back_female',
  'front_shiny',
  'front_shiny_female',
  'back_shiny',
  'back_shiny_female',
];

export const Detail: FC = () => {
  const param = useParams<DetailParamProps>();
  const { data } = useSWR<Pokemon>(`/pokemon/${param.id}`, fetcher);
  const { data: speciesData } = useSWR<PokemonSpeciesType>(
    `/pokemon-species/${param.id}`,
    fetcher
  );
  const [thumbnail, setThumbnail] =
    useState<PokemonImageProps['front_default']>();
  const [type, setType] = useState<string[]>();
  const [description, setDescription] = useState<string[]>();

  useEffect(() => {
    if (
      data?.sprites.versions['generation-v'] &&
      data?.sprites.versions['generation-v']['black-white']
    ) {
      setThumbnail(
        data.sprites.versions['generation-v']['black-white'].animated
          .front_default || data.sprites.front_default
      );
    }
    if (data?.types) {
      setType(data.types.map((t) => t.type.name));
    }
  }, [data]);

  useEffect(() => {
    if (speciesData) {
      setDescription(
        Array.from(
          new Set(
            speciesData.flavor_text_entries
              .filter((v) => v.language.name === 'en')
              .map((text) => text.flavor_text)
              .slice(0, 5)
          )
        )
      );
    }
  }, [speciesData]);

  return (
    <Wrapper>
      <Thumbnail
        src={thumbnail || ''}
        width={theme.spacing.xl * 3}
        height={theme.spacing.xl * 3}
      />
      <Header>
        <ID>#{data?.id}</ID>
        <Name>{data?.name}</Name>
        <TypeBoxContainer>
          {type?.map((t, i) => {
            return (
              <Chip
                key={i}
                icon
                color={`${theme.colors[t as ColorType]}`}
                label={t}
              />
            );
          })}
        </TypeBoxContainer>
      </Header>
      <Content>
        <div>
          {description?.map((desc, i) => {
            return (
              <DescriptionRow key={i}>
                <img
                  src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
                  alt='ball'
                />
                <span>{desc}</span>
              </DescriptionRow>
            );
          })}
        </div>
        <Measurement>
          <MeasurementCol>
            <Chip label='Weight' />
            <span>{data?.weight} kg</span>
          </MeasurementCol>
          <MeasurementCol>
            <Chip label='Height' />
            <span>0.{data?.height} m</span>
          </MeasurementCol>
          <MeasurementCol>
            <Chip label='Habitat' />
            <span>{speciesData?.habitat.name}</span>
          </MeasurementCol>
        </Measurement>
        <ImageBox>
          {pokemonImg.map((type, i) => {
            const img = (data?.sprites[type] as string) || null;
            if (img) {
              return (
                <ImageContainer key={i}>
                  <img src={img} />
                </ImageContainer>
              );
            } else {
              return null;
            }
          })}
        </ImageBox>
      </Content>
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

const Thumbnail = styled.img``;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${theme.spacing.md}px 0;
`;
const ID = styled.span`
  font-family: 'PretendardBold';
  font-size: ${theme.fonts.p}px;
  color: ${theme.colors.caption};
`;
const Name = styled.span`
  font-family: 'GameBoy';
  font-size: ${theme.fonts.heading}px;
  margin-top: ${theme.spacing.xs}px;
`;

const TypeBoxContainer = styled.div`
  display: flex;
  margin: ${theme.spacing.sm}px 0;
`;

const Content = styled.div`
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Measurement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.lg}px 0;
`;

const MeasurementCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 ${theme.spacing.sm}px;
  & span {
    font-family: 'GameBoy';
    font-size: ${theme.fonts.p};
  }
`;

const DescriptionRow = styled.div`
  margin: ${theme.spacing.xs}px 0;
  display: flex;
  align-items: center;
`;

const ImageBox = styled.div`
  display: flex;
  margin: ${theme.spacing.md}px;
`;

const ImageContainer = styled.div`
  padding: ${theme.spacing.xs / 2}px;
  margin: 0 ${theme.spacing.sm}px;
  box-shadow: 0px 6px 15px -4px ${theme.colors.dark};
  border-radius: ${theme.spacing.xs}px;
`;
