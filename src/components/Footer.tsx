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
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.span`
  font-size: ${theme.fonts.heading}px;
  font-family: 'Pretendard';
  color: white;
`;
