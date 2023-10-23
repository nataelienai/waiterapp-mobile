/* eslint-disable react-native/no-raw-text */
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { ICartItem } from '../types/ICartItem';
import { ICategory } from '../types/ICategory';
import { IProduct } from '../types/IProduct';
import { api } from '../utils/api';

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
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  const hasProducts = products.length > 0;

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')])
      .then(([productResponse, categoryResponse]) => {
        setProducts(productResponse.data as IProduct[]);
        setCategories(categoryResponse.data as ICategory[]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = categoryId
      ? `/categories/${categoryId}/products`
      : '/products';

    setIsLoadingProducts(true);

    const response = await api.get(route);

    setIsLoadingProducts(false);
    setProducts(response.data as IProduct[]);
  }

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
              <Categories
                categories={categories}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onSelectCategory={handleSelectCategory}
              />
            </CategoriesContainer>

            {isLoadingProducts && (
              <CenteredContainer>
                <ActivityIndicator color="#D73035" size="large" />
              </CenteredContainer>
            )}

            {!isLoadingProducts && hasProducts && (
              <MenuContainer>
                <Menu onAddToCart={handleAddToCart} products={products} />
              </MenuContainer>
            )}

            {!isLoadingProducts && !hasProducts && (
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
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}

          {selectedTable && (
            <Cart
              cartItems={cartItems}
              selectedTable={selectedTable}
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
