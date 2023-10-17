import { StatusBar } from 'expo-status-bar';

import { Text } from '../components/Text';

import { Container } from './styles';

export function Main() {
  return (
    <Container>
      <Text>Main renderizou</Text>

      {/* eslint-disable-next-line react/style-prop-object */}
      <StatusBar style="auto" />
    </Container>
  );
}
