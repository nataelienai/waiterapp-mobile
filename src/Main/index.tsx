/* eslint-disable react-native/no-raw-text */
import React, { useState } from 'react';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';

import {
  CategoriesContainer,
  Container,
  Footer,
  FooterContainer,
  HeaderContainer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

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
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
          )}
        </Footer>
      </FooterContainer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
