/* eslint-disable react-native/no-raw-text */
import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';

import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  MenuContainer,
} from './styles';

export function Main() {
  return (
    <>
      <Container>
        <Header />

        <CategoriesContainer>
          <Categories />
        </CategoriesContainer>

        <MenuContainer />
      </Container>

      <FooterContainer>
        <Footer>
          <Button onPress={() => alert('Novo pedido')}>Novo Pedido</Button>
        </Footer>
      </FooterContainer>
    </>
  );
}
