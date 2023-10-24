import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

export const Loading = () => {
  const [dots, setDots] = useState<string>('.');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (dots.length === 3) {
        setDots('.');
      } else {
        setDots(dots + '.');
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [dots]);

  return (
    <Wrapper>
      <span>Loading{dots}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl}px;
  height: 80vh;
  span {
    font-family: 'GameBoy';
  }
`;
