import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.View`
  flex: 1;
  background: #fafafa;
`;

export const HeaderContainer = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
`;

export const CategoriesContainer = styled.View`
  height: 73px;
  margin-top: 34px;
`;

export const MenuContainer = styled.View`
  flex: 1;
`;

export const FooterContainer = styled.View`
  min-height: ${isAndroid ? '0' : '110px'};
  padding: 16px 24px;
`;

export const Footer = styled.SafeAreaView``;
