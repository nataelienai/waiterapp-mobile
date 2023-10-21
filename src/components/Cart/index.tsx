/* eslint-disable react-native/no-raw-text */
import { FlatList, TouchableOpacity } from 'react-native';

import { ICartItem } from '../../types/ICartItem';
import { IProduct } from '../../types/IProduct';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';

import {
  Actions,
  CartItem,
  Image,
  Product,
  ProductDetails,
  Quantity,
  Summary,
  TotalPrice,
} from './styles';

interface ICartProps {
  cartItems: ICartItem[];
  onAdd: (product: IProduct) => void;
  onSubtract: (product: IProduct) => void;
}

export function Cart({ cartItems, onAdd, onSubtract }: ICartProps) {
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  return (
    <>
      {cartItems.length > 0 && (
        <FlatList
          showsVerticalScrollIndicator={false}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ marginBottom: 20, maxHeight: 140 }}
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          renderItem={({ item: cartItem }) => (
            <CartItem>
              <Product>
                <Image
                  source={{
                    uri: `http:/192.168.0.5:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <Quantity>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </Quantity>

                <ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666">
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProductDetails>
              </Product>

              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onSubtract(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </CartItem>
          )}
        />
      )}

      <Summary>
        <TotalPrice>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(totalPrice)}
              </Text>
            </>
          ) : (
            <Text color="#999">Seu carrinho está vázio</Text>
          )}
        </TotalPrice>

        <Button
          onPress={() => alert('Confirmar pedido')}
          disabled={cartItems.length === 0}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
