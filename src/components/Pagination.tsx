import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

interface PaginationProps {
  totalPages: number;
  perPage: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  perPage,
  currentPage,
  setCurrentPage,
}) => {
  const [pages, setPages] = useState<number[]>();

  useEffect(() => {
    const startIndex = currentPage / 10;
    if (startIndex % 10 === 0) {
      setPages(
        Array.from({ length: totalPages })
          .map((_, i) => i + 1)
          .slice(currentPage * perPage, currentPage * perPage + perPage)
      );
    } else if (startIndex < 1) {
      setPages(
        Array.from({ length: totalPages })
          .map((_, i) => i + 1)
          .slice(0, perPage)
      );
    } else {
      setPages(
        Array.from({ length: totalPages })
          .map((_, i) => i + 1)
          .slice(
            Math.floor(startIndex) * 10,
            Math.floor(startIndex) * perPage + perPage
          )
      );
    }
  }, [totalPages, currentPage, perPage]);

  return (
    <Wrapper>
      <Num onClick={() => setCurrentPage(0)}>First</Num>
      {pages?.map((num, i) => {
        return (
          <Num
            key={i}
            onClick={() => setCurrentPage(num - 1)}
            color={
              num === currentPage + 1 ? theme.colors.fire : theme.colors.dark
            }>
            {num}
          </Num>
        );
      })}
      <Num
        onClick={() =>
          setCurrentPage(
            currentPage % 10 === 0 ? currentPage + 10 : currentPage + 1
          )
        }>
        ...
      </Num>
      <Num onClick={() => setCurrentPage(Math.floor(totalPages / perPage))}>
        End
      </Num>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Num = styled.button<{ color?: string }>`
  font-family: 'GameBoy';
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: ${theme.spacing.xs}px;
  color: ${(props) => props.color};

  &:hover {
    color: ${theme.colors.fire};
    transition: 0.2s linear;
  }
`;
