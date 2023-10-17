import styled from 'styled-components/native';

interface ITextProps {
  weight?: '400' | '600' | '700';
  color?: string;
  size?: number;
  opacity?: number;
}

export const Text = styled.Text<ITextProps>`
  font-family: ${({ weight }) =>
    weight ? `GeneralSans-${weight}` : 'GeneralSans-400'};
  color: ${({ color }) => color ?? '#333'};
  font-size: ${({ size }) => (size ? `${size}px` : '16px')};
  opacity: ${({ opacity }) => opacity ?? 1};
`;
