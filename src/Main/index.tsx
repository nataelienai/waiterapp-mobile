/* eslint-disable react-native/no-raw-text */
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';

import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  HeaderContainer,
  MenuContainer,
} from './styles';

export function Main() {
  return (
    <>
      <Container>
        <HeaderContainer>
          <Header />
        </HeaderContainer>

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>

      <FooterContainer>
        <Footer>
          <Button onPress={() => alert('Novo pedido')}>Novo Pedido</Button>
        </Footer>
      </FooterContainer>
    </>
  );
}
