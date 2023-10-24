import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

interface DropdownProps<T> {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
  options: Array<{
    id: T;
    name: string;
  }>;
}

export const DropDown = <T extends number | string>({
  value,
  setValue,
  options,
}: DropdownProps<T>) => {
  const [isDropdownView, setDropdownView] = useState<boolean>(false);

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };

  return (
    <Wrapper onBlur={handleBlurContainer}>
      <Button onClick={handleClickContainer}>
        {value}
        {isDropdownView ? <span>&#9660;</span> : <span>&#9650;</span>}
      </Button>
      {isDropdownView && (
        <Ul>
          {options.map((v, i) => (
            <Li
              key={i}
              onClick={() => {
                setValue(v.id);
              }}>
              {v.name}
            </Li>
          ))}
        </Ul>
      )}
    </Wrapper>
  );
};

export default null;

const Wrapper = styled.div`
  position: relative;
  width: 200px;
`;

const Button = styled.button`
  border: none;
  width: 100%;
  padding: ${theme.spacing.xs}px ${theme.spacing.md}px;
  box-shadow: 0px 6px 15px -4px #dddddd;
  cursor: pointer;
  border-radius: ${theme.spacing.xs}px;
  background-color: white;

  font-family: 'GameBoy';
  font-size: ${theme.fonts.heading}px;

  span {
    color: ${theme.colors.dragon};
  }
`;

const Ul = styled.ul`
  position: absolute;
  background-color: white;
  z-index: 999;
  width: 100%;
  box-shadow: 0px 6px 15px -4px #dddddd;
  margin-top: ${theme.spacing.xs}px;
`;

const Li = styled.li`
  list-style: none;
  cursor: pointer;
  padding: ${theme.spacing.xs}px ${theme.spacing.md}px;
  font-family: 'GameBoy';
  &:hover {
    background-color: #dddddd;
    transition: 0.2s linear;
  }
`;
