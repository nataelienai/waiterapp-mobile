/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { FlatList } from 'react-native';

import { IProduct } from '../../types/IProduct';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import {
  AddToCartButton,
  Product,
  ProductDetails,
  ProductImage,
  Separator,
} from './styles';

interface IMenuProps {
  products: IProduct[];
  onAddToCart: (product: IProduct) => void;
}

export function Menu({ products, onAddToCart }: IMenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  function handleOpenModal(product: IProduct) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedProduct(null);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        style={{
          marginTop: 32,
        }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        data={products}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <Product onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.0.5:3001/uploads/${product.imagePath}`,
              }}
            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666">
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>

            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </Product>
        )}
      />
    </>
  );
}
