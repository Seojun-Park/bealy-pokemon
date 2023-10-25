import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

interface ChipProps {
  color?: string;
  label: string;
  icon?: boolean;
  fontColor?: string;
  isButton?: boolean;
  onClick?: () => void;
}

export const Chip: FC<ChipProps> = ({
  color = theme.colors.normal,
  icon,
  label,
  isButton,
  onClick,
}) => {
  const iconUrl = `/bealy-pokemon/icons/${label}.png`;

  if (isButton) {
    return (
      <ButtonWrapper
        style={{
          backgroundColor: color,
        }}
        onClick={onClick}>
        {icon && (
          <img
            src={iconUrl}
            width={theme.spacing.sm}
            height={theme.spacing.sm}
          />
        )}
        <span>{label.toUpperCase()}</span>
      </ButtonWrapper>
    );
  }

  return (
    <Wrapper
      style={{
        backgroundColor: color,
      }}>
      {icon && (
        <img
          src={iconUrl}
          width={theme.spacing.sm}
          height={theme.spacing.sm}
        />
      )}
      <span>{label.toUpperCase()}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: ${theme.spacing.sm}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & img {
    margin: 0;
    margin-right: ${theme.spacing.xs}px;
  }
  & span {
    font-family: 'GameBoy';
    color: white;
  }

  @media screen and (${theme.device.mobile}) {
    padding: ${theme.spacing.xs / 2}px ${theme.spacing.xs}px;
    & span {
      font-size: ${theme.fonts.caption}px;
    }
  }

  @media screen and (${theme.device.desktop}) {
    padding: ${theme.spacing.xs / 2}px ${theme.spacing.sm}px;
    margin: ${theme.spacing.xs / 2}px;
    & span {
      font-size: ${theme.fonts.caption + 2}px;
    }
  }
`;

const ButtonWrapper = styled.button`
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.xs / 2}px ${theme.spacing.sm}px;
  margin: ${theme.spacing.xs / 2}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
  border: none;
  & img {
    margin: 0;
    margin-right: ${theme.spacing.xs}px;
  }
  & span {
    font-family: 'GameBoy';
    font-size: ${theme.fonts.caption + 2}px;
    color: white;
  }
  &:hover {
    opacity: 0.6;
    transition: 0.2s linear;
  }
`;
