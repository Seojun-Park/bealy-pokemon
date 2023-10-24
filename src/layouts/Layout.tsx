import { FC, PropsWithChildren, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { Footer, Header } from '../components';

export const Layout: FC<PropsWithChildren> = () => {
  return (
    <Wrapper>
      <Suspense fallback='Wait a moment...'>
        <Header />
        <Outlet />
        <Footer />
      </Suspense>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f2f4f6;
`;
