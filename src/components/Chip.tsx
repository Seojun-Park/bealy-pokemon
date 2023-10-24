import { FC } from 'react';
import styled from 'styled-components';
import { theme } from '../utils/theme';

interface ChipProps {
  color?: string;
  label: string;
  icon?: boolean;
  fontColor?: string;
}

export const Chip: FC<ChipProps> = ({
  color = theme.colors.normal,
  icon,
  label,
}) => {
  const iconUrl = `/icons/${label}.png`;

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

export const Wrapper = styled.div`
  border-radius: ${theme.spacing.sm}px;
  padding: ${theme.spacing.xs / 2}px ${theme.spacing.sm}px;
  margin: ${theme.spacing.xs / 2}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  & img {
    margin: 0;
    margin-right: ${theme.spacing.xs}px;
  }
  & span {
    font-family: 'GameBoy';
    font-size: ${theme.fonts.caption + 2}px;
    color: white;
  }
`;
