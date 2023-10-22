/* eslint-disable react-native/no-raw-text */
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { products as mockProducts } from '../mocks/products';
import { ICartItem } from '../types/ICartItem';
import { IProduct } from '../types/IProduct';

import {
  CategoriesContainer,
  CenteredContainer,
  Container,
  Footer,
  FooterContainer,
  HeaderContainer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [isLoading] = useState(false);
  const [products] = useState<IProduct[]>(mockProducts);

  const hasProducts = products.length > 0;

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: IProduct) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const hasProduct = prevState.some(
        (item) => item.product._id === product._id,
      );

      if (!hasProduct) {
        return prevState.concat({ product, quantity: 1 });
      }

      return prevState.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
  }

  function handleSubtractFromCart(product: IProduct) {
    setCartItems((prevState) => {
      const cartItem = prevState.find(
        (item) => item.product._id === product._id,
      );

      if (cartItem?.quantity === 1) {
        return prevState.filter((item) => item.product._id !== product._id);
      }

      return prevState.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
    });
  }

  return (
    <>
      <Container>
        <HeaderContainer>
          <Header
            selectedTable={selectedTable}
            onCancelOrder={handleResetOrder}
          />
        </HeaderContainer>

        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#D73035" size="large" />
          </CenteredContainer>
        )}

        {!isLoading && (
          <>
            <CategoriesContainer>
              <Categories />
            </CategoriesContainer>

            {hasProducts ? (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            ) : (
              <CenteredContainer>
                <Empty />

                <Text
                  color="#666"
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{ marginTop: 24 }}
                >
                  Nenhum produto foi encontrado!
                </Text>
              </CenteredContainer>
            )}
          </>
        )}
      </Container>

      <FooterContainer>
        <Footer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading || !hasProducts}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onSubtract={handleSubtractFromCart}
              onConfirmOrder={handleResetOrder}
            />
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
