/* eslint-disable react-native/no-inline-styles */
import { Modal } from 'react-native';

import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';

import { Container, OkButton } from './styles';

interface IOrderConfirmedModal {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: IOrderConfirmedModal) {
  return (
    <Modal visible={visible} animationType="slide">
      <Container>
        <CheckCircle />
        <Text size={20} weight="600" color="#fff" style={{ marginTop: 12 }}>
          Pedido confirmado
        </Text>
        <Text color="#fff" opacity={0.9} style={{ marginTop: 8 }}>
          O pedido já entrou na fila de produção
        </Text>

        <OkButton onPress={onOk}>
          <Text color="#d73035" weight="600">
            OK
          </Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
