import styled from 'styled-components/native';

export const CartItem = styled.View`
  padding: 8px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Product = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 48px;
  height: 40px;
  border-radius: 6px;
`;

export const Quantity = styled.View`
  min-width: 20px;
  margin-left: 12px;
`;

export const ProductDetails = styled.View``;

export const Actions = styled.View`
  flex-direction: row;
  gap: 20px;
`;

export const Summary = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
`;

export const TotalPrice = styled.View`
  flex: 1;
`;
