import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

export const Footer: FC = () => {
  return (
    <Wrapper>
      <Container>
        <Description>This is awesome Pokemon wiki</Description>
        <Description>JinPark</Description>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${theme.colors.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media screen and (${theme.device.mobile}) {
    height: 120px;
  }
  
  @media screen and (${theme.device.desktop}) {
    height: 150px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.span`
  font-family: 'Pretendard';
  color: white;

  @media screen and (${theme.device.mobile}) {
    font-size: ${theme.fonts.p + 4}px;
  }

  @media screen and (${theme.device.desktop}) {
    font-size: ${theme.fonts.heading}px;
  }
`;
