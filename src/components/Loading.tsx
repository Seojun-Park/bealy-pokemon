import { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const Wrapper = styled.div``;
