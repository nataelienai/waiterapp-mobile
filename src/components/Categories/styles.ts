import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

interface ICategoryProps {
  selected: boolean;
}

export const Category = styled.TouchableOpacity<ICategoryProps>`
  align-items: center;
  width: 80px;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;

export const Icon = styled.View`
  background: #fff;
  width: 44px;
  height: 44px;
  border: ${isAndroid ? '1px solid #ddd' : 0};
  border-radius: 22px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  box-shadow: 0px 2px 1px rgb(0, 0, 0, 0.1);
`;
