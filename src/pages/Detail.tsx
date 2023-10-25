import { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import styled from 'styled-components';
import fetcher from '../utils/fetcher';
import {
  EvolvesToProps,
  Pokemon,
  PokemonBase,
  PokemonImageProps,
  PokemonSpeciesType,
} from '../type';
import { ColorType, theme } from '../utils/theme';
import { Chip, GoBackButton } from '../components';
import axios from 'axios';

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
  const [evolution, setEvolution] = useState<PokemonBase[]>([]);
  const [evolutionChainUrl, setEvolutionChainUrl] = useState<string>();

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
      // @ts-expect-error no type for url
      setEvolutionChainUrl(speciesData.evolution_chain?.url);
    }
  }, [speciesData]);

  const handleEvolutionChain = useCallback(
    (children: Array<EvolvesToProps>, arr: PokemonBase[]) => {
      children.forEach((c) => {
        arr.push(c.species);
        if (c.evolves_to.length > 0) {
          handleEvolutionChain(c.evolves_to, arr);
        }
      });
    },
    []
  );

  useEffect(() => {
    if (evolutionChainUrl) {
      Promise.resolve(
        axios.get(evolutionChainUrl).then((response) => {
          return response.data;
        })
      ).then((result) => {
        const evolutionChain: PokemonBase[] = [result.chain.species];
        handleEvolutionChain(result.chain.evolves_to, evolutionChain);

        Promise.all(
          evolutionChain.map((e) => {
            return axios
              .get(`https://pokeapi.co/api/v2/pokemon/${e.name}`)
              .then((response) => {
                return response.data;
              });
          })
        ).then((result: Pokemon[]) => {
          setEvolution(
            result?.map((r) => {
              if (
                r.sprites.versions['generation-v'] &&
                r?.sprites.versions['generation-v']['black-white']
              ) {
                return {
                  name: r.name,
                  url:
                    r.sprites.versions['generation-v']['black-white'].animated
                      .front_default || r.sprites.front_default,
                };
              } else {
                return {
                  name: r.name,
                  url: r.sprites.front_default,
                };
              }
            })
          );
        });
      });
    }
  }, [evolutionChainUrl, handleEvolutionChain]);

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
      <GoBackContainer>
        <GoBackButton />
      </GoBackContainer>
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
            <span className='desc'>{data?.weight} kg</span>
          </MeasurementCol>
          <MeasurementCol>
            <Chip label='Height' />
            <span className='desc'>0.{data?.height} m</span>
          </MeasurementCol>
          <MeasurementCol>
            <Chip label='Habitat' />
            <span className='desc'>{speciesData?.habitat.name}</span>
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
        <ImagesByVersionContainer>
          <Chip label='Pokemon Evolution Chain' />
          <div className='imageContainer'>
            {evolution.map((e, i) => {
              return (
                <ImageContainer
                  key={i}
                  className='imageBox'>
                  <img
                    src={e.url}
                    width={80}
                    height={80}
                  />
                  <span>
                    {i + 1}.{e.name}
                  </span>
                </ImageContainer>
              );
            })}
          </div>
        </ImagesByVersionContainer>
      </Content>
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
  @media screen and (${theme.device.mobile}) {
  }

  @media screen and (${theme.device.desktop}) {
    margin: ${theme.spacing.sm}px 0;
  }
`;

const Content = styled.div`
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (${theme.device.mobile}) {
    margin: 0 ${theme.spacing.xs}px;
  }

  @media screen and (${theme.device.desktop}) {
  }
`;

const Measurement = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.lg}px 0;

  @media screen and (${theme.device.mobile}) {
    /* flex-direction: column; */
    max-width: ${theme.breakpoints.mobile}px;
  }

  @media screen and (${theme.device.desktop}) {
  }
`;

const MeasurementCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & span {
    font-family: 'GameBoy';
  }

  @media screen and (${theme.device.mobile}) {
    margin: 0 ${theme.spacing.xs}px;
    & .desc {
      margin-top: ${theme.spacing.xs}px;
      font-size: ${theme.fonts.desc}px;
    }
  }

  @media screen and (${theme.device.desktop}) {
    margin: 0 ${theme.spacing.sm}px;
    & span {
      font-size: ${theme.fonts.p}px;
    }
  }
`;

const DescriptionRow = styled.div`
  display: flex;
  align-items: center;

  @media screen and (${theme.device.mobile}) {
    margin: ${theme.spacing.xs}px 0;
    span {
      max-width: ${theme.breakpoints.mobile}px;
      word-wrap: break-word;
    }
  }

  @media screen and (${theme.device.desktop}) {
    margin: ${theme.spacing.xs}px 0;
  }
`;

const ImageBox = styled.div`
  display: flex;
  @media screen and (${theme.device.mobile}) {
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: ${theme.spacing.xs}px;
  }

  @media screen and (${theme.device.desktop}) {
    margin: ${theme.spacing.md}px;
  }
`;

const ImageContainer = styled.div`
  box-shadow: 0px 6px 15px -4px ${theme.colors.dark};
  border-radius: ${theme.spacing.xs}px;
  @media screen and (${theme.device.mobile}) {
    padding: ${theme.spacing.xs}px;
    margin: ${theme.spacing.xs}px;
  }

  @media screen and (${theme.device.desktop}) {
    padding: ${theme.spacing.xs / 2}px;
    margin: 0 ${theme.spacing.sm}px;
  }
`;

const ImagesByVersionContainer = styled.div`
  display: flex;
  flex-direction: column;
  & .imageContainer {
    display: flex;
    flex-direction: row;
    margin-top: ${theme.spacing.sm}px;
  }

  & .imageContainer .imageBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-width: 200px;
    padding: ${theme.spacing.sm}px;

    span {
      font-family: 'GameBoy';
      margin-top: ${theme.spacing.sm}px;
    }
  }
`;
