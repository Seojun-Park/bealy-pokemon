import {
  ChangeEvent,
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

interface SearchBarProps {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

export const SearchBar: FC<SearchBarProps> = ({ term, setTerm, onSearch }) => {
  const handleWrite = (e: ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onSearch();
    }
  };

  return (
    <Wrapper>
      <Input
        type='text'
        placeholder='Please enter a term to search pokemon'
        value={term}
        onChange={handleWrite}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={onSearch}>
        <img
          src={'/icons/loupe.png'}
          width={30}
          height={30}
        />
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: white;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  border-radius: ${theme.spacing.xs}px;
  margin-top: ${theme.spacing.xl}px;
  box-shadow: 0px 6px 15px -4px #eeeeee;
`;

const Input = styled.input`
  min-width: 500px;
  border: none;
  margin-right: ${theme.spacing.xs}px;
  font-size: ${theme.fonts.title / 2}px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.4;
    padding: 0 ${theme.spacing.xs}px;
    font-size: ${theme.fonts.title / 2}px;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  transform: scale(1);
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
    transition: 0.2s linear;
  }
`;
