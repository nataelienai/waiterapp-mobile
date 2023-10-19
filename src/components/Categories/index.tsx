/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../mocks/categories';
import { Text } from '../Text';

import { Category, Icon } from './styles';

export function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  function handleSelectCategory(categoryId: string) {
    const newSelectedId = selectedCategoryId === categoryId ? '' : categoryId;

    setSelectedCategoryId(newSelectedId);
  }

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 12,
      }}
      data={categories}
      keyExtractor={(category) => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategoryId === category._id;

        return (
          <Category
            onPress={() => handleSelectCategory(category._id)}
            selected={isSelected}
          >
            <Icon>
              <Text>{category.icon}</Text>
            </Icon>

            <Text size={14} weight="600">
              {category.name}
            </Text>
          </Category>
        );
      }}
    />
  );
}
