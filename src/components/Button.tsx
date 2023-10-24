import { FC, ReactElement } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

interface ButtonProps {
  label?: string;
  onClick: () => void;
  font?: 'Pretendard' | 'GameBoy';
  icon?: ReactElement;
}

export const Button: FC<ButtonProps> = ({
  label = '',
  onClick,
  font = 'Pretendard',
  icon,
}) => {
  if (icon) {
    return <IconButton onClick={onClick}>{icon}</IconButton>;
  }
  return (
    <BaseButton
      onClick={onClick}
      $font={font}>
      {label}
    </BaseButton>
  );
};

const BaseButton = styled.button<{ $font?: string }>`
  border-radius: ${theme.spacing.xs}px;
  border: none;
  background-color: none;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  font-family: ${(props) =>
    props.$font === 'Pretendard' ? 'Pretendard' : 'GameBoy'};
  cursor: pointer;
  box-shadow: 0px 6px 15px -4px #cccccc;
  font-size: ${theme.fonts.desc}px;
  &:hover {
    transition: 0.2s linear;
    background-color: #cccccc;
  }
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: transparent;
  margin: 0 ${theme.spacing.sm}px;
  cursor: pointer;
`;
